const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5022;

app.use(cors());
app.use(express.json());

// Session storage (in production, use Redis or database)
const sessions = new Map();

// Track session activity for auto-send
const sessionActivity = new Map();

// Check for inactive sessions and send summaries
const checkInactiveSessions = () => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    for (const [sessionId, lastActivity] of sessionActivity.entries()) {
        if (now - lastActivity > fiveMinutes) {
            const session = sessions.get(sessionId);
            if (session && session.messages.length > 0) {
                console.log(`Auto-sending PDF for inactive session: ${sessionId}`);
                sendPDFSummary(sessionId).catch(err => {
                    console.error(`Auto-send PDF error for ${sessionId}:`, err);
                });
                // Remove from tracking after sending
                sessionActivity.delete(sessionId);
            }
        }
    }
};

// Update session activity
const updateSessionActivity = (sessionId) => {
    sessionActivity.set(sessionId, Date.now());
};

// Set up periodic check for inactive sessions (every minute)
setInterval(checkInactiveSessions, 60000);

// Email transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
};

// OpenAI configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CALENDLY_URL = process.env.CALENDLY_URL || 'https://calendly.com/smartinstallersnyc';

// System prompt for legal assistant
const SYSTEM_PROMPT = `You are a professional legal assistant specializing in New York personal injury law, workers' compensation, and labor laws. You provide clear, helpful guidance while being empathetic and professional.

Key areas of expertise:
- Auto accidents and no-fault insurance
- Workers' compensation claims
- Labor law violations
- Personal injury cases
- Medical malpractice

Guidelines:
- Always be professional and empathetic
- Provide accurate information based on NY state laws
- Keep responses concise but informative
- Focus on helping users understand their rights and next steps

IMPORTANT CONSULTATION PROCESS:
When someone describes an injury or legal issue:
1. First, provide brief legal context and their rights
2. Ask 2-3 key clarifying questions to understand the situation better (like when it happened, where, what injuries, if they sought medical attention, if they reported it)
3. After getting those details, suggest scheduling a consultation
4. Keep the total conversation to 3-4 messages maximum before suggesting the appointment

Key questions to ask (choose 2-3 relevant ones):
- When did this happen? (date/time)
- Where exactly did this occur? (location details)
- What injuries did you sustain?
- Have you sought medical attention?
- Did you report this to anyone? (police, employer, insurance)
- Do you have any witnesses or evidence?

Remember: Be efficient - get essential details quickly, then offer the consultation. Don't drag out the conversation unnecessarily.`;

// Generate session ID
const generateSessionId = (email) => {
    return `${email}-${Date.now()}`;
};

// Get chat history for OpenAI
const getChatHistory = (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session || !session.messages) return [];

    // Keep only last 10 messages for context
    return session.messages.slice(-10).map(msg => ({
        role: msg.generatedBy === 'user' ? 'user' : 'assistant',
        content: msg.message
    }));
};

// Call OpenAI API
const callOpenAI = async (messages) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 500,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API error:', error.response?.data || error.message);
        return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
    }
};

// Generate PDF summary
const generatePDFSummary = (session) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            margins: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            }
        });
        const chunks = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Set up professional fonts and colors
        const primaryColor = '#1e40af'; // Blue
        const secondaryColor = '#64748b'; // Gray
        const accentColor = '#dc2626'; // Red for important items
        const lightGray = '#f1f5f9';

        // Header with logo and title
        doc.rect(0, 0, 595, 80).fill(primaryColor);
        doc.fillColor('white');
        doc.fontSize(28).font('Helvetica-Bold').text('NY LEGAL RESOURCE CENTER', 50, 25, { align: 'center' });
        doc.fontSize(16).font('Helvetica').text('Legal Consultation Summary', 50, 55, { align: 'center' });
        doc.fillColor('black');

        // Reset position after header
        let yPosition = 120;

        // Client Information Section
        doc.fillColor(primaryColor);
        doc.fontSize(18).font('Helvetica-Bold').text('CLIENT INFORMATION', 50, yPosition);
        doc.fillColor('black');
        yPosition += 30;

        // Client info in a styled box
        doc.rect(50, yPosition, 495, 80).stroke(lightGray).fill(lightGray);
        doc.fillColor('black');
        doc.fontSize(12).font('Helvetica-Bold').text('Name:', 70, yPosition + 15);
        doc.fontSize(12).font('Helvetica').text(session.user.name, 120, yPosition + 15);
        doc.fontSize(12).font('Helvetica-Bold').text('Email:', 70, yPosition + 35);
        doc.fontSize(12).font('Helvetica').text(session.user.email, 120, yPosition + 35);
        doc.fontSize(12).font('Helvetica-Bold').text('Phone:', 70, yPosition + 55);
        doc.fontSize(12).font('Helvetica').text(session.user.phone, 120, yPosition + 55);

        doc.fontSize(12).font('Helvetica-Bold').text('Date:', 300, yPosition + 15);
        doc.fontSize(12).font('Helvetica').text(new Date().toLocaleDateString(), 350, yPosition + 15);
        doc.fontSize(12).font('Helvetica-Bold').text('Time:', 300, yPosition + 35);
        doc.fontSize(12).font('Helvetica').text(new Date().toLocaleTimeString(), 350, yPosition + 35);

        yPosition += 100;

        // Extract key information from conversation
        const userMessages = session.messages.filter(msg => msg.generatedBy === 'user');
        const assistantMessages = session.messages.filter(msg => msg.generatedBy === 'system');
        const allText = session.messages.map(msg => msg.message.toLowerCase()).join(' ');

        // Identify potential legal issues
        const legalIssues = [];
        if (allText.includes('car') || allText.includes('accident') || allText.includes('auto')) {
            legalIssues.push('Auto Accident / No-Fault Insurance');
        }
        if (allText.includes('work') || allText.includes('employer') || allText.includes('job')) {
            legalIssues.push('Workers\' Compensation');
        }
        if (allText.includes('slip') || allText.includes('fall') || allText.includes('bodega') || allText.includes('store')) {
            legalIssues.push('Premises Liability');
        }
        if (allText.includes('medical') || allText.includes('malpractice')) {
            legalIssues.push('Medical Malpractice');
        }
        if (allText.includes('labor') || allText.includes('wage') || allText.includes('overtime')) {
            legalIssues.push('Labor Law Violations');
        }

        // Legal Analysis Summary
        doc.fillColor(primaryColor);
        doc.fontSize(18).font('Helvetica-Bold').text('LEGAL ANALYSIS SUMMARY', 50, yPosition);
        doc.fillColor('black');
        yPosition += 30;

        // Potential Rights Summary in styled box
        doc.rect(50, yPosition, 495, 60).stroke(lightGray).fill(lightGray);
        doc.fillColor(accentColor);
        doc.fontSize(14).font('Helvetica-Bold').text('Potential Legal Rights:', 70, yPosition + 15);
        doc.fillColor('black');
        doc.fontSize(11).font('Helvetica');

        if (legalIssues.length > 0) {
            legalIssues.forEach((issue, index) => {
                doc.text(`• ${issue}`, 70, yPosition + 35 + (index * 15));
            });
        } else {
            doc.text('• General legal consultation needed', 70, yPosition + 35);
        }

        yPosition += 80;

        // Legal Framework Section
        doc.fillColor(primaryColor);
        doc.fontSize(18).font('Helvetica-Bold').text('LEGAL FRAMEWORK & APPLICABLE LAWS', 50, yPosition);
        doc.fillColor('black');
        yPosition += 30;

        // Auto Accident / No-Fault Insurance
        if (allText.includes('car') || allText.includes('accident') || allText.includes('auto')) {
            doc.fillColor(accentColor);
            doc.fontSize(14).font('Helvetica-Bold').text('Auto Accident / No-Fault Insurance:', 50, yPosition);
            doc.fillColor('black');
            yPosition += 20;

            doc.fontSize(10).font('Helvetica-Bold').text('Relevant Statutes:', 70, yPosition);
            yPosition += 15;
            doc.fontSize(9).font('Helvetica').text('• NY Insurance Law § 5102 - No-Fault Benefits', 90, yPosition);
            yPosition += 12;
            doc.text('• NY Insurance Law § 5104 - Serious Injury Threshold', 90, yPosition);
            yPosition += 12;
            doc.text('• NY Insurance Law § 5106 - Arbitration for Disputes', 90, yPosition);
            yPosition += 12;
            doc.text('• NY CPLR § 214 - 3-Year Statute of Limitations', 90, yPosition);
            yPosition += 20;

            doc.fontSize(10).font('Helvetica-Bold').text('Legal Strategy:', 70, yPosition);
            yPosition += 15;
            doc.fontSize(9).font('Helvetica').text('• File No-Fault application within 30 days', 90, yPosition);
            yPosition += 12;
            doc.text('• Establish "serious injury" threshold for pain & suffering', 90, yPosition);
            yPosition += 12;
            doc.text('• Pursue uninsured/underinsured motorist claims if applicable', 90, yPosition);
            yPosition += 12;
            doc.text('• Consider third-party liability against at-fault driver', 90, yPosition);
            yPosition += 25;
        }

        // Workers' Compensation
        if (allText.includes('work') || allText.includes('employer') || allText.includes('job')) {
            doc.fillColor(accentColor);
            doc.fontSize(14).font('Helvetica-Bold').text('Workers\' Compensation:', 50, yPosition);
            doc.fillColor('black');
            yPosition += 20;

            doc.fontSize(10).font('Helvetica-Bold').text('Relevant Statutes:', 70, yPosition);
            yPosition += 15;
            doc.fontSize(9).font('Helvetica').text('• NY Workers\' Compensation Law § 10 - Employer Liability', 90, yPosition);
            yPosition += 12;
            doc.text('• NY Workers\' Compensation Law § 15 - Benefits Schedule', 90, yPosition);
            yPosition += 12;
            doc.text('• NY Workers\' Compensation Law § 25 - Medical Treatment', 90, yPosition);
            yPosition += 12;
            doc.text('• NY Workers\' Compensation Law § 29 - Third-Party Actions', 90, yPosition);
            yPosition += 20;

            doc.fontSize(10).font('Helvetica-Bold').text('Legal Strategy:', 70, yPosition);
            yPosition += 15;
            doc.fontSize(9).font('Helvetica').text('• File C-3 claim form within 30 days of injury', 90, yPosition);
            yPosition += 12;
            doc.text('• Seek treatment from authorized medical providers', 90, yPosition);
            yPosition += 12;
            doc.text('• Pursue third-party liability claims if applicable', 90, yPosition);
            yPosition += 12;
            doc.text('• Challenge denials through administrative hearings', 90, yPosition);
            yPosition += 25;
        }

        // Check if we need a new page
        if (yPosition > 700) {
            doc.addPage();
            yPosition = 50;
        }

        // Important Deadlines & Next Steps
        doc.fillColor(primaryColor);
        doc.fontSize(18).font('Helvetica-Bold').text('IMPORTANT DEADLINES & NEXT STEPS', 50, yPosition);
        doc.fillColor('black');
        yPosition += 30;

        // Deadlines in highlighted box
        doc.rect(50, yPosition, 495, 80).stroke(accentColor).fill('#fef2f2');
        doc.fillColor(accentColor);
        doc.fontSize(12).font('Helvetica-Bold').text('⚠️  CRITICAL DEADLINES:', 70, yPosition + 15);
        doc.fillColor('black');
        doc.fontSize(10).font('Helvetica');

        if (allText.includes('accident') || allText.includes('injury')) {
            doc.text('• File No-Fault Application within 30 days of accident', 70, yPosition + 35);
            doc.text('• Submit medical bills within 45 days of treatment', 70, yPosition + 50);
            doc.text('• Report lost wages within 90 days', 70, yPosition + 65);
        }

        if (allText.includes('work') || allText.includes('employer')) {
            doc.text('• Report injury to employer within 30 days', 70, yPosition + 35);
            doc.text('• File Workers\' Compensation claim promptly', 70, yPosition + 50);
            doc.text('• Seek medical treatment from authorized providers', 70, yPosition + 65);
        }

        yPosition += 100;

        // Potential Damages & Recovery
        doc.fillColor(primaryColor);
        doc.fontSize(18).font('Helvetica-Bold').text('POTENTIAL DAMAGES & RECOVERY', 50, yPosition);
        doc.fillColor('black');
        yPosition += 30;

        if (allText.includes('accident') || allText.includes('injury') || allText.includes('hurt')) {
            // Economic Damages
            doc.fillColor(accentColor);
            doc.fontSize(12).font('Helvetica-Bold').text('Economic Damages:', 70, yPosition);
            doc.fillColor('black');
            yPosition += 15;

            doc.fontSize(10).font('Helvetica').text('• Medical expenses (past and future)', 90, yPosition);
            yPosition += 12;
            doc.text('• Lost wages and earning capacity', 90, yPosition);
            yPosition += 12;
            doc.text('• Property damage', 90, yPosition);
            yPosition += 12;
            doc.text('• Rehabilitation and therapy costs', 90, yPosition);
            yPosition += 20;

            // ✅ Check page space BEFORE Non-Economic Damages
            if (yPosition > 700) {
                doc.addPage();
                yPosition = 50;
            }

            // Non-Economic Damages
            doc.fillColor(accentColor);
            doc.fontSize(12).font('Helvetica-Bold').text('Non-Economic Damages:', 70, yPosition);
            doc.fillColor('black');
            yPosition += 15;

            doc.fontSize(10).font('Helvetica').text('• Pain and suffering', 90, yPosition);
            yPosition += 12;
            doc.text('• Emotional distress', 90, yPosition);
            yPosition += 12;
            doc.text('• Loss of enjoyment of life', 90, yPosition);
            yPosition += 12;
            doc.text('• Disfigurement and scarring', 90, yPosition);
            yPosition += 25;
        }

        // Check if we need a new page for conversation summary
        if (yPosition > 600) {
            doc.addPage();
            yPosition = 50;
        }

        // Conversation Summary
        doc.fillColor(primaryColor);
        doc.fontSize(18).font('Helvetica-Bold').text('DETAILED CONVERSATION SUMMARY', 50, yPosition);
        doc.fillColor('black');
        yPosition += 30;

        // Conversation in styled format
        session.messages.forEach((msg, index) => {
            const role = msg.generatedBy === 'user' ? 'Client' : 'Legal Assistant';
            const timestamp = new Date(msg.createdAt).toLocaleTimeString();

            // Role header
            doc.fillColor(role === 'Client' ? primaryColor : secondaryColor);
            doc.fontSize(11).font('Helvetica-Bold').text(`${role} (${timestamp}):`, 50, yPosition);
            doc.fillColor('black');
            yPosition += 15;

            // Message content
            doc.fontSize(9).font('Helvetica').text(msg.message, 70, yPosition, {
                width: 455,
                align: 'left'
            });

            // Calculate height needed for this message
            const messageHeight = doc.heightOfString(msg.message, {
                width: 455,
                align: 'left'
            });
            yPosition += messageHeight + 15;

            // Check if we need a new page
            if (yPosition > 700) {
                doc.addPage();
                yPosition = 50;
            }
        });

        // Footer
        doc.addPage();
        doc.fillColor(secondaryColor);
        doc.fontSize(10).font('Helvetica').text('This summary is for informational purposes only and does not constitute legal advice.', 50, 50, { align: 'center' });
        doc.text('Please consult with a qualified attorney for specific legal guidance.', 50, 70, { align: 'center' });

        // Contact information
        doc.fillColor(primaryColor);
        doc.fontSize(12).font('Helvetica-Bold').text('NY Legal Resource Center', 50, 120, { align: 'center' });
        doc.fillColor(secondaryColor);
        doc.fontSize(10).font('Helvetica').text('📧 smartinstallersnyc@gmail.com', 50, 140, { align: 'center' });
        doc.text('📅 Schedule consultation: https://calendly.com/smartinstallersnyc', 50, 155, { align: 'center' });

        doc.end();
    });
};

// Helper function to calculate session duration
const calculateSessionDuration = (session) => {
    if (session.messages.length < 2) return 'N/A';

    const firstMessage = new Date(session.messages[0].createdAt);
    const lastMessage = new Date(session.messages[session.messages.length - 1].createdAt);
    const durationMs = lastMessage - firstMessage;
    const minutes = Math.floor(durationMs / 60000);

    if (minutes < 1) return 'Less than 1 minute';
    if (minutes === 1) return '1 minute';
    return `${minutes} minutes`;
};

// Send PDF summary function
const sendPDFSummary = async (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session || session.messages.length === 0) {
        throw new Error('Session not found or no messages');
    }

    try {
        const pdfBuffer = await generatePDFSummary(session);
        const transporter = createTransporter();

        // Generate email content based on consultation
        const allText = session.messages.map(msg => msg.message.toLowerCase()).join(' ');
        let emailSubject = 'Your Legal Consultation Summary';
        let emailContent = `Hi ${session.name},\n\nThank you for using the NY Legal Resource Center. Please find attached your comprehensive legal consultation summary.\n\n`;

        // Add relevant information based on consultation type
        if (allText.includes('accident') || allText.includes('injury')) {
            emailContent += `Based on your consultation, you may have rights related to personal injury or auto accident claims. The attached summary includes important deadlines and next steps.\n\n`;
        } else if (allText.includes('work') || allText.includes('employer')) {
            emailContent += `Based on your consultation, you may have workers' compensation rights. The attached summary includes important deadlines and next steps.\n\n`;
        } else {
            emailContent += `The attached summary includes a detailed analysis of your legal situation and recommended next steps.\n\n`;
        }

        emailContent += `Key Points from Your Consultation:\n`;
        emailContent += `• Total messages exchanged: ${session.messages.length}\n`;
        emailContent += `• Consultation duration: ${calculateSessionDuration(session)}\n`;
        emailContent += `• Date: ${new Date().toLocaleDateString()}\n\n`;

        emailContent += `Next Steps:\n`;
        emailContent += `• Review the attached PDF summary carefully\n`;
        emailContent += `• Consider scheduling a consultation with a legal professional\n`;
        emailContent += `• Keep all relevant documentation and evidence\n\n`;

        emailContent += `If you have any questions or need further assistance, please don't hesitate to reach out.\n\n`;
        emailContent += `Best regards,\nNY Legal Resource Center\n`;
        emailContent += `📧 smartinstallersnyc@gmail.com\n`;
        emailContent += `📅 Schedule consultation: https://calendly.com/smartinstallersnyc`;

        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: session.email,
            subject: emailSubject,
            text: emailContent,
            attachments: [{
                filename: 'legal-consultation-summary.pdf',
                content: pdfBuffer
            }]
        });

        console.log(`PDF summary sent to ${session.email}`);
        return { status: 'sent' };
    } catch (error) {
        console.error('Send PDF error:', error);
        throw error;
    }
};

// Routes
app.post('/start_session', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const sessionId = generateSessionId(email);
        const welcomeMessage = `Hi ${name.split(' ')[0]}, how can I help you today?`;

        // Store session
        sessions.set(sessionId, {
            name,
            email,
            phone,
            messages: [{
                message: welcomeMessage,
                generatedBy: 'system',
                createdAt: new Date().toISOString()
            }]
        });

        // Track session activity
        updateSessionActivity(sessionId);

        res.json({
            session_id: sessionId,
            message: welcomeMessage
        });
    } catch (error) {
        console.error('Start session error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/chat', async (req, res) => {
    try {
        const { session_id, message } = req.body;

        if (!session_id || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const session = sessions.get(session_id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Add user message to session
        session.messages.push({
            message,
            generatedBy: 'user',
            createdAt: new Date().toISOString()
        });

        // Update session activity
        updateSessionActivity(session_id);

        // Prepare messages for OpenAI
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...getChatHistory(session_id),
            { role: 'user', content: message }
        ];

        // Get AI response
        const aiResponse = await callOpenAI(messages);

        // Add AI response to session
        session.messages.push({
            message: aiResponse,
            generatedBy: 'system',
            createdAt: new Date().toISOString()
        });

        // Check if response suggests scheduling (only after gathering details)
        const shouldIncludeCalendly = (aiResponse.toLowerCase().includes('schedule') ||
            aiResponse.toLowerCase().includes('consultation') ||
            aiResponse.toLowerCase().includes('appointment') ||
            aiResponse.toLowerCase().includes('meet')) &&
            // Only include if we've had at least 2 exchanges (initial + follow-up)
            session.messages.length >= 4;

        const response = {
            reply: aiResponse
        };

        if (shouldIncludeCalendly) {
            response.calendly = CALENDLY_URL;
        }

        res.json(response);
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/send_pdf_summary', async (req, res) => {
    try {
        const { session_id } = req.body;

        if (!session_id) {
            return res.status(400).json({ error: 'Missing session_id' });
        }

        const result = await sendPDFSummary(session_id);
        res.json(result);
    } catch (error) {
        console.error('Send PDF error:', error);
        res.status(500).json({ error: 'Failed to send PDF summary' });
    }
});

// Auto-send PDF when Calendly link is clicked
app.post('/calendly_clicked', async (req, res) => {
    try {
        const { session_id } = req.body;

        if (!session_id) {
            return res.status(400).json({ error: 'Missing session_id' });
        }

        console.log(`Calendly clicked for session: ${session_id}`);
        const result = await sendPDFSummary(session_id);

        // Remove from activity tracking after sending
        sessionActivity.delete(session_id);

        res.json(result);
    } catch (error) {
        console.error('Calendly PDF error:', error);
        res.status(500).json({ error: 'Failed to send PDF summary' });
    }
});

// Auto-send PDF on logout
app.post('/logout', async (req, res) => {
    try {
        const { session_id } = req.body;

        if (!session_id) {
            return res.status(400).json({ error: 'Missing session_id' });
        }

        console.log(`Logout triggered for session: ${session_id}`);
        const result = await sendPDFSummary(session_id);

        // Remove from activity tracking after sending
        sessionActivity.delete(session_id);

        res.json(result);
    } catch (error) {
        console.error('Logout PDF error:', error);
        res.status(500).json({ error: 'Failed to send PDF summary' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`🚀 Legal Chatbot API running on port ${port}`);
    console.log(`📧 Email: ${process.env.SMTP_EMAIL ? 'Configured' : 'Not configured'}`);
    console.log(`🤖 OpenAI: ${OPENAI_API_KEY ? 'Configured' : 'Not configured'}`);
    console.log(`📅 Calendly: ${CALENDLY_URL}`);
}); 
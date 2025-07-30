"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  setToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localStorageUtils";
import { BACKEND_API_BASE_URL } from "@/config/api";
import LoginForm from "@/components/auth/LoginForm";
import ChatUI from "@/components/chat/ChatUI";

interface Message {
  message: string;
  generatedBy: "user" | "system";
  createdAt: string;
}

const ChatBot = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [agentJoining, setAgentJoining] = useState(false);
  const [currentAgent, setCurrentAgent] = useState("");

  const USER_NAME_KEY = "authUserName";
  const USER_EMAIL_KEY = "authUserEmail";
  const USER_PHONE_KEY = "authUserPhone";
  const SESSION_ID_KEY = "chatSessionId";

  // Agent names for variety
  const agentNames = [
    "Jennifer Martinez",
    "Robert Chen",
    "Amanda Rodriguez",
    "Michael Thompson",
    "Sarah Williams"
  ];

  // Try to auto-login from localStorage
  useEffect(() => {
    const name = getFromLocalStorage(USER_NAME_KEY);
    const email = getFromLocalStorage(USER_EMAIL_KEY);
    const phone = getFromLocalStorage(USER_PHONE_KEY);
    const storedSessionId = getFromLocalStorage(SESSION_ID_KEY);

    if (name && email && phone && storedSessionId) {
      setUser({ name, email, phone });
      setSessionId(storedSessionId);
      setIsUserAuthenticated(true);
    }
  }, []);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const simulateAgentJoining = async () => {
    const randomAgent = agentNames[Math.floor(Math.random() * agentNames.length)];
    const randomWaitTime = Math.floor(Math.random() * 5000) + 2000; // 2-7 seconds

    // Step 1: Show "finding agent" status
    setCurrentAgent("");
    setAgentJoining(true);

    // Wait for random time
    await new Promise(resolve => setTimeout(resolve, randomWaitTime));

    // Step 2: Show agent joined status (brief moment)
    setCurrentAgent(randomAgent);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Show for 1 second

    // Step 3: Add agent joined message as regular chat message
    const agentJoinedMessage: Message = {
      message: `${randomAgent} has joined the chat`,
      generatedBy: "system",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, agentJoinedMessage]);

    // Step 4: Add greeting message
    const greetingMessage: Message = {
      message: `Hi ${user.name.split(' ')[0]}, how can I help you today?`,
      generatedBy: "system",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, greetingMessage]);
    setAgentJoining(false);
  };

  const handleUserFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = user.name.trim();
    const trimmedEmail = user.email.trim();
    const trimmedPhone = user.phone.trim();
    if (!trimmedName || !trimmedEmail || !trimmedPhone) return;

    try {
      const response = await axios.post(`${BACKEND_API_BASE_URL}start_session`, {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
      });

      const sessionId = response.data.session_id;
      const welcomeMsg = response.data.message;

      setToLocalStorage(USER_NAME_KEY, trimmedName);
      setToLocalStorage(USER_EMAIL_KEY, trimmedEmail);
      setToLocalStorage(USER_PHONE_KEY, trimmedPhone);
      setToLocalStorage(SESSION_ID_KEY, sessionId);

      setUser({ name: trimmedName, email: trimmedEmail, phone: trimmedPhone });
      setSessionId(sessionId);
      setMessages([]); // Start with empty messages array
      setIsUserAuthenticated(true);

      // Start agent joining simulation
      simulateAgentJoining();
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !sessionId || agentJoining) return;

    const userMessage: Message = { message: input, generatedBy: "user", createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_API_BASE_URL}chat`, {
        session_id: sessionId,
        message: input,
      });

      const systemReply: Message = {
        message: response.data.reply,
        generatedBy: "system",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, systemReply]);

      // Add Calendly link as a separate message if provided
      if (response.data.calendly) {
        const calendlyMessage: Message = {
          message: `📅 Schedule a Consultation\n\nI'd be happy to help you further. You can schedule a consultation with our legal team using the link below:\n\nSchedule Appointment: ${response.data.calendly}`,
          generatedBy: "system",
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, calendlyMessage]);
      }
    } catch (error) {
      console.error("Error during chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendSummary = async () => {
    if (!sessionId) return;
    try {
      await axios.post(`${BACKEND_API_BASE_URL}send_pdf_summary`, {
        session_id: sessionId,
      });
    } catch (err) {
      console.error("Failed to send summary PDF:", err);
    }
  };

  const handleCalendlyClick = async () => {
    if (!sessionId) return;
    try {
      await axios.post(`${BACKEND_API_BASE_URL}calendly_clicked`, {
        session_id: sessionId,
      });
    } catch (err) {
      console.error("Failed to send PDF on Calendly click:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_API_BASE_URL}logout`, {
        session_id: sessionId,
      });
    } catch (err) {
      console.error("Failed to send PDF on logout:", err);
    }

    removeFromLocalStorage(USER_NAME_KEY);
    removeFromLocalStorage(USER_EMAIL_KEY);
    removeFromLocalStorage(USER_PHONE_KEY);
    removeFromLocalStorage(SESSION_ID_KEY);

    setUser({ name: "", email: "", phone: "" });
    setSessionId(null);
    setMessages([]);
    setIsUserAuthenticated(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-20">
      {isUserAuthenticated ? (
        <div className="w-full max-w-3xl">
          <ChatUI
            loading={loading}
            user={user}
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            onLogout={handleLogout}
            onCalendlyClick={handleCalendlyClick}
            agentJoining={agentJoining}
            currentAgent={currentAgent}
          />
        </div>
      ) : (
        <LoginForm
          user={user}
          onChange={handleUserInputChange}
          onSubmit={handleUserFormSubmit}
        />
      )}
    </div>
  );
};

export default ChatBot;

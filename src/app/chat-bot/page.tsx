"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  setToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localStorageUtils";
import { BACKEND_API_BASE_URL } from "@/config/api";
import LoginForm from "@/components/auth/LoginForm";
import ChatUI from "@/components/chat/ChatUI";
import { usePathname } from "next/navigation";

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
  const [sessionEnded, setSessionEnded] = useState(false);

  const isRefreshingSession = useRef(false); // ✅ prevents multiple auto-refreshes

  const USER_NAME_KEY = "authUserName";
  const USER_EMAIL_KEY = "authUserEmail";
  const USER_PHONE_KEY = "authUserPhone";
  const SESSION_ID_KEY = "chatSessionId";

  const agentNames = [
    "Jennifer Martinez",
    "Robert Chen",
    "Amanda Rodriguez",
    "Michael Thompson",
    "Sarah Williams",
  ];

  // ✅ Restore user and session

  console.log(user, "user")
  const pathname = usePathname(); // ✅ detect route change

  useEffect(() => {
    const restoreUserAndSession = () => {
      const name = getFromLocalStorage(USER_NAME_KEY);
      const email = getFromLocalStorage(USER_EMAIL_KEY);
      const phone = getFromLocalStorage(USER_PHONE_KEY);
      const storedSessionId = getFromLocalStorage(SESSION_ID_KEY);

      console.log("Restoring session:", { name, email, phone, storedSessionId });

      if (name && email && phone && storedSessionId) {
        setUser({ name, email, phone });
        setSessionId(storedSessionId);
        setIsUserAuthenticated(true);
      } else {
        console.warn("No user session found in localStorage.");
      }
    };

    // Run immediately and also re-run after route changes
    restoreUserAndSession();

    // Sometimes localStorage might not be ready instantly after route change
    const timeout = setTimeout(restoreUserAndSession, 300);

    return () => clearTimeout(timeout);
  }, [pathname]); // ✅ triggers when you change route




  // ✅ Check if session has expired (runs once on mount)
  useEffect(() => {
    const checkSessionValidity = async () => {
      if (!sessionId || !isUserAuthenticated) return;

      try {
        const response = await axios.get(
          `${BACKEND_API_BASE_URL}chat/session/${sessionId}`
        );

        console.log(response.data, "Session check response");

        const isEnded = response.data?.status === false; // backend returns true if 
        console.log(response.data, "response.data")


        if (isEnded && !isRefreshingSession.current) {
          console.log("Session expired — creating a new session...");
          isRefreshingSession.current = true; // prevent multiple triggers
          setSessionEnded(true);

          const name = getFromLocalStorage(USER_NAME_KEY);
          const email = getFromLocalStorage(USER_EMAIL_KEY);
          const phone = getFromLocalStorage(USER_PHONE_KEY);

          if (name && email && phone) {
            setMessages((prev) => [
              ...prev,
              {
                message:
                  "⚠️ Your previous session has expired. Starting a new chat session...",
                generatedBy: "system",
                createdAt: new Date().toISOString(),
              },
            ]);

            await startNewSession(name, email, phone);
          }
        }
      } catch (error) {
        console.error("Failed to check session status:", error);
      }
    };

    checkSessionValidity();
  }, [isUserAuthenticated]); // ✅ only once after user is authenticated

  // ✅ Helper function to start a new session
  const startNewSession = async (name: string, email: string, phone: string) => {
    try {
      const response = await axios.post(`${BACKEND_API_BASE_URL}chat/start-session`, {
        name,
        email,
        phone,
      });

      const newSessionId = response.data.sessionId;
      console.log("New session started:", newSessionId);
      setToLocalStorage(USER_NAME_KEY, name);
      setToLocalStorage(USER_EMAIL_KEY, email);
      setToLocalStorage(USER_PHONE_KEY, phone);
      setToLocalStorage(SESSION_ID_KEY, newSessionId);

      setUser({ name: name, email: email, phone: phone });
      setSessionId(newSessionId);
      setMessages([]);
      setIsUserAuthenticated(true);
      setSessionEnded(false); // 🆕 reset when new session starts
      simulateAgentJoining();
      isRefreshingSession.current = false; // allow future checks again
    } catch (error) {
      console.error("Error creating new session:", error);
      isRefreshingSession.current = false;
    }
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const simulateAgentJoining = async () => {
    const randomAgent =
      agentNames[Math.floor(Math.random() * agentNames.length)];
    const randomWaitTime = Math.floor(Math.random() * 5000) + 2000;

    setCurrentAgent("");
    setAgentJoining(true);
    await new Promise((r) => setTimeout(r, randomWaitTime));

    setCurrentAgent(randomAgent);
    await new Promise((r) => setTimeout(r, 1000));

    const agentJoinedMessage: Message = {
      message: `${randomAgent} has joined the chat`,
      generatedBy: "system",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, agentJoinedMessage]);

    const greetingMessage: Message = {
      message: `Hi ${user.name.split(" ")[0]}, how can I help you today?`,
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

    await startNewSession(trimmedName, trimmedEmail, trimmedPhone);
    setIsUserAuthenticated(true);
  };

  const handleSend = async () => {
    if (!input.trim() || !sessionId || agentJoining || sessionEnded) return;

    const userMessage: Message = {
      message: input,
      generatedBy: "user",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_API_BASE_URL}chat/start-conversation`,
        {
          sessionId,
          message: input,
        }
      );

      const systemReply: Message = {
        message: response.data.reply,
        generatedBy: "system",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemReply]);

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

  const handleCalendlyClick = async () => {
    if (!sessionId) return;
    try {
      await axios.post(`${BACKEND_API_BASE_URL}chat/calendly-clicked`, {
        sessionId,
      });
    } catch (err) {
      console.error("Failed to send PDF on Calendly click:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_API_BASE_URL}chat/logout`, { sessionId });
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
    setSessionEnded(false);
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
            sessionEnded={sessionEnded}
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

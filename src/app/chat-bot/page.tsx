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

const USER_NAME_KEY = "authUserName";
const USER_EMAIL_KEY = "authUserEmail";

const ChatBot = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const name = getFromLocalStorage(USER_NAME_KEY);
    const email = getFromLocalStorage(USER_EMAIL_KEY);

    if (name && email) {
      setUser({ name, email });
      setIsUserAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isUserAuthenticated && user.name) {
      const welcomeMessage: Message = {
        message: `Hi ${user.name}, how can I help you today?`,
        generatedBy: "system",
        createdAt: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isUserAuthenticated,user.name]);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = user.name.trim();
    const trimmedEmail = user.email.trim();
    if (!trimmedName || !trimmedEmail) return;
    setToLocalStorage(USER_NAME_KEY, trimmedName);
    setToLocalStorage(USER_EMAIL_KEY, trimmedEmail);
    setIsUserAuthenticated(true);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      message: input,
      generatedBy: "user",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_API_BASE_URL}chat`,
        {
          email: user.email,
          firstname: user.name,
          message: input,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const newMessages = response.data.messages;
      const systemResponses = newMessages.filter(
        (msg: Message) => msg.generatedBy === "system"
      );

      setMessages((prev) => [...prev, ...systemResponses]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeFromLocalStorage(USER_NAME_KEY);
    removeFromLocalStorage(USER_EMAIL_KEY);
    setUser({
      name: "",
      email: "",
    });
    setIsUserAuthenticated(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-20">
      {isUserAuthenticated ? (
        <ChatUI
          loading={loading}
          user={user}
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onLogout={handleLogout}
        />
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

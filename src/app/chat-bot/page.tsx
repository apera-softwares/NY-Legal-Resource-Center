"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUser, FiMail, FiSend } from "react-icons/fi";

interface Message {
  message: string;
  generatedBy: "user" | "system";
  createdAt: string;
}

const ChatBot = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUserAuthenticated) {
      const welcomeMessage: Message = {
        message: `Hi ${user.name}, how can I help you today?`,
        generatedBy: "system",
        createdAt: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isUserAuthenticated]);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.name && user.email) {
      setIsUserAuthenticated(true);
    }
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
      "https://ee91f58dfa33.ngrok-free.app/chat",
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


  if (!isUserAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-20">
        <form
          onSubmit={handleUserFormSubmit}
          className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-primary">Enter Your Details</h2>

          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={user.name}
              onChange={handleUserInputChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={user.email}
              onChange={handleUserInputChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300"
          >
            <FiSend size={18} />
            Start Chat
          </button>
        </form>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-10">
      <div className="w-full max-w-2xl flex flex-col bg-white shadow-2xl rounded-2xl p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">Chat Assistant</h1>

        <div className="flex-1 overflow-y-auto max-h-[400px] mb-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-lg font-medium">Hello {user.name}, how can I assist you today?</p>
              <p className="text-sm text-gray-400 mt-2">Ask me anything related to legal help!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.generatedBy === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-md ${msg.generatedBy === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                >
                  {msg.message}
                </div>
              </div>
            ))
          )}
           {loading && (
      <div className="flex justify-start">
        <div className="max-w-xs px-4 py-3 rounded-2xl text-sm shadow-md bg-gray-100 text-gray-800 rounded-bl-none">
          Typing...
        </div>
      </div>
    )}
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-full text-white shadow-md"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );

};

export default ChatBot;

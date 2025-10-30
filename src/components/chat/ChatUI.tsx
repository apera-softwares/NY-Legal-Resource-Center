"use client";
import { FiSend } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { TbLogout2 } from "react-icons/tb";

interface Message {
  message: string;
  generatedBy: "user" | "system";
  createdAt: string;
}

interface ChatUIProps {
  user: { name: string; email: string };
  messages: Message[];
  input: string;
  loading: boolean;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
  onLogout: () => void;
  onCalendlyClick?: () => void;
  agentJoining?: boolean;
  currentAgent?: string;
  sessionEnded?: boolean; // 🆕

}

const ChatUI: React.FC<ChatUIProps> = ({
  user,
  messages,
  input,
  loading,
  setInput,
  onSend,
  onLogout,
  onCalendlyClick,
  agentJoining = false,
  currentAgent = "",
  sessionEnded,
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isScrolledToBottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

      if (!isScrolledToBottom) container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, agentJoining]);

  return (
    <div className="w-full max-w-2xl mt-10">
      <div className="relative flex flex-col bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl px-6 pt-16 pb-6 transition-all duration-500 hover:shadow-primary/40">

        {/* 🔹 Logout Button (Same Style as Send Button) */}
        <button
          onClick={onLogout}
          className="absolute flex gap-2 items-center top-4 right-6 cursor-pointer bg-gradient-to-r from-primary to-primary-hover text-white px-4 py-2 rounded-full font-medium tracking-wide shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <TbLogout2 />
          Logout
        </button>

        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover text-center mb-8">
          Chat Assistant 💬
        </h1>

        {/* Chat Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto max-h-96 mb-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 hover:scrollbar-thumb-primary-hover transition-all"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20">
              <div className="text-7xl mb-4 animate-bounce">🤖</div>
              <p className="text-lg font-medium">
                Hello <span className="font-semibold text-primary">{user.name}</span>, how can I assist you today?
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Ask me anything related to legal help!
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.generatedBy === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.generatedBy === "user"
                    ? "bg-gradient-to-r from-primary to-primary-hover text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                >
                  {msg.message.split("\n").map((line, lineIndex) => (
                    <div key={lineIndex}>
                      {line.includes("http") ? (
                        <div>
                          {line.split(" ").map((word, wordIndex) => (
                            <span key={wordIndex}>
                              {word.startsWith("http") ? (
                                <a
                                  href={word}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                                  onClick={() => {
                                    if (word.includes("calendly.com") && onCalendlyClick)
                                      onCalendlyClick();
                                  }}
                                >
                                  {word}
                                </a>
                              ) : (
                                word
                              )}
                              {wordIndex < line.split(" ").length - 1 ? " " : ""}
                            </span>
                          ))}
                        </div>
                      ) : (
                        line
                      )}
                      {lineIndex < msg.message.split("\n").length - 1 && <br />}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Agent joining */}
          {agentJoining && (
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span>
                  {currentAgent
                    ? `${currentAgent} has joined the chat`
                    : "Finding an agent to assist you..."}
                </span>
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {loading && !agentJoining && (
            <div className="flex justify-start mt-2">
              <div className="max-w-xs px-4 py-3 rounded-2xl text-sm shadow-sm bg-gray-100 text-gray-800 rounded-bl-none flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm">Typing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-3 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              agentJoining
                ? "Please wait while we connect you..."
                : "Type your message..."
            }
            disabled={agentJoining || sessionEnded}
            className={`h-12 flex-1 px-5 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 bg-white/80 backdrop-blur-md ${agentJoining ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            onKeyDown={(e) => e.key === "Enter" && !agentJoining && onSend()}
          />
          <button
            onClick={onSend}
            disabled={agentJoining || sessionEnded}
            className={`h-12 w-12 flex items-center justify-center rounded-full text-white shadow-md cursor-pointer transition-all duration-300 ${agentJoining
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-primary-hover hover:scale-105 hover:shadow-lg"
              }`}
          >
            <FiSend size={22} />
          </button>
        </div>
        {sessionEnded && (
          <div className="text-center text-gray-500 text-sm mt-4">
            Your session has ended. Please use the Calendly link above to schedule your consultation.
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatUI;

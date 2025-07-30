"use client";
import { FiSend } from "react-icons/fi";
import { useEffect, useRef } from "react";

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
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100; // 100px threshold

      if (!isScrolledToBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, agentJoining]);

  return (
    <div className="w-full max-w-2xl mt-10">
      <div className=" relative  w-full flex flex-col bg-white shadow-2xl rounded-2xl px-6 pt-14 pb-6 border  border-gray-200">
        <button
          onClick={onLogout}
          className=" top-4 right-6 absolute font-medium bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full  tracking-wide transition-colors duration-300 cursor-pointer"
        >
          Logout
        </button>
        <h1 className="text-2xl font-bold  text-primary-hover text-center  mb-6">
          Chat Assistant
        </h1>

        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto max-h-96 mb-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-lg font-medium">
                Hello {user.name}, how can I assist you today?
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Ask me anything related to legal help!
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.generatedBy === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl text-sm  ${msg.generatedBy === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                >
                  {msg.message.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex}>
                      {line.includes('http') ? (
                        <div>
                          {line.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex}>
                              {word.startsWith('http') ? (
                                <a
                                  href={word}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                                  onClick={() => {
                                    if (word.includes('calendly.com') && onCalendlyClick) {
                                      onCalendlyClick();
                                    }
                                  }}
                                >
                                  {word}
                                </a>
                              ) : (
                                word
                              )}
                              {wordIndex < line.split(' ').length - 1 ? ' ' : ''}
                            </span>
                          ))}
                        </div>
                      ) : (
                        line
                      )}
                      {lineIndex < msg.message.split('\n').length - 1 && <br />}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Agent Joining Status Indicator */}
          {agentJoining && (
            <div className="flex justify-center">
              <div className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>
                  {currentAgent ? `${currentAgent} has joined the chat` : "Please wait while we find an agent to assist you"}
                </span>
              </div>
            </div>
          )}

          {loading && !agentJoining && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-3 rounded-2xl text-sm shadow-md bg-gray-100 text-gray-800 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm">Typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={agentJoining ? "Please wait while we connect you..." : "Type your message..."}
            disabled={agentJoining}
            className={`h-12 flex-1 px-4 py-3 border focus:border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ${agentJoining ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            onKeyDown={(e) => e.key === "Enter" && !agentJoining && onSend()}
          />
          <button
            onClick={onSend}
            disabled={agentJoining}
            className={`h-12 w-12 flex items-center justify-center transition-colors duration-300 rounded-full text-white shadow-md ${agentJoining
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-hover cursor-pointer'
              }`}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;

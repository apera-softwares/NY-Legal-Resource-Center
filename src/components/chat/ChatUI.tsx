"use client";
import { FiSend } from "react-icons/fi";

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
}
const ChatUI: React.FC<ChatUIProps> = ({
  user,
  messages,
  input,
  loading,
  setInput,
  onSend,
  onLogout,
}) => (
  <div className="w-full max-w-2xl mt-10">
    <div className=" relative  w-full flex flex-col bg-white shadow-2xl rounded-2xl px-6 pt-14 pb-6 border  border-gray-200">
      <button
        onClick={onLogout}
        className=" top-4 right-6 absolute font-medium bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg  tracking-wide transition-colors duration-300 cursor-pointer"
      >
        Logout
      </button>
      <h1 className="text-2xl font-bold  text-primary-hover text-center  mb-6">
        Chat Assistant
      </h1>

      <div className="flex-1 overflow-y-auto max-h-64 mb-4 space-y-3">
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
              className={`flex ${
                msg.generatedBy === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl text-sm  ${
                  msg.generatedBy === "user"
                    ? "bg-primary text-white rounded-br-none"
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
          className="h-12 flex-1 px-4 py-3 border focus:border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button
          onClick={onSend}
          className=" h-12 w-12 flex items-center justify-center bg-primary hover:bg-primary-hover  transition-colors duration-300 rounded-full text-white shadow-md cursor-pointer"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  </div>
);

export default ChatUI;

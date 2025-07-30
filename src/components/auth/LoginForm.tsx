"use client";
import { FiUser, FiMail, FiPhone, FiSend } from "react-icons/fi";

interface User {
  name: string;
  email: string;
  phone: string;
}
interface LoginFormProps {
  user: User;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ user, onChange, onSubmit }) => (
  <div className="w-full max-w-md">
    <form
      onSubmit={onSubmit}
      className="w-full bg-white border border-gray-200 p-8 rounded-2xl shadow-xl space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-primary">
        Enter Your Details
      </h2>

      <div className="relative">
        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={user.name}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
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
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          required
        />
      </div>

      <div className="relative">
        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={user.phone}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer"
      >
        <FiSend size={18} />
        Start Chat
      </button>
    </form>
  </div>
);

export default LoginForm;

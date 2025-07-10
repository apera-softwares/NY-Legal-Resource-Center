import React, { useState, ReactNode } from "react";
import { ImArrowUpRight2 } from "react-icons/im";

interface LaborLawItemProps {
  title: string;
  content: ReactNode;
}
const LaborLawItem: React.FC<LaborLawItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full p-4 sm:p-6 border border-[#05588E29] rounded-xl lg:rounded-2xl space-y-4 ">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-4 cursor-pointer"
      >
        <h2
          className={`text-xl lg:text-2xl  font-bold ${
            isOpen ? "text-[#3498DB]" : ""
          } transition-all duration-300`}
        >
          {title}
        </h2>
        <span className="">
          <ImArrowUpRight2
            className={` text-2xl  ${isOpen ? "text-[#3498DB] rotate-90 " : " rotate-0"} transition-all duration-300 `}
          />
        </span>
      </div>

      {isOpen && content}
    </div>
  );
};

export default LaborLawItem;

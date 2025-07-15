import React, { useState, ReactNode } from "react";
import { ImArrowUpRight2 } from "react-icons/im";

interface LaborLawItemProps {
  title: string;
  content: ReactNode;
}
const LaborLawItem: React.FC<LaborLawItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full p-4 sm:p-6 border border-border-primary rounded-xl lg:rounded-2xl space-y-4 ">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-4 cursor-pointer"
      >
        <h2
          className={`text-lg sm:text-xl lg:text-2xl font-bold ${
            isOpen ? "text-primary" : "text-text-base"
          } transition-all duration-300`}
        >
          {title}
        </h2>
        <span className="">
          <ImArrowUpRight2
            className={` text-2xl  ${isOpen ? "text-primary rotate-90 " : " text-text-base rotate-0"} transition-all duration-300 `}
          />
        </span>
      </div>

      {isOpen && content}
    </div>
  );
};

export default LaborLawItem;

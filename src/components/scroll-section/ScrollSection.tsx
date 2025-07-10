"use client";
import React, { useEffect, useState } from "react";
import ScrollSidebar from "./ScrollSidebar";
import ScrollContent from "./ScrollContent";
import { scrollSections } from "@/data/scrollSections";

const ScrollSection = () => {
  const [activeId, setActiveId] = useState<string>(scrollSections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveId(visibleSections[0].target.id);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const elements = scrollSections.map((section) =>
      document.getElementById(section.id)
    );
    elements.forEach((el) => el && observer.observe(el));

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  return (
    <div id="auto-accidents" className="w-full lg:max-w-5/6 mx-auto ">
      <div className="w-full py-24">
        <div className="w-full flex flex-col items-center gap-4 mb-14 px-6 lg:px-0">
          <button className="px-4 py-2 font-bold text-xs text-[#3498DB] border-2 border-[#3498DB] rounded-full">
            Coverage & Injury Info
          </button>
          <h2 className="text-3xl lg:text-5xl text-center font-bold">
            Auto Accidents in <span className="text-[#3498DB]">New York</span>
          </h2>
          <p className="text-center text-[#758599]">
            {` Understanding New York's No-Fault Insurance System and Your Rights`}
          </p>
        </div>

        <div className="w-full grid grid-cols-12 gap-8 min-h-screen">
          <ScrollSidebar sections={scrollSections} activeId={activeId} />
          <ScrollContent />
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;

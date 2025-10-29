"use client";

import React, { useEffect, useState } from "react";
import ScrollSidebar from "./ScrollSidebar";
import ScrollContent from "./ScrollContent";
import { scrollSections } from "@/data/scrollSections";

const ScrollSection = () => {
  const [activeId, setActiveId] = useState(scrollSections[0].id);

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
        threshold: 0.3,
        rootMargin: "-100px 0px -40% 0px",
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
    <section id="auto-accidents" className="w-full lg:max-w-[83.333%] mx-auto">
      <div className="w-full py-24">
        {/* Header */}
        <div className="w-full flex flex-col items-center gap-4 mb-14 px-4 sm:px-6 lg:px-0">
          <button className="px-4 py-2 font-bold text-xs text-primary border-2 border-primary rounded-full">
            Coverage & Injury Info
          </button>
          <h2 className="text-3xl lg:text-5xl text-center font-bold">
            Auto Accidents in <span className="text-primary">New York</span>
          </h2>
          <p className="text-center text-text-muted">
            Understanding New York's No-Fault Insurance System and Your Rights
          </p>
        </div>

        {/* Sidebar + Content */}
        <div className="w-full grid grid-cols-12 gap-8 min-h-screen">
          <ScrollSidebar sections={scrollSections} activeId={activeId} />
          <ScrollContent />
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;
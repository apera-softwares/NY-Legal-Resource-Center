import React from "react";

interface SidebarProps {
  sections: { id: string; label: string }[];
  activeId: string;
}

const ScrollSidebar = ({ sections, activeId }: SidebarProps) => {
  return (
    <aside className="hidden lg:block sticky top-20 col-span-3 w-full h-fit self-start p-5 rounded-2xl border border-border-primary bg-background">
      <ul>
        {sections.map((section) => (
          <li
            key={section.id}
            className={`px-4 py-3.5 text-base lg:text-lg border-b border-border-primary transition-all duration-300 ${
              activeId === section.id
                ? "text-primary border-l-4 border-l-primary bg-muted/10"
                : "text-text-muted border-l-4 border-l-transparent"
            }`}
          >
            <a href={`#${section.id}`} className="block w-full">
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ScrollSidebar;
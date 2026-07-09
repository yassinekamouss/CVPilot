"use client";

import { useEffect, useState } from "react";

interface TabItem {
  id: string;
  label: string;
}

const TABS: TabItem[] = [
  { id: "section-personal", label: "Personal" },
  { id: "section-summary", label: "Summary" },
  { id: "section-experience", label: "Experience" },
  { id: "section-education", label: "Education" },
  { id: "section-skills", label: "Skills" },
  { id: "section-languages", label: "Languages" },
  { id: "section-certifications", label: "Certifications" },
  { id: "section-projects", label: "Projects" },
  { id: "section-interests", label: "Interests" },
];

export function EditorNav() {
  const [activeTab, setActiveTab] = useState("section-personal");

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-20% 0px -60% 0px", // triggers when element is roughly in middle of page
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    TABS.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const el = document.getElementById(tabId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full border-b border-[#E2E8F0] bg-white sticky top-0 z-10">
      <div className="flex gap-1 overflow-x-auto px-6 py-3 scrollbar-none">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#0B132B] text-white"
                  : "text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

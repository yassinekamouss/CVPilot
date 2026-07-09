"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Languages } from "lucide-react";
import { useLanguage } from "@/lib/hooks/use-language";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
  align?: "left" | "right";
}

export default function LanguageSwitcher({
  variant = "light",
  align = "right",
}: LanguageSwitcherProps) {
  const { locale, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isDark = variant === "dark";

  const languages = [
    { code: "en" as const, label: "English", shortLabel: "EN" },
    { code: "fr" as const, label: "Français", shortLabel: "FR" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(locale === "en" ? 0 : 1);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % languages.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + languages.length) % languages.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < languages.length) {
          changeLanguage(languages[highlightedIndex].code);
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      case "Tab":
        // Close dropdown and let default focus flow happen
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (code: "en" | "fr") => {
    changeLanguage(code);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const activeLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-brand-blue/30
          ${
            isDark
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10 active:bg-white/15"
              : "bg-white border-zinc-200 text-brand-navy hover:bg-zinc-50 active:bg-zinc-100 hover:border-zinc-300"
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={locale === "fr" ? "Choisir la langue" : "Select language"}
      >
        <Languages className={`w-3.5 h-3.5 ${isDark ? "text-white/80" : "text-zinc-500 "}`} />
        <span>{activeLanguage.shortLabel}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${
            isDark ? "text-white/60" : "text-zinc-400 "
          }`}
        />
      </button>

      {/* Popover Menu Dropdown */}
      <div
        className={`
          absolute ${align === "right" ? "right-0" : "left-0"} mt-2 w-32 rounded-xl border bg-white p-1 shadow-[0_10px_30px_rgba(11,19,43,0.08)]  border-zinc-200/80  transition-all duration-200 ease-out z-[100]
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }
        `}
        role="listbox"
        aria-label="Language options"
      >
        {languages.map((lang, index) => {
          const isActive = lang.code === locale;
          const isHighlighted = index === highlightedIndex;

          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`
                flex items-center justify-between w-full px-2.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-left outline-none
                ${
                  isActive
                    ? "text-brand-blue  font-bold"
                    : "text-zinc-750"
                }
                ${
                  isHighlighted
                    ? "bg-zinc-100 " 
                    : "bg-transparent"
                }
              `}
              role="option"
              aria-selected={isActive}
            >
              <span>{lang.label}</span>
              {isActive && (
                <Check className="w-3.5 h-3.5 text-brand-blue stroke-[2.5]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

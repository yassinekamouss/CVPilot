"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const navLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Modèles", href: "#templates" },
  { label: "Tarifs", href: "#pricing" },
  { label: "Comment ça marche", href: "#how-it-works" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 pointer-events-none">
      <nav className="mx-auto max-w-7xl w-full bg-white/70 backdrop-blur-xl border border-white/30 rounded-full px-4 sm:px-6 py-2.5 shadow-[0_12px_40px_rgba(11,19,43,0.06)] pointer-events-auto transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 pl-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/main_logo.svg" alt="PROCV" width={32} height={32} className="h-8 w-auto" priority />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-text-secondary hover:text-brand-blue transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3 pr-2">
            <Link
              href="/login"
              className="text-xs font-bold text-brand-navy hover:text-brand-blue px-3 py-1.5 transition-colors duration-200"
            >
              Connexion
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Essai Gratuit
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex md:hidden pr-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-full p-1.5 text-text-secondary hover:bg-brand-bg hover:text-brand-navy focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="absolute top-16 left-4 right-4 md:hidden border border-border-light bg-white/95 backdrop-blur-md rounded-2xl p-5 space-y-4 shadow-xl pointer-events-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-brand-bg hover:text-brand-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <hr className="border-border-light" />
          <div className="flex flex-col gap-3 pt-1">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 text-sm font-bold text-brand-navy hover:bg-brand-bg rounded-lg transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 bg-brand-navy hover:bg-brand-blue text-white text-sm font-bold rounded-full transition-colors shadow-sm"
            >
              Essai Gratuit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { Menu, X, Dumbbell } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Trainers", href: "#trainers" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleClick("#hero"); }}
            className="flex items-center gap-2 group"
          >
            <Dumbbell className="h-7 w-7 text-lime-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold text-white tracking-tight">
              Fit<span className="text-lime-400">Zone</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-lime-400 transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleClick("#contact"); }}
              className="ml-3 px-5 py-2.5 text-sm font-semibold bg-lime-400 text-zinc-900 rounded-full hover:bg-lime-300 transition-colors"
            >
              Start Your Journey
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-all duration-300 bg-zinc-950/98 backdrop-blur-md",
          mobileOpen ? "max-h-[500px] border-b border-zinc-800" : "max-h-0",
        )}
      >
        <div className="px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
              className="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-lime-400 hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleClick("#contact"); }}
            className="block mt-3 px-4 py-3 text-sm font-semibold bg-lime-400 text-zinc-900 rounded-full text-center hover:bg-lime-300 transition-colors"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { IMAGES, siteContent } from "../data";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={IMAGES.hero}
        alt="FitZone gym floor with modern equipment"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950/90" />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
          Koramangala&apos;s Trusted Fitness Destination Since 2015
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
          {siteContent.gymName} <span className="text-lime-400">&mdash;</span>{" "}
          <span className="text-lime-400">Gym &amp; Fitness Center</span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-300 mt-2">
            in Koramangala, Bangalore
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto">
          {siteContent.tagline}
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-lime-400 text-zinc-900 font-bold text-base rounded-full hover:bg-lime-300 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-lime-400/25"
          >
            Start Your Journey
          </button>
          <button
            onClick={scrollToAbout}
            className="px-8 py-4 border-2 border-zinc-500 text-zinc-200 font-semibold text-base rounded-full hover:border-lime-400 hover:text-lime-400 transition-all"
          >
            Explore Programs
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-zinc-400 hover:text-lime-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}

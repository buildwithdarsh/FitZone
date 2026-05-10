"use client";

import { Dumbbell } from "lucide-react";
import { siteContent } from "../data";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-lime-400" />
              <span className="text-lg font-bold text-white">
                Fit<span className="text-lime-400">Zone</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500">{siteContent.tagline}</p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href={siteContent.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-zinc-800 rounded-full text-zinc-400 hover:text-lime-400 hover:bg-zinc-700 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={siteContent.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-zinc-800 rounded-full text-zinc-400 hover:text-lime-400 hover:bg-zinc-700 transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} FitZone. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Powered by{" "}
            <span className="text-zinc-400 font-medium">Darsh Gupta</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

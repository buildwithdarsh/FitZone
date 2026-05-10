"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "../data";

const TABS = [
  { id: "gym-floor", label: "Gym Floor", images: IMAGES.gallery.gymFloor },
  { id: "classes", label: "Classes", images: IMAGES.gallery.classes },
  { id: "events", label: "Events", images: IMAGES.gallery.events },
  { id: "transformations", label: "Transformations", images: IMAGES.gallery.transformations },
] as const;

export function Gallery() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
  const [lightbox, setLightbox] = useState<{ images: readonly string[]; index: number } | null>(null);

  const currentTab = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">See It In Action</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">Gallery</h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Take a visual tour of FitZone — our space, our classes, our events, and the transformations that happen here every day.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all ${
                activeTab === tab.id
                  ? "bg-lime-400 text-zinc-900"
                  : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 fade-in">
          {currentTab.images.map((src, i) => (
            <button
              key={`${activeTab}-${i}`}
              onClick={() => setLightbox({ images: currentTab.images, index: i })}
              className="group relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={src}
                alt={`FitZone ${currentTab.label.toLowerCase()} — image ${i + 1} of ${currentTab.images.length}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/30 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-zinc-950/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) =>
                prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null,
              );
            }}
            className="absolute left-4 p-2 text-zinc-400 hover:text-white z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) =>
                prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null,
              );
            }}
            className="absolute right-4 p-2 text-zinc-400 hover:text-white z-10"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div
            className="relative w-full max-w-4xl aspect-[3/2] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.images[lightbox.index]}
              alt={`FitZone gallery — full view of ${currentTab.label.toLowerCase()} image ${lightbox.index + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-6 text-zinc-500 text-sm font-mono">
            {lightbox.index + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </section>
  );
}

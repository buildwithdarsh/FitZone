"use client";

import Image from "next/image";
import { IMAGES, aboutStats, aboutContent } from "../data";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 sm:mb-20">
          {aboutStats.map((stat) => (
            <div key={stat.label} className="text-center fade-in">
              <div className="text-3xl sm:text-4xl font-black text-lime-400">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="mt-1 text-sm text-zinc-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content + image grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="fade-in">
            <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">Who We Are</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white leading-tight">
              {aboutContent.title}
            </h2>
            <div className="mt-6 space-y-4">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i} className="text-zinc-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={IMAGES.about}
                alt="FitZone gym interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
              <Image
                src={IMAGES.aboutSecondary}
                alt="FitZone workout area"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-lime-400/20 rounded-2xl -z-10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

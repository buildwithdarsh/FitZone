"use client";

import Image from "next/image";
import { programs } from "../data";

export function Programs() {
  return (
    <section id="programs" className="py-20 sm:py-28 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">What We Offer</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">Programs & Classes</h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            From high-intensity training to mindful movement, we offer programs for every fitness level and goal.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((program, i) => (
            <div
              key={program.id}
              className="group rounded-2xl overflow-hidden bg-zinc-800/50 border border-zinc-700/50 hover:border-lime-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/5 fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={program.image}
                  alt={`${program.name} program at FitZone gym`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">
                  {program.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

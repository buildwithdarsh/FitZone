"use client";

import Image from "next/image";
import { Star, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../data";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">Real Results</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">Transformation Stories</h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Don&apos;t take our word for it. Hear from the members who transformed their lives at FitZone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="rounded-2xl bg-zinc-800/50 border border-zinc-700/50 p-6 hover:border-lime-400/20 transition-all fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-lime-400/30 mb-4" />

              <p className="text-zinc-300 leading-relaxed text-sm mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {t.transformation && (
                <div className="flex items-center gap-3 mb-5 p-3 bg-lime-400/10 rounded-xl">
                  <span className="text-sm font-bold text-zinc-300">{t.transformation.before}</span>
                  <ArrowRight className="h-4 w-4 text-lime-400" />
                  <span className="text-sm font-bold text-lime-400">{t.transformation.after}</span>
                  <span className="text-xs text-zinc-500 ml-auto">{t.transformation.duration}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-700/50">
                <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-lime-400/30">
                  <Image
                    src={t.image}
                    alt={`${t.name}, FitZone member`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-zinc-500">
                    Age {t.age} &middot; Member since {t.memberSince}
                  </div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-lime-400 text-lime-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import { trainers } from "../data";

export function Trainers() {
  return (
    <section id="trainers" className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">Certified Trainers</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">Meet Our Trainers</h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            60+ combined years of experience. Nationally certified. Personally invested in your transformation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <div
              key={trainer.id}
              className="group rounded-2xl bg-zinc-800/50 border border-zinc-700/50 overflow-hidden hover:border-lime-400/30 transition-all duration-300 fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={`${trainer.name}, ${trainer.specialization} trainer at FitZone`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-lime-400 text-sm font-semibold">{trainer.specialization}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                  <Award className="h-4 w-4 text-lime-400" />
                  <span>{trainer.experience} experience</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {trainer.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2.5 py-1 text-xs font-medium bg-zinc-700/50 text-zinc-300 rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

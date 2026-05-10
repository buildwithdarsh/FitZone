"use client";

import Image from "next/image";
import {
  Dumbbell,
  HeartPulse,
  Zap,
  Users,
  Lock,
  Flame,
  Coffee,
  Car,
} from "lucide-react";
import { facilities } from "../data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  dumbbell: Dumbbell,
  "heart-pulse": HeartPulse,
  zap: Zap,
  users: Users,
  lock: Lock,
  flame: Flame,
  coffee: Coffee,
  car: Car,
};

export function Facilities() {
  return (
    <section id="facilities" className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">10,000 Sq Ft Facility</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">Our Facilities</h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            10,000 sq ft of premium fitness space equipped with Life Fitness and Hammer Strength machines.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((facility, i) => {
            const Icon = ICON_MAP[facility.icon] || Dumbbell;
            return (
              <div
                key={facility.id}
                className="group rounded-2xl overflow-hidden bg-zinc-800/50 border border-zinc-700/50 hover:border-lime-400/30 transition-all duration-300 fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={`${facility.name} at FitZone gym Koramangala`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 p-2 bg-lime-400/90 rounded-xl">
                    <Icon className="h-5 w-5 text-zinc-900" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white group-hover:text-lime-400 transition-colors">
                    {facility.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {facility.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

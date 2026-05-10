"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { gyms, trainers, classes, membershipPlans } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import {
  Dumbbell, MapPin, Clock, Star, Search, SlidersHorizontal,
  ChevronRight, Users, ArrowRight, Sparkles, Shield, Zap,
} from "lucide-react";

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=800&fit=crop" alt="Modern gym interior with fitness equipment" fill className="object-cover" priority />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-xs sm:text-sm mb-4 sm:mb-6 backdrop-blur-sm">
            <Sparkles size={14} />
            <span>Trusted by 5,000+ Members Across Bangalore</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4">
            Find Your Trusted <br />
            <span className="text-accent-light">Fitness Home in Bangalore</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-lg">
            Discover gyms, book classes, hire trainers, track every rep — all in one platform.
            Join 5,000+ members transforming their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/member" className="inline-flex items-center justify-center gap-2 h-12 px-6 sm:px-8 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 active:scale-95 transition-all text-sm sm:text-base">
              <Dumbbell size={18} />
              Start Your Journey
            </Link>
            <Link href="/business" className="inline-flex items-center justify-center gap-2 h-12 px-6 sm:px-8 rounded-xl bg-white/15 text-white font-semibold hover:bg-white/25 active:scale-95 transition-all backdrop-blur-sm text-sm sm:text-base">
              List Your Gym
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 grid grid-cols-4 gap-4 sm:flex sm:gap-8 text-sm">
          {[
            { value: "500+", label: "Partner Gyms" },
            { value: "5K+", label: "Active Members" },
            { value: "2,000+", label: "Trainers" },
            { value: "10", label: "Cities" },
          ].map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="text-lg sm:text-2xl font-bold">{s.value}</div>
              <div className="text-white/60 text-[10px] sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 -mt-7 relative z-10">
      <div className="bg-white rounded-2xl shadow-lg border border-border p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
        <div className="flex-1 flex items-center gap-2 px-2 sm:px-3 min-w-0">
          <Search size={18} className="text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gyms, classes..."
            className="w-full h-10 text-sm focus:outline-none min-w-0"
          />
        </div>
        <div className="hidden md:flex items-center gap-2 border-l border-border pl-3">
          <MapPin size={16} className="text-muted" />
          <span className="text-sm text-muted">Koramangala, Bangalore</span>
        </div>
        <button className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center hover:bg-surface-hover transition-colors shrink-0">
          <SlidersHorizontal size={16} className="text-muted" />
        </button>
        <button className="h-10 px-4 sm:px-6 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark active:scale-95 transition-all shrink-0 hidden sm:block">
          Search
        </button>
      </div>
    </div>
  );
}

function GymCard({ gym }: { gym: typeof gyms[0] }) {
  return (
    <Card hover padding={false} className="overflow-hidden fade-in">
      <div className="relative h-48">
        <Image src={gym.image} alt={`${gym.name} gym in ${gym.address.split(",").slice(0, 1).join("")}`} fill className="object-cover" />
        {gym.isPremium && (
          <div className="absolute top-3 left-3">
            <Badge variant="warning">Premium</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={gym.isOpen ? "success" : "danger"}>{gym.isOpen ? "Open Now" : "Closed"}</Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-foreground">{gym.name}</h3>
          <div className="flex items-center gap-1 text-sm shrink-0">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="font-medium">{gym.rating}</span>
            <span className="text-muted text-xs">({gym.reviewCount})</span>
          </div>
        </div>
        <p className="text-xs text-muted mb-3 flex items-center gap-1">
          <MapPin size={12} /> {gym.address.split(",").slice(0, 2).join(",")} — {gym.distance} km
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {gym.classTypes.slice(0, 4).map((c) => (
            <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-muted">{c}</span>
          ))}
          {gym.classTypes.length > 4 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-muted">+{gym.classTypes.length - 4}</span>
          )}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-sm">
            <span className="font-semibold text-foreground">₹{gym.priceRange.min.toLocaleString()}</span>
            <span className="text-muted"> - ₹{gym.priceRange.max.toLocaleString()}/mo</span>
          </div>
          <Link href="/member" className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
            Explore {gym.name} <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </Card>
  );
}

function GymListSection() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Gyms Near You</h2>
          <p className="text-xs sm:text-sm text-muted mt-1">Showing {gyms.length} gyms in Koramangala, Bangalore</p>
        </div>
        <Link href="/member" className="text-xs sm:text-sm text-primary font-medium hover:underline flex items-center gap-1 shrink-0">
          Browse All Gyms <ChevronRight size={14} />
        </Link>
      </div>
      {/* Mobile: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory sm:hidden -mx-3 px-3">
        {gyms.map((gym) => (
          <div key={gym.id} className="min-w-[280px] snap-start"><GymCard gym={gym} /></div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map((gym) => <GymCard key={gym.id} gym={gym} />)}
      </div>
    </section>
  );
}

function PopularClassesSection() {
  const popularClasses = classes.filter((c) => c.booked / c.capacity > 0.7).slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Popular Classes This Week</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularClasses.map((cls) => (
          <Card key={cls.id} hover className="fade-in">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 relative">
                <Image src={cls.image} alt={`${cls.name} fitness class`} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-foreground truncate">{cls.name}</h3>
                <p className="text-xs text-muted">{cls.trainer} — {cls.gym}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                  <span className="flex items-center gap-1"><Clock size={12} /> {cls.time}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {cls.booked}/{cls.capacity}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={cls.booked >= cls.capacity ? "danger" : "success"}>
                    {cls.booked >= cls.capacity ? "Full" : `${cls.capacity - cls.booked} spots left`}
                  </Badge>
                  <Badge variant="default">{cls.difficulty}</Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FeaturedTrainersSection() {
  const featured = trainers.slice(0, 4);

  return (
    <section className="bg-surface py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Featured Trainers</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 -mx-3 px-3 sm:mx-0 sm:px-0">
          {featured.map((trainer) => (
            <Card key={trainer.id} hover className="text-center fade-in min-w-[200px] sm:min-w-0 snap-start">
              <div className="h-16 w-16 rounded-full overflow-hidden mx-auto mb-3 relative">
                <Image src={trainer.avatar} alt={`${trainer.name}, certified personal trainer`} fill className="object-cover" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{trainer.name}</h3>
              <p className="text-xs text-muted mb-2">{trainer.gym}</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                <StarRating rating={trainer.rating} size={14} />
                <span className="text-xs text-muted ml-1">({trainer.reviewCount})</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-center mb-3">
                {trainer.specializations.slice(0, 2).map((s) => (
                  <Badge key={s} variant="primary">{s}</Badge>
                ))}
              </div>
              <div className="text-sm font-semibold text-foreground">₹{trainer.pricePerSession.toLocaleString()}/session</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-16">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Membership Plans & Pricing</h2>
        <p className="text-xs sm:text-sm text-muted mt-2">Choose the plan that fits your fitness goals</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {membershipPlans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl border-2 p-5 sm:p-6 transition-all ${
              plan.popular ? "border-primary shadow-lg shadow-primary/10 md:scale-105" : "border-border"
            }`}
          >
            {plan.popular && (
              <div className="text-center mb-3">
                <Badge variant="primary">Most Chosen by Members</Badge>
              </div>
            )}
            <h3 className="text-xl font-bold text-foreground text-center">{plan.name}</h3>
            <div className="text-center my-4">
              <span className="text-3xl font-bold" style={{ color: plan.color }}>₹{plan.price.toLocaleString()}</span>
              <span className="text-muted text-sm">/{plan.duration}</span>
            </div>
            <ul className="space-y-2.5 mb-6">
              {plan.features.map((f) => (
                <li key={f.name} className="flex items-center gap-2 text-sm">
                  <span className={f.included ? "text-success" : "text-gray-300"}>{f.included ? "✓" : "✕"}</span>
                  <span className={f.included ? "text-foreground" : "text-muted"}>{f.name}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full h-11 rounded-xl text-sm font-semibold transition-colors ${
                plan.popular
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-surface text-foreground hover:bg-surface-hover"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function PortalLinksSection() {
  const portals = [
    { title: "Member Dashboard", desc: "Track workouts, book classes, monitor your progress", href: "/member", icon: Dumbbell, color: "bg-primary" },
    { title: "Business Dashboard", desc: "Manage members, revenue, trainers, and operations", href: "/business", icon: Shield, color: "bg-success" },
    { title: "Trainer Panel", desc: "Manage clients, schedule sessions, track earnings", href: "/trainer", icon: Zap, color: "bg-accent" },
  ];

  return (
    <section className="bg-foreground text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">Explore FitZone Portals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {portals.map((p) => (
            <Link key={p.href} href={p.href} className="group block rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors">
              <div className={`h-12 w-12 rounded-xl ${p.color} flex items-center justify-center mb-4`}>
                <p.icon size={22} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-white/60 mb-4">{p.desc}</p>
              <span className="text-sm text-primary-light font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Open Dashboard <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-white/60 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Dumbbell size={18} className="text-primary-light" />
          <span className="font-bold text-white">FitZone</span>
          <span className="text-sm">by Darsh Gupta</span>
        </div>
        <div className="text-sm">© 2026 FitZone. All rights reserved.</div>
      </div>
    </footer>
  );
}

function MobileTopBar() {
  return (
    <div className="sticky top-0 z-50 sm:hidden">
      <div className="h-12 bg-white/90 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Dumbbell size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-foreground">FitZone</span>
        </div>
        <Link href="/member" className="h-8 px-4 rounded-full bg-primary text-white text-xs font-semibold flex items-center active:scale-95 transition-all">
          Sign In
        </Link>
      </div>
    </div>
  );
}

function MobileBottomCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div className="bg-white/90 backdrop-blur-xl border-t border-border/50 px-4 py-3" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}>
        <Link href="/member" className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-primary text-white font-semibold active:scale-[0.98] transition-all shadow-lg shadow-primary/25">
          <Dumbbell size={18} />
          Start Your Journey
        </Link>
      </div>
    </div>
  );
}

export function HomePageClient() {
  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <MobileTopBar />
      <HeroSection />
      <SearchBar />
      <GymListSection />
      <PopularClassesSection />
      <FeaturedTrainersSection />
      <PricingSection />
      <PortalLinksSection />
      <Footer />
      <MobileBottomCTA />
    </div>
  );
}

"use client";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Programs } from "./components/Programs";
import { Facilities } from "./components/Facilities";
import { Gallery } from "./components/Gallery";
import { Trainers } from "./components/Trainers";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export function StaticBrochureClient() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Facilities />
      <Gallery />
      <Trainers />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

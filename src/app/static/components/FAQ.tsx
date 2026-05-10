"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-700/50 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <h3 className="text-base font-semibold text-white pr-4">{question}</h3>
        <ChevronDown
          className={`h-5 w-5 text-lime-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">Got Questions?</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 fade-in">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

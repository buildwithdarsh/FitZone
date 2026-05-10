"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { siteContent, contactInterests } from "../data";
import { DELAYS } from "@/lib/delay";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "General Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[+]?[\d\s-]{8,15}$/.test(form.phone)) e.phone = "Invalid phone number";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    await DELAYS.action();
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">Contact Us</h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Ready to start your fitness journey? Drop us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div className="order-2 lg:order-1">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 fade-in">
                <div className="p-4 bg-lime-400/10 rounded-full mb-6">
                  <CheckCircle2 className="h-12 w-12 text-lime-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-zinc-400 max-w-sm">
                  Your inquiry has been received. Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", interest: "General Inquiry", message: "" });
                  }}
                  className="mt-6 text-lime-400 text-sm font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Arjun Mehta"
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.name ? "border-red-400" : "border-zinc-700"
                    } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-colors`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="arjun@example.com"
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.email ? "border-red-400" : "border-zinc-700"
                    } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-colors`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 98456 78900"
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.phone ? "border-red-400" : "border-zinc-700"
                    } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-colors`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>

                {/* Interest */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Interested In</label>
                  <select
                    value={form.interest}
                    onChange={(e) => handleChange("interest", e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-colors appearance-none"
                  >
                    {contactInterests.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us about your fitness goals..."
                    rows={4}
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.message ? "border-red-400" : "border-zinc-700"
                    } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-colors resize-none`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-lime-400 text-zinc-900 font-bold rounded-full hover:bg-lime-300 disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info + Map */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Contact info cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
                <MapPin className="h-6 w-6 text-lime-400 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">Address</h3>
                <p className="text-sm text-zinc-400">{siteContent.address}</p>
              </div>
              <div className="p-5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
                <Phone className="h-6 w-6 text-lime-400 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">Phone</h3>
                <p className="text-sm text-zinc-400">{siteContent.phone}</p>
              </div>
              <div className="p-5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
                <Mail className="h-6 w-6 text-lime-400 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">Email</h3>
                <p className="text-sm text-zinc-400">{siteContent.email}</p>
              </div>
              <div className="p-5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
                <Clock className="h-6 w-6 text-lime-400 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">Gym Hours</h3>
                <div className="text-sm text-zinc-400 space-y-0.5">
                  <p>Mon–Sat: {siteContent.hours.morning}</p>
                  <p>Evening: {siteContent.hours.evening}</p>
                  <p>Sunday: {siteContent.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-zinc-700/50 aspect-[16/10]">
              <iframe
                src={siteContent.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FitZone location map"
                className="w-full h-full grayscale contrast-125 opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

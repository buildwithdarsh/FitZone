import type { Metadata } from "next";
import { StaticBrochureClient } from "./static-client";
import { testimonials, faqs, siteContent, programs } from "./data";

export const metadata: Metadata = {
  title: "FitZone Gym Koramangala — Certified Trainers & Free Trial",
  description:
    "Visit FitZone in Koramangala, Bangalore — 10,000 sq ft facility with 10+ fitness programs, 6 certified trainers, free weights, yoga, CrossFit, boxing, and more. Free trial available.",
  alternates: {
    canonical: "/static",
  },
  openGraph: {
    title: "FitZone Gym Koramangala — Certified Trainers & Free Trial",
    description:
      "Visit FitZone in Koramangala, Bangalore — 10,000 sq ft facility with 10+ fitness programs, 6 certified trainers, and a free trial pass.",
    url: "https://fitzone.in/static",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "FitZone gym interior with modern fitness equipment in Koramangala, Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitZone Gym Koramangala — Certified Trainers & Free Trial",
    description:
      "Visit FitZone in Koramangala, Bangalore — 10,000 sq ft facility with 10+ fitness programs, 6 certified trainers, and a free trial pass.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop",
    ],
  },
};

export default function StaticBrochurePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const reviewCount = testimonials.length;
  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / reviewCount;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "FitZone",
    description:
      "10,000 sq ft fitness facility in Koramangala, Bangalore with weight training, yoga, CrossFit, boxing, and 10+ fitness programs. 6 certified trainers and 5,000+ members.",
    url: "https://fitzone.in/static",
    telephone: siteContent.phone,
    email: siteContent.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "42, 3rd Cross, Koramangala 5th Block",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560095",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9352,
      longitude: 77.6146,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "05:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "06:00",
        closes: "12:00",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop",
    priceRange: "₹1,999 - ₹7,999/month",
    hasMap: "https://www.google.com/maps?q=12.9352,77.6146",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t.quote,
    })),
    sameAs: [
      siteContent.social.instagram,
      siteContent.social.youtube,
    ],
    foundingDate: "2015",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://fitzone.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FitZone Gym Koramangala",
        item: "https://fitzone.in/static",
      },
    ],
  };

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: programs.map((program, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: program.name,
        description: program.description,
        provider: {
          "@type": "Organization",
          name: "FitZone",
          url: "https://fitzone.in",
        },
        image: program.image,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <StaticBrochureClient />
    </>
  );
}

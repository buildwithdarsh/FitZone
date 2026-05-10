import type { Metadata } from "next";
import { HomePageClient } from "./home-client";
import { testimonials } from "./static/data";
import { membershipPlans } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "FitZone — Find Gyms, Book Classes & Hire Certified Trainers",
  description:
    "Discover 500+ partner gyms, book fitness classes, and hire certified personal trainers in Bangalore. Track workouts and join 5,000+ active members on FitZone.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FitZone — Find Gyms, Book Classes & Hire Certified Trainers",
    description:
      "Discover 500+ partner gyms, book fitness classes, and hire certified personal trainers in Bangalore. Track workouts and join 5,000+ active members on FitZone.",
    url: "https://fitzone.in",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "FitZone gym interior with modern fitness equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitZone — Find Gyms, Book Classes & Hire Certified Trainers",
    description:
      "Discover 500+ partner gyms, book fitness classes, and hire certified personal trainers in Bangalore. Track workouts and join 5,000+ active members on FitZone.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop",
    ],
  },
};

export default function HomePage() {
  const reviewCount = testimonials.length;
  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / reviewCount;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://fitzone.in/#website",
        url: "https://fitzone.in",
        name: "FitZone",
        description:
          "Discover gyms, book fitness classes, hire certified personal trainers, and track your workouts in Bangalore.",
        publisher: {
          "@id": "https://fitzone.in/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://fitzone.in/#organization",
        name: "FitZone",
        url: "https://fitzone.in",
        logo: {
          "@type": "ImageObject",
          url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=512&h=512&fit=crop",
          width: 512,
          height: 512,
          /* INJECT: replace with proper logo URL (min 112x112px) once logo asset is created */
        },
        sameAs: [
          "https://instagram.com/fitzone.in",
          "https://youtube.com/@fitzoneindia",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-98456-78900",
          contactType: "customer service",
          email: "hello@fitzone.in",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Kannada"],
        },
        foundingDate: "2015",
        address: {
          "@type": "PostalAddress",
          streetAddress: "42, 3rd Cross, Koramangala 5th Block",
          addressLocality: "Bangalore",
          addressRegion: "Karnataka",
          postalCode: "560095",
          addressCountry: "IN",
        },
      },
      {
        "@type": "SportsActivityLocation",
        "@id": "https://fitzone.in/#localbusiness",
        name: "FitZone",
        description:
          "10,000 sq ft fitness facility in Koramangala, Bangalore with weight training, yoga, CrossFit, boxing, and 10+ fitness programs.",
        url: "https://fitzone.in",
        telephone: "+91-98456-78900",
        email: "hello@fitzone.in",
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avgRating,
          reviewCount: reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        hasMap: "https://www.google.com/maps?q=12.9352,77.6146",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://fitzone.in",
          },
        ],
      },
      ...membershipPlans.map((plan) => ({
        "@type": "Product",
        name: `FitZone ${plan.name} Membership`,
        description: `${plan.name} membership plan at FitZone gym — ${plan.features.filter((f) => f.included).map((f) => f.name).join(", ")}.`,
        url: "https://fitzone.in/#pricing",
        brand: {
          "@type": "Organization",
          name: "FitZone",
        },
        offers: {
          "@type": "Offer",
          price: plan.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          priceValidUntil: new Date(new Date().getFullYear() + 1, 0, 1)
            .toISOString()
            .split("T")[0],
          url: "https://fitzone.in/#pricing",
        },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}

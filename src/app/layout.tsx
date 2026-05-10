import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#6d28d9",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fitzone.in"),
  title: {
    default: "FitZone — Trusted Gyms, Classes & Trainers in Bangalore",
    template: "%s | FitZone",
  },
  description:
    "Discover gyms, book fitness classes, hire certified personal trainers, and track your workouts in Bangalore. Join 5,000+ members at FitZone.",
  keywords: [
    "gym bangalore",
    "fitness classes koramangala",
    "personal trainer bangalore",
    "workout tracking",
    "fitzone",
    "gym membership bangalore",
    "yoga classes koramangala",
    "crossfit bangalore",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fitzone.in",
    siteName: "FitZone",
    title: "FitZone — Trusted Gyms, Classes & Trainers in Bangalore",
    description:
      "Discover gyms, book fitness classes, hire certified personal trainers, and track your workouts in Bangalore. Join 5,000+ members at FitZone.",
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
    title: "FitZone — Trusted Gyms, Classes & Trainers in Bangalore",
    description:
      "Discover gyms, book fitness classes, hire certified personal trainers, and track your workouts in Bangalore. Join 5,000+ members at FitZone.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop",
    ],
  },
  alternates: {
    languages: {
      "en-IN": "/",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico", /* INJECT: replace with /apple-touch-icon.png (180x180 PNG) once created */
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FitZone",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full flex flex-col overscroll-none">{children}</body>
    </html>
  );
}

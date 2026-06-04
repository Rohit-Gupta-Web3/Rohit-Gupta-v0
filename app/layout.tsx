import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Rohit Gupta - Technical PM - AI-Native - Blockchain",
  description:
    "Rohit Gupta - Technical Project Manager, AI-Native builder, and Blockchain expert. Architecting and shipping AI, blockchain, and IoT products end to end.",
  keywords: [
    "Rohit Gupta",
    "Technical Project Manager",
    "AI-Native",
    "Blockchain",
    "IoT",
    "Portfolio",
  ],
  openGraph: {
    title: "Rohit Gupta - Technical PM - AI-Native - Blockchain",
    description:
      "Rohit Gupta - Technical Project Manager, AI-Native builder, and Blockchain expert. Architecting and shipping AI, blockchain, and IoT products end to end.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Gupta - Technical PM - AI-Native - Blockchain",
    description:
      "Rohit Gupta - Technical Project Manager, AI-Native builder, and Blockchain expert. Architecting and shipping AI, blockchain, and IoT products end to end.",
  },
  generator: "v0.dev",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05060c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <meta name="color-scheme" content="dark light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rohit Gupta",
              jobTitle: "Technical Project Manager",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

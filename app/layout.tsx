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
  title: "Rohit Gupta - AI Product & Technology Leader",
  description:
    "Rohit Gupta - AI Product & Technology Leader building agentic AI, voice AI, LLM optimization, and Web3 products end to end. Tech Lead, Technical Program Manager, and 2x C# Corner MVP.",
  keywords: [
    "Rohit Gupta",
    "AI Product Leader",
    "Technical Program Manager",
    "Agentic AI",
    "Voice AI",
    "Web3",
    "Blockchain",
    "Portfolio",
  ],
  openGraph: {
    title: "Rohit Gupta - AI Product & Technology Leader",
    description:
      "Rohit Gupta - AI Product & Technology Leader building agentic AI, voice AI, LLM optimization, and Web3 products end to end.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Gupta - AI Product & Technology Leader",
    description:
      "Rohit Gupta - AI Product & Technology Leader building agentic AI, voice AI, LLM optimization, and Web3 products end to end.",
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
              jobTitle: "AI Product & Technology Leader",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

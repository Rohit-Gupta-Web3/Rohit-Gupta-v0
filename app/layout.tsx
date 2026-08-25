import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getSiteUrl, withBasePath } from "@/lib/site";

// Google Analytics 4 measurement id (e.g. "G-XXXXXXXXXX"), supplied at build
// time. Analytics only render when this is set, so local/dev builds stay clean.
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

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

const siteUrl = getSiteUrl();
const cspPolicy =
  "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com";

const profileLinks = {
  linkedin: "https://www.linkedin.com/in/rohit-gupta-ai/",
  github: "https://github.com/Rohit-Gupta-Web3",
  x: "https://x.com/RohitGuptaWeb3",
};

const description =
  "Rohit Gupta - AI Product & Technology Leader building agentic AI, voice AI, LLM optimization, and Web3 products end to end. AI Product Manager, Technical Program Manager, AI Transformation lead, and 2x C# Corner MVP based in Noida, India.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rohit Gupta - AI Product & Technology Leader",
  description,
  keywords: [
    "Rohit Gupta",
    "AI Product Manager",
    "Technical Product Manager",
    "AI Program Manager",
    "Technical Program Manager",
    "AI Transformation",
    "Emerging Technology Leader",
    "Agentic AI",
    "Voice AI",
    "LLM",
    "Web3",
    "Blockchain",
    "Portfolio",
  ],
  authors: [{ name: "Rohit Gupta", url: siteUrl }],
  creator: "Rohit Gupta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rohit Gupta - AI Product & Technology Leader",
    description,
    url: siteUrl,
    siteName: "Rohit Gupta",
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/rohit.png`,
        alt: "Rohit Gupta - AI Product & Technology Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Gupta - AI Product & Technology Leader",
    description,
    creator: "@RohitGuptaWeb3",
    images: [`${siteUrl}/rohit.png`],
  },
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
        <meta httpEquiv="Content-Security-Policy" content={cspPolicy} />
        <meta
          name="referrer"
          content="strict-origin-when-cross-origin"
        />
        <link
          rel="preload"
          as="image"
          href={withBasePath("/rohit.avif")}
          type="image/avif"
          fetchPriority="high"
        />
        <meta name="color-scheme" content="dark light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Rohit Gupta",
                  description,
                  inLanguage: "en",
                  publisher: { "@id": `${siteUrl}/#person` },
                },
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: "Rohit Gupta",
                  url: siteUrl,
                  image: `${siteUrl}/rohit.png`,
                  jobTitle: "AI Product & Technology Leader",
                  description,
                  email: "mailto:gupta.rohitg.rohit900@gmail.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Noida",
                    addressRegion: "Uttar Pradesh",
                    addressCountry: "IN",
                  },
                  worksFor: {
                    "@type": "Organization",
                    name: "Thinkverse Labs",
                  },
                  alumniOf: [
                    {
                      "@type": "CollegeOrUniversity",
                      name: "University of Delhi",
                    },
                  ],
                  knowsAbout: [
                    "Artificial Intelligence",
                    "AI Product Management",
                    "Technical Program Management",
                    "Agentic AI",
                    "Voice AI",
                    "Large Language Models",
                    "AI Transformation",
                    "Web3",
                    "Blockchain",
                    "Solidity",
                    "Algorand",
                    "Polygon",
                  ],
                  award: "C# Corner MVP",
                  sameAs: [
                    profileLinks.linkedin,
                    profileLinks.github,
                    profileLinks.x,
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              src={withBasePath(`/analytics-init.js?gaId=${encodeURIComponent(gaId)}`)}
              strategy="afterInteractive"
            />
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { CookieConsent } from "@/components/analytics/cookie-consent"
import { GA_TRACKING_ID } from "@/lib/analytics"
import { Suspense } from "react"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Rohit Gupta | Technical Project Manager",
  description: "Professional portfolio of Rohit Gupta, Technical Project Manager specializing in Blockchain & IoT",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#0f172a",
  openGraph: {
    title: "Rohit Gupta | Technical Project Manager",
    description: "Professional portfolio of Rohit Gupta, Technical Project Manager specializing in Blockchain & IoT",
    type: "website",
    locale: "en_US",
    url: "https://rohit-gupta.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Gupta | Technical Project Manager",
    description: "Professional portfolio of Rohit Gupta, Technical Project Manager specializing in Blockchain & IoT",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rohit.jpg-v0vd0xDZFnAZoKjZtI4MfOVaxX0iUj.jpeg"
          as="image"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AnalyticsProvider>
            <Suspense>{children}</Suspense>
            <CookieConsent />
            <Toaster />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

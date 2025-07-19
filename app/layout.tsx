import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rohit-gupta.vercel.app'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Rohit Gupta',
    'Technical Project Manager',
    'AI Expert',
    'Blockchain',
    'IoT',
    'Portfolio',
  ],
  title: "Rohit Gupta | Technical Project Manager & AI Expert",
  description: "Professional portfolio of Rohit Gupta, Technical Project Manager and AI Expert specializing in Blockchain & IoT",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#0f172a",
  openGraph: {
    title: "Rohit Gupta | Technical Project Manager & AI Expert",
    description: "Professional portfolio of Rohit Gupta, Technical Project Manager and AI Expert specializing in Blockchain & IoT",
    type: "website",
    locale: "en_US",
    url: "https://rohit-gupta.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Gupta | Technical Project Manager & AI Expert",
    description: "Professional portfolio of Rohit Gupta, Technical Project Manager and AI Expert specializing in Blockchain & IoT",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Rohit Gupta',
              url: 'https://rohit-gupta.vercel.app',
              jobTitle: 'Technical Project Manager',
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense>{children}</Suspense>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

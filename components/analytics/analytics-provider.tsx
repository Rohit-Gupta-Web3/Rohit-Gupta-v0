"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { initGA } from "@/lib/analytics"

interface AnalyticsContextType {
  isAnalyticsEnabled: boolean
  enableAnalytics: () => void
  disableAnalytics: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false)

  useEffect(() => {
    // Check if user has consented to analytics
    const consent = localStorage.getItem("analytics-consent")
    if (consent === "true") {
      setIsAnalyticsEnabled(true)
      initGA()
    }
  }, [])

  const enableAnalytics = () => {
    localStorage.setItem("analytics-consent", "true")
    setIsAnalyticsEnabled(true)
    initGA()
  }

  const disableAnalytics = () => {
    localStorage.setItem("analytics-consent", "false")
    setIsAnalyticsEnabled(false)

    // Disable GA
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      })
    }
  }

  return (
    <AnalyticsContext.Provider value={{ isAnalyticsEnabled, enableAnalytics, disableAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalyticsContext must be used within an AnalyticsProvider")
  }
  return context
}

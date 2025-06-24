"use client"

import { useEffect } from "react"
import { trackPerformance, trackError } from "@/lib/analytics"

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ("PerformanceObserver" in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          if (lastEntry) {
            trackPerformance("LCP", Math.round(lastEntry.startTime))
          }
        })
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            trackPerformance("FID", Math.round(entry.processingStart - entry.startTime))
          })
        })
        fidObserver.observe({ entryTypes: ["first-input"] })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          trackPerformance("CLS", Math.round(clsValue * 1000))
        })
        clsObserver.observe({ entryTypes: ["layout-shift"] })
      }

      // Track page load time
      window.addEventListener("load", () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
        trackPerformance("page_load_time", loadTime)
      })

      // Track Time to First Byte (TTFB)
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart
      trackPerformance("TTFB", ttfb)
    }

    // Track JavaScript errors
    const trackJSErrors = () => {
      window.addEventListener("error", (event) => {
        trackError(new Error(event.message), {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        })
      })

      window.addEventListener("unhandledrejection", (event) => {
        trackError(new Error("Unhandled Promise Rejection"), {
          reason: event.reason,
        })
      })
    }

    trackWebVitals()
    trackJSErrors()
  }, [])

  // Track custom performance metrics
  const trackCustomMetric = (name: string, startTime: number) => {
    const endTime = performance.now()
    const duration = endTime - startTime
    trackPerformance(name, Math.round(duration))
  }

  return { trackCustomMetric }
}

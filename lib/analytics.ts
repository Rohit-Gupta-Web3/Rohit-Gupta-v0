"use client"

// Google Analytics 4 configuration and utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === "undefined") return

  // Create dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || []

  // Define gtag function
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  // Configure GA
  window.gtag("js", new Date())
  window.gtag("config", GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
    anonymize_ip: true, // GDPR compliance
    allow_google_signals: false, // Privacy-focused
    allow_ad_personalization_signals: false,
  })
}

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
    page_title: title || document.title,
  })
}

// Custom event tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, any>,
) => {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    ...customParameters,
  })
}

// Conversion tracking
export const trackConversion = (conversionId: string, value?: number, currency = "USD") => {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("event", "conversion", {
    send_to: conversionId,
    value: value,
    currency: currency,
  })
}

// User engagement tracking
export const trackEngagement = (engagementTime: number, scrollDepth: number) => {
  trackEvent("engagement", "user_behavior", "session_engagement", engagementTime, {
    scroll_depth: scrollDepth,
    engagement_time_msec: engagementTime,
  })
}

// Error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  trackEvent("exception", "error", error.message, undefined, {
    description: error.stack,
    fatal: false,
    error_info: errorInfo,
  })
}

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit = "ms") => {
  trackEvent("timing_complete", "performance", metric, value, {
    name: metric,
    value: value,
    unit: unit,
  })
}

// Social sharing tracking
export const trackSocialShare = (platform: string, url: string) => {
  trackEvent("share", "social", platform, undefined, {
    content_type: "portfolio",
    item_id: url,
  })
}

// Download tracking
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent("file_download", "engagement", fileName, undefined, {
    file_extension: fileType,
    file_name: fileName,
  })
}

// Contact form tracking
export const trackContactForm = (action: "start" | "submit" | "success" | "error", formData?: any) => {
  trackEvent(`contact_form_${action}`, "lead_generation", action, undefined, {
    form_data: formData ? Object.keys(formData).join(",") : undefined,
  })
}

// Scroll depth tracking
export const trackScrollDepth = (depth: number) => {
  const milestones = [25, 50, 75, 90, 100]
  const milestone = milestones.find((m) => depth >= m && depth < m + 5)

  if (milestone) {
    trackEvent("scroll", "engagement", `${milestone}%`, milestone)
  }
}

// Time on page tracking
export const trackTimeOnPage = (timeSpent: number, pageUrl: string) => {
  trackEvent("page_view_time", "engagement", pageUrl, timeSpent, {
    time_on_page: timeSpent,
    page_url: pageUrl,
  })
}

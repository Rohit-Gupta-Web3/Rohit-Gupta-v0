"use client"

import { useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { trackPageView, trackEvent, trackScrollDepth, trackTimeOnPage, trackEngagement } from "@/lib/analytics"

export function useAnalytics() {
  const pathname = usePathname()
  const startTimeRef = useRef<number>(Date.now())
  const scrollDepthRef = useRef<number>(0)
  const engagementTimeRef = useRef<number>(0)

  // Track page views
  useEffect(() => {
    trackPageView(pathname)
    startTimeRef.current = Date.now()
  }, [pathname])

  // Track time on page when component unmounts or page changes
  useEffect(() => {
    return () => {
      const timeSpent = Date.now() - startTimeRef.current
      trackTimeOnPage(timeSpent, pathname)
    }
  }, [pathname])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100)

      if (scrollPercent > scrollDepthRef.current) {
        scrollDepthRef.current = scrollPercent
        trackScrollDepth(scrollPercent)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track user engagement
  useEffect(() => {
    const trackEngagementTime = () => {
      engagementTimeRef.current += 1000 // Increment by 1 second
    }

    const interval = setInterval(trackEngagementTime, 1000)

    return () => {
      clearInterval(interval)
      trackEngagement(engagementTimeRef.current, scrollDepthRef.current)
    }
  }, [])

  // Custom event tracking functions
  const trackButtonClick = useCallback(
    (buttonName: string, section: string) => {
      trackEvent("click", "button", buttonName, undefined, {
        section: section,
        page: pathname,
      })
    },
    [pathname],
  )

  const trackSectionView = useCallback(
    (sectionName: string) => {
      trackEvent("section_view", "navigation", sectionName, undefined, {
        page: pathname,
      })
    },
    [pathname],
  )

  const trackProjectView = useCallback(
    (projectName: string) => {
      trackEvent("project_view", "portfolio", projectName, undefined, {
        page: pathname,
      })
    },
    [pathname],
  )

  const trackSkillInteraction = useCallback(
    (skillName: string, action: string) => {
      trackEvent("skill_interaction", "skills", skillName, undefined, {
        action: action,
        page: pathname,
      })
    },
    [pathname],
  )

  const trackContactInteraction = useCallback(
    (action: string, field?: string) => {
      trackEvent("contact_interaction", "contact", action, undefined, {
        field: field,
        page: pathname,
      })
    },
    [pathname],
  )

  return {
    trackButtonClick,
    trackSectionView,
    trackProjectView,
    trackSkillInteraction,
    trackContactInteraction,
  }
}

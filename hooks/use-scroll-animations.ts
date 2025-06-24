"use client"

import { useEffect, useState, useRef } from "react"
import { useScroll, useTransform, useSpring } from "framer-motion"

export function useScrollAnimations() {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", updateScrollY, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollY)
  }, [])

  return { scrollY, scrollYProgress, smoothProgress }
}

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return { ref, y, opacity }
}

export function useRevealAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])

  return { ref, opacity, scale, y }
}

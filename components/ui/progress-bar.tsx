"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  label: string
  className?: string
  color?: string
  animated?: boolean
}

export function ProgressBar({ value, label, className, color = "bg-primary", animated = true }: ProgressBarProps) {
  const [width, setWidth] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setWidth(value)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, value])

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden" ref={progressRef}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            color,
            animated ? "transition-all duration-1000 ease-out" : "",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

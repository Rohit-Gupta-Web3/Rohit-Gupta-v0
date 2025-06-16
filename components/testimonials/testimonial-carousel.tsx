"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TestimonialCard } from "@/components/testimonials/testimonial-card"
import { testimonials } from "@/data/testimonials"

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Handle next/previous
  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      handleNext()
    }, 8000) // 8 seconds per testimonial

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">What My Colleagues Say</h3>
        <p className="text-muted-foreground">Real LinkedIn recommendations from team members and collaborators</p>
      </div>

      <div className="overflow-hidden relative min-h-[350px] md:min-h-[300px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full"
          >
            <TestimonialCard testimonial={testimonials[currentIndex]} featured />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center mt-8 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
          className="border-white/20 hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-6" : "bg-muted"
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
                setAutoplay(false) // Stop autoplay when user interacts
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setAutoplay(!autoplay)}
          aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
          className="border-white/20 hover:bg-white/10"
        >
          {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          aria-label="Next testimonial"
          className="border-white/20 hover:bg-white/10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} of {testimonials.length} recommendations
        </p>
      </div>
    </div>
  )
}

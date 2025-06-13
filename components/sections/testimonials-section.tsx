"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { testimonials } from "@/data/testimonials"

export default function TestimonialsSection() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [testimonialDirection, setTestimonialDirection] = useState(0)

  // Handle testimonial navigation with optimized animations
  const handleNextTestimonial = () => {
    setTestimonialDirection(1)
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handlePreviousTestimonial = () => {
    setTestimonialDirection(-1)
    setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Optimized animation variants
  const testimonialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    }),
  }

  return (
    <div className="container mx-auto px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        What People Say
      </motion.h2>

      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden h-[300px] md:h-[250px]">
          <AnimatePresence initial={false} custom={testimonialDirection} mode="wait">
            <motion.div
              key={currentTestimonialIndex}
              custom={testimonialDirection}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              <div className="testimonial-card">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
                      {testimonials[currentTestimonialIndex].name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white/90">{testimonials[currentTestimonialIndex].name}</h3>
                    <p className="text-sm text-white/60">
                      {testimonials[currentTestimonialIndex].position}, {testimonials[currentTestimonialIndex].company}
                    </p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < testimonials[currentTestimonialIndex].rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-500",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/80 italic">"{testimonials[currentTestimonialIndex].text}"</p>
                <div className="mt-4 text-xs font-medium uppercase tracking-wider text-white/50">
                  {testimonials[currentTestimonialIndex].relationship}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousTestimonial}
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
                  index === currentTestimonialIndex ? "bg-primary w-4" : "bg-white/30"
                }`}
                onClick={() => {
                  setTestimonialDirection(index > currentTestimonialIndex ? 1 : -1)
                  setCurrentTestimonialIndex(index)
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextTestimonial}
            aria-label="Next testimonial"
            className="border-white/20 hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

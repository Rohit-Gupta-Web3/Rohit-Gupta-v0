"use client"

import { motion } from "framer-motion"
import { TestimonialCarousel } from "@/components/testimonials/testimonial-carousel"
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Presentation } from "lucide-react"

export default function TestimonialsSection() {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">LinkedIn Recommendations</h2>
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
          Authentic recommendations from colleagues, team members, and collaborators who have worked with me on various
          blockchain, IoT, and software development projects.
        </p>

        <div className="flex justify-center gap-2">
          <Button
            variant={viewMode === "carousel" ? "default" : "outline"}
            onClick={() => setViewMode("carousel")}
            className={viewMode !== "carousel" ? "border-white/20 hover:bg-white/10" : ""}
          >
            <Presentation className="mr-2 h-4 w-4" />
            Carousel View
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className={viewMode !== "grid" ? "border-white/20 hover:bg-white/10" : ""}
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Grid View
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {viewMode === "carousel" ? <TestimonialCarousel /> : <TestimonialsGrid />}
      </motion.div>
    </div>
  )
}

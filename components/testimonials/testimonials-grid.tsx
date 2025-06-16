"use client"

import { useState } from "react"
import { TestimonialCard } from "@/components/testimonials/testimonial-card"
import { Button } from "@/components/ui/button"
import { testimonials } from "@/data/testimonials"
import { motion } from "framer-motion"

type FilterType = "all" | "colleague" | "client"

export function TestimonialsGrid() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [showAll, setShowAll] = useState(false)

  const filteredTestimonials =
    filter === "all" ? testimonials : testimonials.filter((testimonial) => testimonial.relationship === filter)

  // Show only first 6 testimonials initially, unless showAll is true
  const displayedTestimonials = showAll ? filteredTestimonials : filteredTestimonials.slice(0, 6)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">LinkedIn Recommendations</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real recommendations from colleagues and clients who have worked with me on various blockchain and IoT
          projects.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All ({testimonials.length})
        </Button>
        <Button variant={filter === "colleague" ? "default" : "outline"} onClick={() => setFilter("colleague")}>
          Colleagues ({testimonials.filter((t) => t.relationship === "colleague").length})
        </Button>
        <Button variant={filter === "client" ? "default" : "outline"} onClick={() => setFilter("client")}>
          Clients ({testimonials.filter((t) => t.relationship === "client").length})
        </Button>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayedTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TestimonialCard testimonial={testimonial} />
          </motion.div>
        ))}
      </motion.div>

      {filteredTestimonials.length > 6 && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)} className="border-white/20 hover:bg-white/10">
            {showAll ? "Show Less" : `Show All ${filteredTestimonials.length} Recommendations`}
          </Button>
        </div>
      )}
    </div>
  )
}

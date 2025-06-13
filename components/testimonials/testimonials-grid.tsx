"use client"

import { useState } from "react"
import { TestimonialCard } from "@/components/testimonials/testimonial-card"
import { Button } from "@/components/ui/button"
import { testimonials } from "@/data/testimonials"

type FilterType = "all" | "client" | "colleague" | "mentor" | "student"

export function TestimonialsGrid() {
  const [filter, setFilter] = useState<FilterType>("all")

  const filteredTestimonials =
    filter === "all" ? testimonials : testimonials.filter((testimonial) => testimonial.relationship === filter)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All
        </Button>
        <Button variant={filter === "client" ? "default" : "outline"} onClick={() => setFilter("client")}>
          Clients
        </Button>
        <Button variant={filter === "colleague" ? "default" : "outline"} onClick={() => setFilter("colleague")}>
          Colleagues
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            featured={index === 0 && filteredTestimonials.length > 1}
          />
        ))}
      </div>
    </div>
  )
}

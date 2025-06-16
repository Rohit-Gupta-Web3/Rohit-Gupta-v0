import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/types/testimonial"

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
  featured?: boolean
}

export function TestimonialCard({ testimonial, className, featured = false }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "gradient-border p-6 bg-card rounded-lg transition-all hover-lift relative",
        featured ? "md:col-span-2 lg:col-span-1" : "",
        className,
      )}
    >
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="h-8 w-8 text-primary" />
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
          {testimonial.image ? (
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
              {testimonial.name
                .split(" ")
                .map((n) => n.charAt(0))
                .join("")}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground font-medium">{testimonial.position}</p>
          <p className="text-xs text-muted-foreground">{testimonial.company}</p>
          <div className="flex mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-muted-foreground italic leading-relaxed">"{testimonial.text}"</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
          {testimonial.relationship}
        </div>
        <div className="text-xs text-muted-foreground">LinkedIn Recommendation</div>
      </div>
    </div>
  )
}

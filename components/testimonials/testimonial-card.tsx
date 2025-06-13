import Image from "next/image"
import { Star } from "lucide-react"
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
        "gradient-border p-6 bg-card rounded-lg transition-all",
        featured ? "md:col-span-2" : "",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
          {testimonial.image ? (
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
              {testimonial.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold">{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground">
            {testimonial.position}, {testimonial.company}
          </p>
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300")}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-muted-foreground italic">"{testimonial.text}"</p>
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {testimonial.relationship}
      </div>
    </div>
  )
}

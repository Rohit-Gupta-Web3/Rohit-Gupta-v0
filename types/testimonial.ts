export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  image?: string
  text: string
  rating: number
  relationship: "client" | "colleague" | "mentor" | "student"
}

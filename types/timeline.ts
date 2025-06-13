export interface TimelineEntry {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
  icon: string
  category: "work" | "education" | "achievement"
}

"use client"

import { useState } from "react"
import { TimelineItem } from "@/components/timeline/timeline-item"
import { Button } from "@/components/ui/button"
import { timelineData } from "@/data/timeline"
import { Briefcase, GraduationCap, Award } from "lucide-react"

type FilterCategory = "all" | "work" | "education" | "achievement"

export function Timeline() {
  const [filter, setFilter] = useState<FilterCategory>("all")

  const filteredData = filter === "all" ? timelineData : timelineData.filter((item) => item.category === filter)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="flex items-center gap-2"
        >
          All
        </Button>
        <Button
          variant={filter === "work" ? "default" : "outline"}
          onClick={() => setFilter("work")}
          className="flex items-center gap-2"
        >
          <Briefcase className="h-4 w-4" />
          Work
        </Button>
        <Button
          variant={filter === "education" ? "default" : "outline"}
          onClick={() => setFilter("education")}
          className="flex items-center gap-2"
        >
          <GraduationCap className="h-4 w-4" />
          Education
        </Button>
        <Button
          variant={filter === "achievement" ? "default" : "outline"}
          onClick={() => setFilter("achievement")}
          className="flex items-center gap-2"
        >
          <Award className="h-4 w-4" />
          Achievements
        </Button>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"></div>

        <div className="space-y-12">
          {filteredData.map((item, index) => (
            <TimelineItem key={item.id} item={item} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  )
}

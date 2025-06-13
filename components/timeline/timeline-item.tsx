"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { TimelineEntry } from "@/types/timeline"
import {
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FileText,
  Users,
  BookOpen,
  Cpu,
  PinIcon as Chip,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface TimelineItemProps {
  item: TimelineEntry
  isEven: boolean
}

export function TimelineItem({ item, isEven }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const getIcon = () => {
    switch (item.icon) {
      case "Code":
        return <Code className="h-6 w-6" />
      case "FileText":
        return <FileText className="h-6 w-6" />
      case "Users":
        return <Users className="h-6 w-6" />
      case "BookOpen":
        return <BookOpen className="h-6 w-6" />
      case "Cpu":
        return <Cpu className="h-6 w-6" />
      case "Chip":
        return <Chip className="h-6 w-6" />
      case "GraduationCap":
        return <GraduationCap className="h-6 w-6" />
      case "Award":
        return <Award className="h-6 w-6" />
      default:
        return <Briefcase className="h-6 w-6" />
    }
  }

  const getCategoryColor = () => {
    switch (item.category) {
      case "work":
        return "bg-blue-600"
      case "education":
        return "bg-purple-600"
      case "achievement":
        return "bg-amber-600"
      default:
        return "bg-blue-600"
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      x: isEven ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div
      ref={itemRef}
      className={cn(
        "relative flex flex-col md:flex-row items-center md:items-start gap-4",
        isEven ? "md:flex-row-reverse" : "",
      )}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-background bg-primary"></div>

      {/* Content */}
      <motion.div
        className={cn(
          "w-full md:w-[calc(50%-20px)] gradient-border p-6 bg-card cursor-pointer",
          isExpanded ? "shadow-lg" : "",
        )}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-full ${getCategoryColor()} text-white`}>{getIcon()}</div>
          <div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-muted-foreground">{item.company}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium bg-muted px-3 py-1 rounded-full">
            {item.startDate} - {item.endDate}
          </div>
          <button
            className="text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>

        <p className="text-muted-foreground mb-4">{item.description}</p>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <h4 className="font-medium mb-2">Key Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {item.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

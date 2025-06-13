"use client"

import { useState } from "react"
import { SkillCategory } from "@/components/skills/skill-category"
import { SkillBadge } from "@/components/skills/skill-badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function SkillsGrid() {
  const [showAllCertifications, setShowAllCertifications] = useState(false)

  const programmingSkills = [
    { name: "Python", level: 95 },
    { name: "C#/.NET", level: 90 },
    { name: "Solidity", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "SQL", level: 85 },
  ]

  const frameworkSkills = [
    { name: "Django", level: 90 },
    { name: "Blazor", level: 85 },
    { name: "Radzen", level: 80 },
    { name: "EVM", level: 85 },
  ]

  const domainSkills = [
    { name: "Blockchain", level: 90 },
    { name: "IoT", level: 85 },
    { name: "AI/ML", level: 80 },
    { name: "Computer Vision", level: 75 },
    { name: "ALPR", level: 85 },
  ]

  const toolSkills = [
    { name: "Azure", level: 90 },
    { name: "Jira", level: 85 },
    { name: "ClickUp", level: 80 },
    { name: "Azure Boards", level: 85 },
    { name: "Raspberry Pi", level: 90 },
  ]

  const certifications = [
    "gEDA PCB Design",
    "Intel OpenVINO Fundamental",
    "PIC Microcontroller (18F4520)",
    "Subnet Architecture",
    "Build a Face Recognition App (Python)",
    "Advanced Python Programming",
    "Blockchain Development",
    "IoT Solutions Architecture",
    "Azure Cloud Services",
    "Agile Project Management",
  ]

  const visibleCertifications = showAllCertifications ? certifications : certifications.slice(0, 5)

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="gradient-border p-6 bg-card">
          <SkillCategory title="Programming Languages" skills={programmingSkills} />
        </div>
        <div className="gradient-border p-6 bg-card">
          <SkillCategory title="Frameworks & Libraries" skills={frameworkSkills} />
        </div>
        <div className="gradient-border p-6 bg-card">
          <SkillCategory title="Domain Expertise" skills={domainSkills} />
        </div>
        <div className="gradient-border p-6 bg-card">
          <SkillCategory title="Tools & Platforms" skills={toolSkills} />
        </div>
      </div>

      <div className="gradient-border p-6 bg-card">
        <h3 className="text-xl font-semibold mb-4">Certifications & Training</h3>
        <div className="flex flex-wrap gap-2">
          {visibleCertifications.map((cert) => (
            <SkillBadge key={cert} name={cert} />
          ))}
        </div>
        {certifications.length > 5 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllCertifications(!showAllCertifications)}
            className="mt-4"
          >
            {showAllCertifications ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" /> Show More
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

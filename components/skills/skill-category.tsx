import { ProgressBar } from "@/components/ui/progress-bar"

interface Skill {
  name: string
  level: number
}

interface SkillCategoryProps {
  title: string
  skills: Skill[]
  className?: string
}

export function SkillCategory({ title, skills, className }: SkillCategoryProps) {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <ProgressBar key={skill.name} label={skill.name} value={skill.level} />
        ))}
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  name: string
  className?: string
}

export function SkillBadge({ name, className }: SkillBadgeProps) {
  return (
    <div
      className={cn(
        "px-3 py-1.5 rounded-full bg-secondary/50 text-sm font-medium inline-flex items-center justify-center",
        className,
      )}
    >
      {name}
    </div>
  )
}

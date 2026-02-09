"use client"

import * as React from "react"
import { CheckCircle2, ClipboardList, Flag, Plus, Sparkles, Trash2 } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const TASK_TITLE_MAX = 80
const SUBTASK_TITLE_MAX = 100
const SUBTASK_DESC_MAX = 240
const STORAGE_KEY = "todo-ux-v1"

type TaskPriority = "Low" | "Medium" | "High" | "Critical"

const PRIORITY_OPTIONS: TaskPriority[] = ["Low", "Medium", "High", "Critical"]

type SeedItem = {
  id: string
  title: string
  desc?: string
  link?: string
  tags?: string[]
}

type SeedSection = {
  id: string
  name: string
  chip: { text: string; cls: string }
  items: SeedItem[]
  money?: { who: string; amt: string }[]
}

const SEED_SECTIONS: SeedSection[] = [
  {
    id: "conf",
    name: "AI Agents Conf 2026",
    chip: { text: "Needs decision", cls: "pri" },
    items: [
      {
        id: "conf-topic",
        title: "Provide topic for AI Agents conference 2026",
        desc: "Deliverable: title + 3-bullet outline + target audience.",
        tags: ["High leverage"],
      },
    ],
  },
  {
    id: "money",
    name: "Money",
    chip: { text: "Amounts", cls: "ok" },
    money: [
      { who: "Barkha", amt: "₹25,000" },
      { who: "Mummy", amt: "₹17,000" },
    ],
    items: [],
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    chip: { text: "Partnership", cls: "info" },
    items: [
      {
        id: "oc-explore",
        title: "Explore OpenClaw for HackIndia / Sharp Rewards",
        desc: "openclaw.com",
        link: "https://openclaw.com/",
        tags: ["Partnership"],
      },
      {
        id: "oc-training",
        title: "Launch paid OpenClaw training (devs / companies / colleges)",
        desc: "Define curriculum, pricing, and delivery model.",
        tags: ["Revenue"],
      },
      {
        id: "oc-hackathon",
        title: "Run an OpenClaw virtual hackathon",
        desc: "For developers + students; align prizes with Sharp Rewards.",
        tags: ["Community"],
      },
    ],
  },
  {
    id: "token-utility",
    name: "Token Utility & Demand",
    chip: { text: "Core", cls: "info" },
    items: [
      { id: "tu-cscorner", title: "C# Corner: paid content + MVP sessions (token demand)", tags: ["Utility"] },
      { id: "tu-career", title: "Career services: hire devs, mentorship, paid live shows", tags: ["Utility"] },
      { id: "tu-learnai", title: "LearnAI: training + bootcamps", tags: ["Utility"] },
      { id: "tu-vibe", title: "Vibe Code Fixer: paid fixes", tags: ["Utility"] },
      { id: "tu-ebooks", title: "E-books & guides (GenAI / LLM / Prompt Engineering)", tags: ["Utility"] },
      { id: "tu-events", title: "Paid events / memberships / token-gated experiences", tags: ["Utility"] },
    ],
  },
  {
    id: "sharp-economy",
    name: "Sharp Economy",
    chip: { text: "Very high priority", cls: "hot" },
    items: [
      {
        id: "se-polygon",
        title: "Define token utility + Polygon integration (certificates on Polygon)",
        tags: ["Polygon"],
      },
      { id: "se-onramp", title: "Fiat on-ramp (US): evaluate 0x + alternatives", tags: ["Decision"] },
      { id: "se-colleges", title: "College partnerships & sponsorships (token lockup offers)", tags: ["Outreach"] },
      { id: "se-hods", title: "Engage Tier-2/3 HoDs to promote adoption", tags: ["Outreach"] },
      { id: "se-seo", title: "SEO: own “learn-to-earn / utility token” → Sharp Economy", tags: ["Growth"] },
      {
        id: "se-burn",
        title: "Monthly token burn event (start next month)",
        desc: "Publish cadence + proof (tx link page).",
        tags: ["Must ship"],
      },
      { id: "se-powered", title: "Add “Powered by Polygon” section + rationale on token page", tags: ["Brand"] },
    ],
  },
  {
    id: "sharp-rewards",
    name: "Sharp Rewards",
    chip: { text: "Top 3 this week", cls: "pri" },
    items: [
      { id: "sr-jwt", title: "JWT (highest priority)", tags: ["Top"] },
      {
        id: "sr-notif",
        title: "Notifications (in-app + email)",
        desc: "Quiz/streak/new quizzes/features/announcements/claim reminders.",
        tags: ["Retention"],
      },
      { id: "sr-streak", title: "Streak restore", tags: ["Retention"] },
      { id: "sr-referral", title: "Remove referral condition for US residents", tags: ["Policy"] },
      { id: "sr-shoplimit", title: "100 order limit in shop", tags: ["Guardrail"] },
      {
        id: "sr-quiz",
        title: "Quiz expansion (new questions + AI current affairs + trivia quiz type)",
        desc: "Geo rules + admin-toggle trivia topic card.",
        tags: ["Engagement"],
      },
      { id: "sr-lockup", title: "Token lockup", tags: ["Tokenomics"] },
      { id: "sr-stake", title: "DEX-level staking using 0x", tags: ["DeFi"] },
      { id: "sr-premium", title: "Premium membership (USA only)", tags: ["Monetize"] },
      { id: "sr-levels", title: "Member levels", tags: ["Progression"] },
      { id: "sr-offline", title: "Offline signing", tags: ["Security"] },
      { id: "sr-oss", title: "Open source Sharp Rewards app API", tags: ["Trust"] },
      { id: "sr-feed", title: "Feed", tags: ["Engagement"] },
      { id: "sr-gpt", title: "Add Sharp GPT in Sharp Rewards", tags: ["AI"] },
      { id: "sr-streakui", title: "Change streak UI", tags: ["UX"] },
      { id: "sr-pred", title: "Prediction market concept (US only)", tags: ["Compliance"] },
      {
        id: "sr-quest",
        title: "Quest system (daily topics; leadership/philosophy/spirituality; optimistic POV)",
        desc: "Approved flow; create curiosity + FOMO.",
        tags: ["Habit"],
      },
    ],
  },
  {
    id: "llmco",
    name: "LLMCostOptimizer",
    chip: { text: "Content + automation", cls: "info" },
    items: [
      { id: "lc-promote", title: "Publish + promote existing content (social/IG/FB)" },
      { id: "lc-n8n", title: "Host agent on n8n cloud + posting workflow" },
      { id: "lc-ebook", title: "Create eBook + SEO articles (LLM cost optimization)" },
    ],
  },
  {
    id: "website",
    name: "Platform Website",
    chip: { text: "UI + SEO", cls: "info" },
    items: [
      { id: "ws-header", title: "Make header/footer reusable components" },
      { id: "ws-fonts", title: "Standardize fonts + update images" },
      { id: "ws-eco", title: "Fix ecosystem section on homepage" },
      { id: "ws-copy", title: "Revise tagline + copy (decentralization + token utility)" },
      { id: "ws-calendar", title: "Add partner events + 2026 crypto calendar (include HackIndia)" },
      {
        id: "ws-lovable",
        title: "Source content from Lovable project",
        desc: "lovable.dev project page",
        link: "https://lovable.dev/projects/97ba8e33-a4eb-4431-92a4-6d19d04d6ae2",
      },
      { id: "ws-foundationimg", title: "Design Sharp Innovation Foundation image (Gemini 3)" },
      { id: "ws-backlinks", title: "Publish updates + backlink strategy (Medium / SE / etc.)" },
    ],
  },
  {
    id: "intern",
    name: "Intern Program",
    chip: { text: "Design", cls: "info" },
    items: [{ id: "ip-design", title: "Design reward mechanics + eligibility + token compensation flow" }],
  },
  {
    id: "content",
    name: "Content & Marketing",
    chip: { text: "Pipeline", cls: "info" },
    items: [
      { id: "cm-cscorner", title: "Write: questions asked about business on C# Corner" },
      { id: "cm-rank", title: "Publish rankable LLMCostOptimizer content" },
      { id: "cm-repurpose", title: "Repurpose folder content → social channels" },
    ],
  },
  {
    id: "ops",
    name: "Ops / Security",
    chip: { text: "Risk + cadence", cls: "hot" },
    items: [
      { id: "os-funds", title: "Research storing funds + theft recovery best practices" },
      { id: "os-agents", title: "AI Agents discovery: lead gen + hiring platform direction" },
      { id: "os-checklist", title: "Create monthly ops checklist (burn/outreach/releases)" },
    ],
  },
  {
    id: "week",
    name: "Next Actions (This week)",
    chip: { text: "Do now", cls: "pri" },
    items: [
      {
        id: "na-top3",
        title: "Finalize top 3 Sharp Rewards deliverables (JWT/notifications/streak restore)",
      },
      { id: "na-polygon", title: "Confirm Polygon integration approach + fiat on-ramp options" },
      { id: "na-outreach", title: "Draft partnership outreach template for colleges + HoDs" },
    ],
  },
  {
    id: "silver",
    name: "Precious Metal",
    chip: { text: "Personal", cls: "info" },
    items: [
      { id: "pm-buy", title: "Buy 2 × 20g silver coins / month (6 months)" },
      { id: "pm-track", title: "Track total: 12 coins (240g .999)" },
      { id: "pm-objective", title: "Keep objective: low-stress, high-liquidity India-safe hedge" },
    ],
  },
  {
    id: "show",
    name: "AI Edge Show",
    chip: { text: "Media", cls: "info" },
    items: [
      { id: "as-format", title: "Lock show format (news → topic → guest)" },
      { id: "as-ben", title: "Guest outreach: Ben as first guest" },
      { id: "as-plan", title: "Schedule + episode plan + promotion plan" },
    ],
  },
  {
    id: "discovery",
    name: "Agents Discovery Platform",
    chip: { text: "Build", cls: "info" },
    items: [
      { id: "ad-req", title: "Define requirements for lead-gen + hiring marketplace" },
      { id: "ad-features", title: "Design marketplace + discovery features" },
      { id: "ad-infra", title: "Plan integration with existing C# Corner infra" },
    ],
  },
  {
    id: "secrets",
    name: "Notes & Secrets",
    chip: { text: "Sensitive", cls: "hot" },
    items: [
      {
        id: "ns-vault",
        title: "Move secrets to a password manager/vault (do not keep in docs)",
        desc: "Store only references like “Vault: Foundation / Key: prod_admin”.",
        tags: ["Security"],
      },
    ],
  },
]

interface Subtask {
  id: string
  title: string
  description: string
  completed: boolean
}

interface Task {
  id: string
  title: string
  createdAt: string
  completed: boolean
  priority: TaskPriority
  subtasks: Subtask[]
}

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `todo-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`
}

const getProgress = (subtasks: Subtask[]) => {
  if (subtasks.length === 0) return 0
  const completedCount = subtasks.filter((subtask) => subtask.completed).length
  return Math.round((completedCount / subtasks.length) * 100)
}

const sanitizeText = (value: string) => value.replace(/\s+/g, " ").trim()
const formatSeedDescription = (parts: string[]) => parts.filter(Boolean).join(" • ")
const formatSeedTags = (tags?: string[]) => (tags && tags.length > 0 ? `Tags: ${tags.join(", ")}` : "")
const formatSeedLink = (link?: string) => (link ? `Link: ${link}` : "")

const getPriorityFromChip = (cls: string): TaskPriority => {
  switch (cls) {
    case "hot":
      return "Critical"
    case "pri":
      return "High"
    case "ok":
      return "Low"
    case "info":
    default:
      return "Medium"
  }
}

const getPriorityBadge = (priority: TaskPriority) => {
  switch (priority) {
    case "Critical":
      return "bg-rose-500/20 text-rose-200 border-rose-500/40"
    case "High":
      return "bg-amber-500/20 text-amber-200 border-amber-500/40"
    case "Medium":
      return "bg-sky-500/20 text-sky-200 border-sky-500/40"
    case "Low":
    default:
      return "bg-emerald-500/20 text-emerald-200 border-emerald-500/40"
  }
}

const buildSeedTasks = (): Task[] =>
  SEED_SECTIONS.map((section) => {
    const itemSubtasks = section.items.map((item) => {
      const description = formatSeedDescription([
        item.desc ?? "",
        formatSeedLink(item.link),
        formatSeedTags(item.tags),
      ])
      return {
        id: createId(),
        title: item.title,
        description,
        completed: false,
      }
    })

    const moneySubtasks =
      section.money?.map((entry) => ({
        id: createId(),
        title: `Pay ${entry.who}`,
        description: formatSeedDescription([`Amount: ${entry.amt}`]),
        completed: false,
      })) ?? []

    return {
      id: createId(),
      title: `${section.name} — ${section.chip.text}`,
      createdAt: new Date().toISOString(),
      completed: false,
      priority: getPriorityFromChip(section.chip.cls),
      subtasks: [...moneySubtasks, ...itemSubtasks],
    }
  })

const normalizeStoredTasks = (stored: Task[]): Task[] =>
  stored.map((task) => ({
    ...task,
    completed: task.completed ?? false,
    priority: task.priority ?? "Medium",
    subtasks: task.subtasks.map((subtask) => ({
      ...subtask,
      completed: subtask.completed ?? false,
      description: subtask.description ?? "",
    })),
  }))

export default function TodoPage() {
  const { toast } = useToast()
  const initialSeed = React.useMemo(() => buildSeedTasks(), [])
  const [tasks, setTasks] = React.useState<Task[]>(initialSeed)
  const [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(initialSeed[0]?.id ?? null)
  const [taskTitle, setTaskTitle] = React.useState("")
  const [taskPriority, setTaskPriority] = React.useState<TaskPriority>("Medium")
  const [subtaskTitle, setSubtaskTitle] = React.useState("")
  const [subtaskDescription, setSubtaskDescription] = React.useState("")
  const [taskError, setTaskError] = React.useState<string | null>(null)
  const [subtaskError, setSubtaskError] = React.useState<string | null>(null)
  const [storageNotice, setStorageNotice] = React.useState<{
    title: string
    description: string
  } | null>(null)
  const storageWarningShown = React.useRef(false)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Task[]
        if (Array.isArray(parsed)) {
          if (parsed.length === 0) {
            const seeded = buildSeedTasks()
            setTasks(seeded)
            setSelectedTaskId(seeded[0]?.id ?? null)
            toast({
              title: "Seeded tasks restored",
              description: "We repopulated the default task list since your saved tasks were empty.",
            })
          } else {
            const normalized = normalizeStoredTasks(parsed)
            setTasks(normalized)
            setSelectedTaskId(normalized[0]?.id ?? null)
          }
        }
      }
    } catch (error) {
      if (!storageWarningShown.current) {
        storageWarningShown.current = true
        const notice = {
          title: "Storage unavailable",
          description: "We couldn't load your saved tasks. Your changes will still work for this session.",
        }
        setStorageNotice(notice)
        toast({ ...notice, variant: "destructive" })
      }
    }
  }, [toast])

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      if (!storageWarningShown.current) {
        storageWarningShown.current = true
        const notice = {
          title: "Storage unavailable",
          description: "We couldn't save your changes. Export or copy tasks if needed.",
        }
        setStorageNotice(notice)
        toast({ ...notice, variant: "destructive" })
      }
    }
  }, [tasks, toast])

  const selectedTask = React.useMemo(
    () => tasks.find((task) => task.id === selectedTaskId) ?? null,
    [tasks, selectedTaskId]
  )

  const dashboardStats = React.useMemo(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.completed).length
    const totalSubtasks = tasks.reduce((sum, task) => sum + task.subtasks.length, 0)
    const completedSubtasks = tasks.reduce(
      (sum, task) => sum + task.subtasks.filter((subtask) => subtask.completed).length,
      0
    )
    const completionRate = totalSubtasks === 0 ? 0 : Math.round((completedSubtasks / totalSubtasks) * 100)

    return {
      totalTasks,
      completedTasks,
      totalSubtasks,
      completedSubtasks,
      completionRate,
    }
  }, [tasks])

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(value))

  const handleAddTask = (event?: React.FormEvent) => {
    event?.preventDefault()
    const cleaned = sanitizeText(taskTitle)

    if (!cleaned) {
      setTaskError("Please add a clear task name so you can stay organized.")
      toast({
        title: "Task title missing",
        description: "Add a short task title before saving.",
        variant: "destructive",
      })
      return
    }

    if (cleaned.length > TASK_TITLE_MAX) {
      setTaskError(`Task titles should be ${TASK_TITLE_MAX} characters or less.`)
      toast({
        title: "Task title too long",
        description: "Shorten the task title and try again.",
        variant: "destructive",
      })
      return
    }

    const newTask: Task = {
      id: createId(),
      title: cleaned,
      createdAt: new Date().toISOString(),
      completed: false,
      priority: taskPriority,
      subtasks: [],
    }

    setTasks((prev) => [newTask, ...prev])
    setSelectedTaskId(newTask.id)
    setTaskTitle("")
    setTaskPriority("Medium")
    setTaskError(null)
    toast({
      title: "Task created",
      description: "Now add subtasks with details to bring it to life.",
    })
  }

  const handleAddSubtask = (event?: React.FormEvent) => {
    event?.preventDefault()

    if (!selectedTask) {
      setSubtaskError("Choose a task before adding subtasks.")
      toast({
        title: "Select a task",
        description: "Pick a task from the list to add subtasks.",
        variant: "destructive",
      })
      return
    }

    const cleanedTitle = sanitizeText(subtaskTitle)
    const cleanedDescription = sanitizeText(subtaskDescription)

    if (!cleanedTitle) {
      setSubtaskError("Subtasks need a short title to stay actionable.")
      toast({
        title: "Subtask title missing",
        description: "Add a quick title for this subtask.",
        variant: "destructive",
      })
      return
    }

    if (cleanedTitle.length > SUBTASK_TITLE_MAX) {
      setSubtaskError(`Subtask titles should be ${SUBTASK_TITLE_MAX} characters or less.`)
      toast({
        title: "Subtask title too long",
        description: "Shorten the subtask title and try again.",
        variant: "destructive",
      })
      return
    }

    if (cleanedDescription.length > SUBTASK_DESC_MAX) {
      setSubtaskError(`Descriptions should be ${SUBTASK_DESC_MAX} characters or less.`)
      toast({
        title: "Description too long",
        description: "Shorten the description to keep it readable.",
        variant: "destructive",
      })
      return
    }

    const newSubtask: Subtask = {
      id: createId(),
      title: cleanedTitle,
      description: cleanedDescription,
      completed: false,
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              completed: false,
              subtasks: [newSubtask, ...task.subtasks],
            }
          : task
      )
    )

    setSubtaskTitle("")
    setSubtaskDescription("")
    setSubtaskError(null)
    toast({
      title: "Subtask added",
      description: "Nice! Keep the momentum going.",
    })
  }

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? (() => {
              const updatedSubtasks = task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              )
              const allCompleted =
                updatedSubtasks.length > 0 && updatedSubtasks.every((subtask) => subtask.completed)
              return {
                ...task,
                completed: updatedSubtasks.length > 0 ? allCompleted : task.completed,
                subtasks: updatedSubtasks,
              }
            })()
          : task
      )
    )
  }

  const handleToggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task
        const isCompleting = !task.completed
        return {
          ...task,
          completed: isCompleting,
          subtasks: isCompleting
            ? task.subtasks.map((subtask) => ({ ...subtask, completed: true }))
            : task.subtasks,
        }
      })
    )
    toast({
      title: "Task updated",
      description: "Task completion status has been updated.",
    })
  }

  const handlePriorityChange = (taskId: string, priority: TaskPriority) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, priority } : task)))
  }

  const handleRemoveTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    setSelectedTaskId((prevId) => {
      if (prevId !== taskId) return prevId
      const remaining = tasks.filter((task) => task.id !== taskId)
      return remaining[0]?.id ?? null
    })
    toast({
      title: "Task removed",
      description: "You can always recreate it later.",
    })
  }

  const handleRemoveSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId),
            }
          : task
      )
    )
    toast({
      title: "Subtask removed",
      description: "Less clutter, more focus.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-4 text-center">
          <div className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Awesome Todo
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Build momentum with tasks, subtasks, and crystal-clear descriptions.
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-base">
              Organize work the way your brain does: start with a big goal, then map the steps. Track progress,
              keep notes close, and celebrate every checkmark.
            </p>
          </div>
        </header>

        {storageNotice ? (
          <Alert variant="destructive" className="border-slate-800 bg-slate-950/60 text-slate-200">
            <AlertTitle>{storageNotice.title}</AlertTitle>
            <AlertDescription>{storageNotice.description}</AlertDescription>
          </Alert>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Card className="border-slate-800/70 bg-slate-900/70 shadow-lg shadow-slate-950/50">
              <CardHeader className="gap-2">
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <ClipboardList className="h-5 w-5 text-cyan-400" />
                  Dashboard
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Track the volume, priority, and completion health of your workload.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Total tasks", value: dashboardStats.totalTasks },
                    { label: "Completed tasks", value: dashboardStats.completedTasks },
                    { label: "Total subtasks", value: dashboardStats.totalSubtasks },
                    { label: "Completion rate", value: `${dashboardStats.completionRate}%` },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 shadow-inner shadow-slate-950/40"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800/70 bg-slate-900/70 shadow-lg shadow-slate-950/50">
              <CardHeader className="gap-2">
                <CardTitle className="text-lg text-white">Task tiles</CardTitle>
                <CardDescription className="text-slate-400">
                  Expand a tile to review subtasks, update priority, and mark completion.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950/40 p-6 text-center text-sm text-slate-500">
                    No tasks yet. Add one to start building your roadmap.
                  </div>
                ) : (
                  <Accordion
                    type="single"
                    collapsible
                    value={selectedTaskId ?? ""}
                    onValueChange={(value) => {
                      setSelectedTaskId(value || null)
                      setSubtaskTitle("")
                      setSubtaskDescription("")
                      setSubtaskError(null)
                    }}
                    className="space-y-4"
                  >
                    {tasks.map((task) => {
                      const progress = task.completed ? 100 : getProgress(task.subtasks)
                      const hasSubtasks = task.subtasks.length > 0
                      return (
                        <AccordionItem
                          key={task.id}
                          value={task.id}
                          className="rounded-2xl border border-b-0 border-slate-800/80 bg-slate-950/50 px-4 shadow-lg shadow-slate-950/30"
                        >
                          <div className="flex flex-col gap-3 py-2">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <AccordionTrigger className="flex-1 flex-col items-start gap-3 text-left no-underline hover:no-underline">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-sm font-semibold text-white">{task.title}</h3>
                                  {task.completed ? (
                                    <Badge className="border border-emerald-500/40 bg-emerald-500/20 text-emerald-200">
                                      Completed
                                    </Badge>
                                  ) : null}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                  <Badge
                                    variant="secondary"
                                    className={`border text-xs ${getPriorityBadge(task.priority)}`}
                                  >
                                    Priority: {task.priority}
                                  </Badge>
                                  <span>
                                    {task.subtasks.length} subtask{task.subtasks.length !== 1 ? "s" : ""}
                                  </span>
                                  <span>{progress}% complete</span>
                                  <span>Created {formatDate(task.createdAt)}</span>
                                </div>
                                <Progress value={progress} className="h-2 bg-slate-800" />
                              </AccordionTrigger>

                              <div className="flex flex-wrap items-center gap-2">
                                <div className="w-36">
                                  <Select
                                    value={task.priority}
                                    onValueChange={(value) => handlePriorityChange(task.id, value as TaskPriority)}
                                  >
                                    <SelectTrigger
                                      className="h-9 border-slate-800 bg-slate-950/70 text-xs text-slate-100"
                                      aria-label={`Set priority for ${task.title}`}
                                    >
                                      <SelectValue placeholder="Set priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {PRIORITY_OPTIONS.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className={`h-9 w-9 ${
                                    task.completed ? "text-emerald-300" : "text-slate-400 hover:text-emerald-200"
                                  }`}
                                  onClick={() => handleToggleTaskComplete(task.id)}
                                  aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 text-slate-400 hover:text-rose-300"
                                  onClick={() => handleRemoveTask(task.id)}
                                  aria-label={`Remove ${task.title}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <AccordionContent className="pt-4">
                            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                              <div className="space-y-3">
                                {hasSubtasks ? (
                                  <div className="space-y-4">
                                    {task.subtasks.map((subtask) => (
                                      <div
                                        key={subtask.id}
                                        className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                                      >
                                        <div className="flex items-start justify-between gap-4">
                                          <div>
                                            <button
                                              type="button"
                                              onClick={() => handleToggleSubtask(task.id, subtask.id)}
                                              className="flex items-center gap-2 text-left"
                                            >
                                              <span
                                                className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                                                  subtask.completed
                                                    ? "border-emerald-400 bg-emerald-400/20 text-emerald-200"
                                                    : "border-slate-600 text-slate-400"
                                                }`}
                                                aria-hidden="true"
                                              >
                                                {subtask.completed ? "✓" : ""}
                                              </span>
                                              <span
                                                className={`text-sm font-semibold ${
                                                  subtask.completed ? "text-slate-400 line-through" : "text-slate-100"
                                                }`}
                                              >
                                                {subtask.title}
                                              </span>
                                            </button>
                                            {subtask.description ? (
                                              <p className="mt-2 text-sm text-slate-400">{subtask.description}</p>
                                            ) : (
                                              <p className="mt-2 text-xs italic text-slate-500">
                                                No description added.
                                              </p>
                                            )}
                                          </div>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-slate-400 hover:text-rose-300"
                                            onClick={() => handleRemoveSubtask(task.id, subtask.id)}
                                            aria-label={`Remove ${subtask.title}`}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950/40 p-6 text-center text-sm text-slate-500">
                                    No subtasks yet. Add the first step to move forward.
                                  </div>
                                )}
                              </div>

                              <form onSubmit={handleAddSubtask} className="space-y-4">
                                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    Add a subtask
                                  </p>
                                  <p className="mt-2 text-sm text-slate-200">{task.title}</p>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`subtask-title-${task.id}`} className="text-slate-200">
                                    Subtask title
                                  </Label>
                                  <Input
                                    id={`subtask-title-${task.id}`}
                                    value={subtaskTitle}
                                    onChange={(event) => setSubtaskTitle(event.target.value)}
                                    placeholder="Draft the welcome email"
                                    maxLength={SUBTASK_TITLE_MAX}
                                    className="border-slate-800 bg-slate-950/70 text-slate-100 placeholder:text-slate-500"
                                    aria-describedby={`subtask-title-help-${task.id}`}
                                  />
                                  <div
                                    className="flex items-center justify-between text-xs text-slate-500"
                                    id={`subtask-title-help-${task.id}`}
                                  >
                                    <span>{subtaskError ?? "Make it specific and actionable."}</span>
                                    <span>
                                      {subtaskTitle.length}/{SUBTASK_TITLE_MAX}
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`subtask-description-${task.id}`} className="text-slate-200">
                                    Description
                                  </Label>
                                  <Textarea
                                    id={`subtask-description-${task.id}`}
                                    value={subtaskDescription}
                                    onChange={(event) => setSubtaskDescription(event.target.value)}
                                    placeholder="Include who owns it, links, and the desired outcome."
                                    maxLength={SUBTASK_DESC_MAX}
                                    className="min-h-[120px] border-slate-800 bg-slate-950/70 text-slate-100 placeholder:text-slate-500"
                                    aria-describedby={`subtask-description-help-${task.id}`}
                                  />
                                  <div
                                    className="flex items-center justify-between text-xs text-slate-500"
                                    id={`subtask-description-help-${task.id}`}
                                  >
                                    <span>Descriptions keep context close.</span>
                                    <span>
                                      {subtaskDescription.length}/{SUBTASK_DESC_MAX}
                                    </span>
                                  </div>
                                </div>

                                <Button type="submit" className="w-full gap-2">
                                  <Plus className="h-4 w-4" />
                                  Add subtask
                                </Button>
                              </form>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-800/70 bg-slate-900/50 shadow-lg shadow-slate-950/50">
            <CardHeader className="gap-2">
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <Flag className="h-5 w-5 text-slate-300" />
                Add a task
              </CardTitle>
              <CardDescription className="text-slate-500">
                Keep this lightweight. Your task tiles remain the main focus.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title" className="text-slate-200">
                    Task title
                  </Label>
                  <Input
                    id="task-title"
                    value={taskTitle}
                    onChange={(event) => setTaskTitle(event.target.value)}
                    placeholder="Launch product onboarding"
                    maxLength={TASK_TITLE_MAX}
                    className="border-slate-800 bg-slate-950/70 text-slate-100 placeholder:text-slate-500"
                    aria-describedby="task-title-help"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-500" id="task-title-help">
                    <span>{taskError ?? "Keep it short and action-oriented."}</span>
                    <span>
                      {taskTitle.length}/{TASK_TITLE_MAX}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-priority" className="text-slate-200">
                    Priority
                  </Label>
                  <Select value={taskPriority} onValueChange={(value) => setTaskPriority(value as TaskPriority)}>
                    <SelectTrigger
                      id="task-priority"
                      className="border-slate-800 bg-slate-950/70 text-slate-100"
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITY_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500">Use priority to keep high-impact work visible.</p>
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Add task
                </Button>
              </form>

              <Separator className="bg-slate-800" />

              <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-500">
                Tip: Expand a tile to add subtasks, update priority, or mark the entire task complete.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

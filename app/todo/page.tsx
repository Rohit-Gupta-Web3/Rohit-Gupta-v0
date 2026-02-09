import type { Metadata } from "next"

import TodoPage from "@/components/todo/todo-page"

export const metadata: Metadata = {
  title: "Awesome Todo | Rohit Gupta",
  description: "Plan tasks, add subtasks with descriptions, and keep momentum with a polished todo experience.",
}

export default function TodoRoute() {
  return <TodoPage />
}

import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import TodoPage from "@/components/todo/todo-page"

describe("TodoPage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders the seeded tasks on first load", () => {
    render(<TodoPage />)

    expect(
      screen.getByRole("heading", { name: "AI Agents Conf 2026 — Needs decision" })
    ).toBeInTheDocument()
  })

  it("restores seeded tasks when stored tasks are empty", async () => {
    localStorage.setItem("todo-ux-v1", "[]")
    render(<TodoPage />)

    expect(
      await screen.findByRole("heading", { name: "AI Agents Conf 2026 — Needs decision" })
    ).toBeInTheDocument()
  })

  it("adds a task and displays it in the list", async () => {
    const user = userEvent.setup()
    render(<TodoPage />)

    await user.type(screen.getByLabelText("Task title"), "Launch onboarding")
    await user.click(screen.getByRole("button", { name: "Add task" }))

    expect(screen.getByRole("heading", { name: "Launch onboarding" })).toBeInTheDocument()
    expect(screen.getAllByText("Launch onboarding").length).toBeGreaterThanOrEqual(1)
  })

  it("adds a subtask with description to the selected task", async () => {
    const user = userEvent.setup()
    render(<TodoPage />)

    fireEvent.change(screen.getByLabelText("Subtask title"), {
      target: { value: "Draft welcome email" },
    })
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Outline key benefits, add CTA, and share the timeline." },
    })
    await user.click(screen.getByRole("button", { name: "Add subtask" }))

    expect(screen.getByText("Draft welcome email")).toBeInTheDocument()
    expect(
      screen.getByText("Outline key benefits, add CTA, and share the timeline.")
    ).toBeInTheDocument()
  })

  it("shows validation feedback when task title is missing", async () => {
    const user = userEvent.setup()
    render(<TodoPage />)

    await user.click(screen.getByRole("button", { name: "Add task" }))

    expect(
      screen.getByText("Please add a clear task name so you can stay organized.")
    ).toBeInTheDocument()
  })

  it("shows validation feedback when subtask title is missing", async () => {
    const user = userEvent.setup()
    render(<TodoPage />)

    await user.type(screen.getByLabelText("Task title"), "Launch onboarding")
    await user.click(screen.getByRole("button", { name: "Add task" }))
    await user.click(screen.getByRole("button", { name: "Add subtask" }))

    expect(
      screen.getByText("Subtasks need a short title to stay actionable.")
    ).toBeInTheDocument()
  })

  it("shows a storage warning when saving fails", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage failure")
    })

    render(<TodoPage />)

    expect(
      await screen.findByText("We couldn't save your changes. Export or copy tasks if needed.")
    ).toBeInTheDocument()

    setItemSpy.mockRestore()
  })

  it("updates a task priority from the tile actions", async () => {
    const user = userEvent.setup()
    render(<TodoPage />)

    const combobox = screen.getByRole("combobox", {
      name: "Set priority for AI Agents Conf 2026 — Needs decision",
    })
    await user.click(combobox)
    await user.click(screen.getByRole("option", { name: "Critical" }))

    expect(combobox).toHaveTextContent("Critical")
  })

  it("marks a task as completed", async () => {
    const user = userEvent.setup()
    render(<TodoPage />)

    await user.click(
      screen.getByRole("button", {
        name: "Mark AI Agents Conf 2026 — Needs decision as complete",
      })
    )

    expect(screen.getByText("Completed")).toBeInTheDocument()
  })
})

import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import TodoPage from "@/components/todo/todo-page"

describe("TodoPage", () => {
  it("renders the empty state", () => {
    render(<TodoPage />)

    expect(
      screen.getByText("No tasks yet. Add one to start building your roadmap.")
    ).toBeInTheDocument()
  })

  it("adds a task and displays it in the list", async () => {
    const user = userEvent.setup()
    render(<TodoPage />)

    await user.type(screen.getByLabelText("Quick add task"), "Launch onboarding")
    await user.click(screen.getByRole("button", { name: "Add task" }))

    expect(screen.getByRole("heading", { name: "Launch onboarding" })).toBeInTheDocument()
    expect(screen.getByText("Selected task")).toBeInTheDocument()
    expect(screen.getAllByText("Launch onboarding").length).toBeGreaterThanOrEqual(1)
  })

  it("adds a subtask with description to the selected task", async () => {
    const user = userEvent.setup()
    render(<TodoPage />)

    await user.type(screen.getByLabelText("Quick add task"), "Launch onboarding")
    await user.click(screen.getByRole("button", { name: "Add task" }))

    await user.type(screen.getByLabelText("Subtask title"), "Draft welcome email")
    await user.type(
      screen.getByLabelText("Description"),
      "Outline key benefits, add CTA, and share the timeline."
    )
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

    await user.type(screen.getByLabelText("Quick add task"), "Launch onboarding")
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
})

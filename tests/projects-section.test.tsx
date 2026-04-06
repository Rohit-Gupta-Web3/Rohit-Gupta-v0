import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ProjectsSection from "@/components/sections/projects-section"

describe("ProjectsSection", () => {
  it("renders the newly added project links", () => {
    render(<ProjectsSection />)

    expect(screen.getByRole("link", { name: "Open Code Quest project link" })).toHaveAttribute(
      "href",
      "https://code-quest.buildwithai.ai/",
    )

    expect(screen.getByRole("link", { name: "Open Claw project link" })).toHaveAttribute(
      "href",
      "https://claw.buildwithai.ai/",
    )

    expect(screen.getByRole("link", { name: "Open LLM Cost Optimizer project link" })).toHaveAttribute(
      "href",
      "https://llmcostoptimizer.com/",
    )

    expect(screen.getByRole("link", { name: "Open New Sharp Economy project link" })).toHaveAttribute(
      "href",
      "https://new.sharpeconomy.org/",
    )
  })

  it("filters projects by AI tag", async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)

    await user.click(screen.getByRole("button", { name: "AI" }))

    expect(screen.getByText("Code Quest")).toBeInTheDocument()
    expect(screen.queryByText("ALPR System")).not.toBeInTheDocument()
  })
})

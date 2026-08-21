import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

// next/image needs a lightweight stand-in under jsdom. Strip Next-specific
// props so React doesn't warn about unknown DOM attributes.
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string | { src: string }; alt: string }) =>
    React.createElement("img", {
      src: typeof src === "string" ? src : src?.src ?? "",
      alt,
    }),
}))

import Home from "@/app/page"

describe("Portfolio home page", () => {
  it("renders the hero identity and current positioning", () => {
    render(<Home />)

    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent("Rohit Gupta")
    // Rotating headline starts on the first title.
    expect(screen.getByText("AI Product Manager")).toBeInTheDocument()
    expect(
      screen.getByText(/AI Product & Technical Program leader/i)
    ).toBeInTheDocument()
  })

  it("reflects the current role from the 2026 resume", () => {
    render(<Home />)

    expect(screen.getByText("Thinkverse Labs")).toBeInTheDocument()
    expect(screen.getByText("Tech Lead — Web3")).toBeInTheDocument()
  })

  it("shows the AI portfolio as featured work", () => {
    render(<Home />)

    expect(screen.getByText("DialTone")).toBeInTheDocument()
    expect(screen.getByText("Sharp AI Agents")).toBeInTheDocument()
  })

  it("separates AI and Web3 project groups", () => {
    render(<Home />)

    expect(screen.getByText("AI & product portfolio")).toBeInTheDocument()
    expect(screen.getByText("Selected Web3 projects")).toBeInTheDocument()
  })

  it("uses the corrected location and writing stats", () => {
    render(<Home />)

    expect(
      screen.getAllByText(/Noida, Uttar Pradesh, India/i).length
    ).toBeGreaterThanOrEqual(1)
    expect(
      screen.getByText(/314 technical articles/i)
    ).toBeInTheDocument()
  })
})

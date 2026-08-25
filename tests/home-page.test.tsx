import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

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

  it("uses an explicit picture element for the hero portrait", () => {
    const { container } = render(<Home />)

    expect(
      container.querySelector('source[type="image/avif"]')
    ).toHaveAttribute("srcset", "/rohit.avif")
    expect(
      container.querySelector('source[type="image/webp"]')
    ).toHaveAttribute("srcset", "/rohit.webp")

    const portrait = screen.getByAltText("Rohit Gupta")
    expect(portrait).toHaveAttribute("src", "/rohit.png")
    expect(portrait).toHaveAttribute("width", "380")
    expect(portrait).toHaveAttribute("height", "475")
    expect(portrait).toHaveAttribute("loading", "eager")
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

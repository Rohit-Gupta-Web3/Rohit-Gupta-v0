import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { projects } from "@/data/projects"
import { notFound } from "next/navigation"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // Find the project based on the slug
  const project = projects.find((p) => p.title.toLowerCase().replace(/\s+/g, "-") === params.slug)

  // If project not found, return 404
  if (!project) {
    notFound()
  }

  // Get a consistent color for the project
  const projectIndex = projects.findIndex((p) => p.title === project.title)
  const projectColor = getColorByIndex(projectIndex)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span>Rohit Gupta</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#experience" className="text-sm font-medium transition-colors hover:text-primary">
              Experience
            </Link>
            <Link href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/#skills" className="text-sm font-medium transition-colors hover:text-primary">
              Skills
            </Link>
            <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-12 md:py-24">
          <Button variant="ghost" size="sm" className="mb-8" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${projectColor}`}
              >
                {project.title.charAt(0)}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{project.title}</h1>
            </div>

            <div className="gradient-border p-6 bg-card mb-8">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Client</h3>
                  <p>{project.client}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Role</h3>
                  <p>{project.role}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Environment</h3>
                  <p>{project.environment || "Not specified"}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags?.map((tag, index) => (
                  <div key={index} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                    {tag}
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Button asChild>
                <Link href="/#contact">Contact Me for Similar Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rohit Gupta. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper function to get a color based on index
function getColorByIndex(index: number): string {
  const colors = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-green-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-cyan-600",
    "bg-indigo-600",
    "bg-emerald-600",
  ]
  return colors[index % colors.length]
}

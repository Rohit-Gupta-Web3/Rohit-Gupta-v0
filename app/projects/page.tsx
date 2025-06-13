import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
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
        <section className="container py-12 md:py-24">
          <div className="flex flex-col gap-4">
            <Button variant="ghost" size="sm" className="w-fit" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h1>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              A collection of my work in blockchain, IoT, and software development.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 py-12">
            {projects.map((project, index) => (
              <div key={index} className="gradient-border p-6 bg-card hover:bg-card/80 transition-colors">
                <Link href={`/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`} className="block">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getColorByIndex(index)}`}
                    >
                      {project.title.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">Client:</span> {project.client}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Role:</span> {project.role}
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <div key={tagIndex} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                        {tag}
                      </div>
                    ))}
                    {project.tags && project.tags.length > 3 && (
                      <div className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                        +{project.tags.length - 3} more
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
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

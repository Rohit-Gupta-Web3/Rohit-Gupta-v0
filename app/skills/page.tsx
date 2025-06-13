import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SkillsGrid } from "@/components/skills/skills-grid"
import { ResumeDownloadButton } from "@/components/resume-download-button"

export default function SkillsPage() {
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
          <ResumeDownloadButton size="sm" className="hidden md:flex" />
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24">
          <div className="flex flex-col gap-4 mb-8">
            <Button variant="ghost" size="sm" className="w-fit" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills & Expertise</h1>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              A comprehensive overview of my technical skills, domain knowledge, and professional expertise.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SkillsGrid />

            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Professional Approach</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="gradient-border p-6 bg-card">
                  <h3 className="text-xl font-semibold mb-4">Technical Leadership</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Architecture design and system planning</li>
                    <li>Code quality and standards enforcement</li>
                    <li>Technical mentorship and team development</li>
                    <li>Research and innovation initiatives</li>
                    <li>Cross-functional team collaboration</li>
                  </ul>
                </div>
                <div className="gradient-border p-6 bg-card">
                  <h3 className="text-xl font-semibold mb-4">Project Management</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Agile methodologies implementation</li>
                    <li>Sprint planning and execution</li>
                    <li>Resource allocation and optimization</li>
                    <li>Risk assessment and mitigation</li>
                    <li>Stakeholder communication</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                Interested in learning more about my skills and experience? Download my resume or get in touch.
              </p>
              <div className="flex justify-center gap-4">
                <ResumeDownloadButton />
                <Button variant="outline" asChild>
                  <Link href="/#contact">Contact Me</Link>
                </Button>
              </div>
            </div>
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

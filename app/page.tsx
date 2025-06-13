"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send, Linkedin, Mail, Phone, MapPin, Menu, X, Github, FileText, ArrowRight } from "lucide-react"
import { ProgressBar } from "@/components/ui/progress-bar"
import { projects } from "@/data/projects"

export default function Home() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      // Reset form
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  // Featured skills with progress bars for the homepage
  const featuredSkills = [
    { name: "Blockchain", level: 90 },
    { name: "IoT", level: 85 },
    { name: "Python", level: 95 },
    { name: "Azure", level: 90 },
  ]

  // Featured projects for the homepage
  const featuredProjects = projects.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col dark">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold gradient-text">
            Rohit Gupta
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "home" ? "text-primary" : "text-muted-foreground"}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "about" ? "text-primary" : "text-muted-foreground"}`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "experience" ? "text-primary" : "text-muted-foreground"}`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "skills" ? "text-primary" : "text-muted-foreground"}`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "contact" ? "text-primary" : "text-muted-foreground"}`}
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-background border-b border-border py-4 px-4 flex flex-col space-y-4">
            <button onClick={() => scrollToSection("home")} className="text-sm font-medium py-2 hover:text-primary">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm font-medium py-2 hover:text-primary">
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-sm font-medium py-2 hover:text-primary"
            >
              Experience
            </button>
            <button onClick={() => scrollToSection("skills")} className="text-sm font-medium py-2 hover:text-primary">
              Skills
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-sm font-medium py-2 hover:text-primary">
              Contact
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Hi, I'm <span className="gradient-text">Rohit Gupta</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">Technical Project Manager</h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Blockchain & IoT Expert | Agile Leader | Azure | Python | EVM & Solidity | Driving Innovation Through
                  Emerging Tech & Scalable Architecture
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button onClick={() => scrollToSection("about")}>Learn More About Me</Button>
                  <Button variant="outline" onClick={() => scrollToSection("contact")}>
                    Get In Touch
                  </Button>
                </div>
              </div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rohit.jpg-v0vd0xDZFnAZoKjZtI4MfOVaxX0iUj.jpeg"
                  alt="Rohit Gupta"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>

              <div className="space-y-6">
                <p className="text-lg">
                  As a Technical Lead specializing in Blockchain and IoT solutions, I thrive at the intersection of
                  cutting-edge technology and practical business impact. With hands-on experience designing, developing,
                  and deploying decentralized and connected systems, I lead high-performing engineering teams to deliver
                  secure, scalable, and innovative solutions across industries.
                </p>
                <p className="text-lg">
                  Currently at MCN Solutions, I architect technical frameworks, define coding standards, and ensure
                  rigorous testing and deployment protocols for next-gen blockchain and IoT projects. Beyond delivery, I
                  take pride in mentoring junior engineers, fostering a growth-driven team culture, and embedding Agile
                  best practices using tools like Jira, ClickUp, and Azure Boards.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="gradient-border p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-4">Education</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">M.Sc. Informatics</h4>
                        <p className="text-sm text-muted-foreground">
                          Institute of Informatics & Communication, DU | 2016-2019
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Intel Edge AI for IoT Nanodegree</h4>
                        <p className="text-sm text-muted-foreground">Udacity | 2020</p>
                      </div>
                      <div>
                        <h4 className="font-medium">B.Sc. Electronics</h4>
                        <p className="text-sm text-muted-foreground">Sri Aurobindo College | 2012-2015</p>
                      </div>
                    </div>
                  </div>

                  <div className="gradient-border p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-4">Awards & Honors</h3>
                    <div className="space-y-2">
                      <p className="text-sm">• C# Corner MVP 2019</p>
                      <p className="text-sm">• Sarita Gupta Memorial Scholarship</p>
                      <p className="text-sm">• Pasricha Memorial Award</p>
                      <p className="text-sm">• Student of the Month</p>
                      <p className="text-sm">• Medhavi Chatravriti + Vigyan Pratibha Khoj</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>

            <div className="max-w-3xl mx-auto space-y-12">
              {/* MCN Solutions - Technical Lead */}
              <div className="gradient-border p-6 bg-card">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <h3 className="text-xl font-bold">MCN Solutions</h3>
                  <p className="text-muted-foreground">Apr 2022 - Present</p>
                </div>
                <h4 className="text-lg font-semibold mb-2">Technical Lead</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Architected and led development of blockchain + IoT products</li>
                  <li>Managed cross-functional teams (Django, .NET 6, Blazor)</li>
                  <li>Enforced coding/testing standards</li>
                  <li>Delivered Agile-driven releases</li>
                  <li>Mentored engineers and conducted R&D</li>
                </ul>
              </div>

              {/* MCN Solutions - Technical Trainer */}
              <div className="gradient-border p-6 bg-card">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <h3 className="text-xl font-bold">MCN Solutions</h3>
                  <p className="text-muted-foreground">Jul 2019 - Mar 2022</p>
                </div>
                <h4 className="text-lg font-semibold mb-2">Technical Trainer</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Delivered training in JS, Python, C++, SQL, Django</li>
                  <li>Built hands-on modules and interactive sessions</li>
                  <li>Trained teams in full-stack & Web3 tools (Polygon, Base, etc.)</li>
                </ul>
              </div>

              {/* C# Corner - Technical Writer */}
              <div className="gradient-border p-6 bg-card">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <h3 className="text-xl font-bold">C# Corner</h3>
                  <p className="text-muted-foreground">Jul 2019 - Jun 2025</p>
                </div>
                <h4 className="text-lg font-semibold mb-2">Technical Writer</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Authored 80+ articles and 3 eBooks on AI, Python, Web3</li>
                  <li>Covered ML, OpenVINO, IoT, Windows 11</li>
                  <li>Focused on clarity, depth, and beginner-to-pro content</li>
                </ul>
              </div>

              {/* C# Corner - Program Director */}
              <div className="gradient-border p-6 bg-card">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <h3 className="text-xl font-bold">C# Corner</h3>
                  <p className="text-muted-foreground">Dec 2020 - Jun 2022</p>
                </div>
                <h4 className="text-lg font-semibold mb-2">Program Director</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Managed C# Corner MVP program</li>
                  <li>Enhanced member engagement and program benefits</li>
                  <li>Implemented support and feedback loops</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>

            <div className="max-w-3xl mx-auto">
              <div className="gradient-border p-6 bg-card mb-8">
                <h3 className="text-xl font-semibold mb-6">Core Competencies</h3>
                <div className="space-y-6">
                  {featuredSkills.map((skill) => (
                    <ProgressBar
                      key={skill.name}
                      label={skill.name}
                      value={skill.level}
                      color={
                        skill.level >= 90
                          ? "bg-green-500"
                          : skill.level >= 80
                            ? "bg-blue-500"
                            : skill.level >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="gradient-border p-6 bg-card">
                  <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Python, C#/.NET, Solidity</li>
                    <li>Django, Blazor, Radzen</li>
                    <li>Azure, Raspberry Pi</li>
                    <li>Blockchain, IoT, AI/ML</li>
                    <li>Computer Vision, OCR</li>
                  </ul>
                </div>

                <div className="gradient-border p-6 bg-card">
                  <h3 className="text-xl font-semibold mb-4">Professional Skills</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Technical Leadership</li>
                    <li>Agile Project Management</li>
                    <li>Team Mentorship</li>
                    <li>Technical Writing</li>
                    <li>Training & Development</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button asChild>
                  <Link href="/skills" className="flex items-center">
                    View Detailed Skills Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>

            <div className="max-w-3xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2">
                {featuredProjects.map((project, index) => (
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
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button asChild>
                  <Link href="/projects" className="flex items-center">
                    View All Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-primary" />
                      <a
                        href="mailto:gupta.rohitg.rohit900@gmail.com"
                        className="text-muted-foreground hover:text-primary"
                      >
                        gupta.rohitg.rohit900@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-primary" />
                      <a href="tel:+919910701948" className="text-muted-foreground hover:text-primary">
                        +91 9910701948
                      </a>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-primary" />
                      <span className="text-muted-foreground">Ghaziabad, Uttar Pradesh, India</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-6">Connect With Me</h3>
                  <div className="flex space-x-4">
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="https://www.linkedin.com/in/rohit-gupta-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="http://hindikijiwani.blogspot.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Blog"
                      >
                        <FileText className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <a href="mailto:gupta.rohitg.rohit900@gmail.com" aria-label="Email">
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="gradient-border p-6 bg-card">
                  <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message"
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rohit Gupta. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.linkedin.com/in/rohit-gupta-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                LinkedIn
              </a>
              <a
                href="http://hindikijiwani.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                Blog
              </a>
              <a href="mailto:gupta.rohitg.rohit900@gmail.com" className="text-muted-foreground hover:text-primary">
                Email
              </a>
            </div>
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

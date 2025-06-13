"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Users,
  Star,
  Send,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { projects } from "@/data/projects"
import { testimonials } from "@/data/testimonials"
import { timelineData } from "@/data/timeline"

export default function Home() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [testimonialDirection, setTestimonialDirection] = useState(0)
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<string[]>([])
  const [projectFilter, setProjectFilter] = useState("all")
  const [skillsVisible, setSkillsVisible] = useState(false)

  // Refs for sections
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  }

  // Handle scroll to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Find the section that is currently in view
      for (const section in sectionRefs) {
        const sectionRef = sectionRefs[section as keyof typeof sectionRefs]
        if (sectionRef.current) {
          const sectionTop = sectionRef.current.offsetTop
          const sectionBottom = sectionTop + sectionRef.current.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]
    if (section.current) {
      section.current.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  // Handle contact form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
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

  // Handle testimonial navigation
  const handleNextTestimonial = () => {
    setTestimonialDirection(1)
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handlePreviousTestimonial = () => {
    setTestimonialDirection(-1)
    setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Filter projects
  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter((project) => project.tags?.includes(projectFilter))

  // Skills data
  const skillCategories = [
    {
      name: "Programming",
      skills: [
        { name: "Python", level: 95 },
        { name: "C#/.NET", level: 90 },
        { name: "Solidity", level: 85 },
        { name: "JavaScript", level: 80 },
      ],
    },
    {
      name: "Technologies",
      skills: [
        { name: "Blockchain", level: 90 },
        { name: "IoT", level: 85 },
        { name: "AI/ML", level: 80 },
        { name: "Azure", level: 90 },
      ],
    },
    {
      name: "Soft Skills",
      skills: [
        { name: "Leadership", level: 95 },
        { name: "Communication", level: 90 },
        { name: "Problem Solving", level: 95 },
        { name: "Project Management", level: 85 },
      ],
    },
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const testimonialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  // Skill section ref for intersection observer
  const skillsSectionRef = useRef(null)
  const isSkillsInView = useInView(skillsSectionRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isSkillsInView) {
      setSkillsVisible(true)
    }
  }, [isSkillsInView])

  // Timeline item visibility
  const handleTimelineItemVisible = (id: string, isVisible: boolean) => {
    if (isVisible) {
      setVisibleTimelineItems((prev) => [...prev, id])
    }
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Navigation Indicator */}
      <div className="nav-indicator">
        <ul>
          {Object.keys(sectionRefs).map((section) => (
            <li
              key={section}
              className={activeSection === section ? "active" : ""}
              onClick={() => scrollToSection(section)}
              title={section.charAt(0).toUpperCase() + section.slice(1)}
            />
          ))}
        </ul>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold gradient-text">Rohit Gupta</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {Object.keys(sectionRefs).map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute w-full bg-background/95 backdrop-blur-md border-b border-white/10"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {Object.keys(sectionRefs).map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-sm font-medium py-2 hover:text-primary"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section
          ref={sectionRefs.home}
          id="home"
          className="min-h-screen flex items-center relative overflow-hidden animated-gradient-bg"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <motion.div
                className="flex-1 space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-shadow">
                  I'm <span className="gradient-text">Rohit Gupta</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-white/80">Technical Project Manager</h2>
                <p className="text-lg text-white/70 max-w-xl">
                  Blockchain & IoT Expert | Agile Leader | Azure | Python | EVM & Solidity | Driving Innovation Through
                  Emerging Tech & Scalable Architecture
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                    onClick={() => scrollToSection("about")}
                  >
                    Learn More About Me
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 hover:bg-white/10"
                    onClick={() => scrollToSection("contact")}
                  >
                    Get In Touch
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rohit.jpg-v0vd0xDZFnAZoKjZtI4MfOVaxX0iUj.jpeg"
                    alt="Rohit Gupta"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <motion.div
                className="scroll-indicator text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              ></motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={sectionRefs.about} id="about" className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text" variants={fadeInUp}>
                About Me
              </motion.h2>

              <motion.div className="space-y-8" variants={fadeInUp}>
                <p className="text-lg text-white/80 leading-relaxed">
                  As a Technical Lead specializing in Blockchain and IoT solutions, I thrive at the intersection of
                  cutting-edge technology and practical business impact. With hands-on experience designing, developing,
                  and deploying decentralized and connected systems, I lead high-performing engineering teams to deliver
                  secure, scalable, and innovative solutions across industries.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Currently at MCN Solutions, I architect technical frameworks, define coding standards, and ensure
                  rigorous testing and deployment protocols for next-gen blockchain and IoT projects. Beyond delivery, I
                  take pride in mentoring junior engineers, fostering a growth-driven team culture, and embedding Agile
                  best practices using tools like Jira, ClickUp, and Azure Boards.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glass-card p-8 rounded-xl hover-lift">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">Education</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">M.Sc. Informatics</h4>
                        <p className="text-sm text-white/60">
                          Institute of Informatics & Communication, DU | 2016-2019
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Intel Edge AI for IoT Nanodegree</h4>
                        <p className="text-sm text-white/60">Udacity | 2020</p>
                      </div>
                      <div>
                        <h4 className="font-medium">B.Sc. Electronics</h4>
                        <p className="text-sm text-white/60">Sri Aurobindo College | 2012-2015</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-8 rounded-xl hover-lift">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                        <Award className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">Awards & Honors</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/80">• C# Corner MVP 2019</p>
                      <p className="text-white/80">• Sarita Gupta Memorial Scholarship</p>
                      <p className="text-white/80">• Pasricha Memorial Award</p>
                      <p className="text-white/80">• Student of the Month</p>
                      <p className="text-white/80">• Medhavi Chatravriti + Vigyan Pratibha Khoj</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section ref={sectionRefs.experience} id="experience" className="py-20 md:py-32 gradient-bg relative">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Professional Journey
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <div className="timeline-container">
                {timelineData.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="mb-12 relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onViewportEnter={() => handleTimelineItemVisible(item.id, true)}
                  >
                    <div className="timeline-dot" style={{ top: "24px" }}></div>
                    <div className="glass-card p-6 rounded-xl hover-lift">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                          {item.icon === "Code" ? (
                            <Code className="h-6 w-6" />
                          ) : item.icon === "Briefcase" ? (
                            <Briefcase className="h-6 w-6" />
                          ) : item.icon === "FileText" ? (
                            <FileText className="h-6 w-6" />
                          ) : (
                            <Users className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-white/60">{item.company}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
                          {item.startDate} - {item.endDate}
                        </div>
                      </div>
                      <p className="text-white/80 mb-4">{item.description}</p>
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 text-white/90">Key Achievements:</h4>
                        <ul className="space-y-1 text-white/70">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={sectionRefs.skills} id="skills" className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4" ref={skillsSectionRef}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Skills & Expertise
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {skillCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.name}
                    className="glass-card p-8 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-6 gradient-text">{category.name}</h3>
                    <div className="space-y-6">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/90">{skill.name}</span>
                            <span className="text-sm text-white/60">{skill.level}%</span>
                          </div>
                          <div className="skill-bar">
                            <div
                              className="skill-progress"
                              style={{
                                width: skillsVisible ? `${skill.level}%` : "0%",
                                transitionDelay: `${skillIndex * 0.1 + 0.3}s`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-16 grid md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="glass-card p-8 rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                      <Code className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Technical Leadership</h3>
                  </div>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Architecture design and system planning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Code quality and standards enforcement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Technical mentorship and team development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Research and innovation initiatives</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Cross-functional team collaboration</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-8 rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Project Management</h3>
                  </div>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Agile methodologies implementation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Sprint planning and execution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Resource allocation and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Risk assessment and mitigation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Stakeholder communication</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={sectionRefs.projects} id="projects" className="py-20 md:py-32 gradient-bg relative">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Featured Projects
            </motion.h2>

            <motion.div
              className="max-w-lg mx-auto mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-white/70">
                Explore my portfolio of innovative projects spanning blockchain, IoT, and software development.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                variant={projectFilter === "all" ? "default" : "outline"}
                onClick={() => setProjectFilter("all")}
                className={projectFilter !== "all" ? "border-white/20 hover:bg-white/10" : ""}
              >
                All Projects
              </Button>
              <Button
                variant={projectFilter === "Blockchain" ? "default" : "outline"}
                onClick={() => setProjectFilter("Blockchain")}
                className={projectFilter !== "Blockchain" ? "border-white/20 hover:bg-white/10" : ""}
              >
                Blockchain
              </Button>
              <Button
                variant={projectFilter === "IoT" ? "default" : "outline"}
                onClick={() => setProjectFilter("IoT")}
                className={projectFilter !== "IoT" ? "border-white/20 hover:bg-white/10" : ""}
              >
                IoT
              </Button>
              <Button
                variant={projectFilter === "Python" ? "default" : "outline"}
                onClick={() => setProjectFilter("Python")}
                className={projectFilter !== "Python" ? "border-white/20 hover:bg-white/10" : ""}
              >
                Python
              </Button>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    className="glass-card rounded-xl overflow-hidden hover-lift"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getColorByIndex(
                            index,
                          )}`}
                        >
                          {project.title.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-white/60 mb-1">
                          <span className="font-medium text-white/80">Client:</span> {project.client}
                        </div>
                        <div className="text-sm text-white/60">
                          <span className="font-medium text-white/80">Role:</span> {project.role}
                        </div>
                      </div>
                      <p className="text-white/70 line-clamp-3 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80"
                          >
                            {tag}
                          </div>
                        ))}
                        {project.tags && project.tags.length > 3 && (
                          <div className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80">
                            +{project.tags.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={sectionRefs.testimonials} id="testimonials" className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What People Say
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden h-[300px] md:h-[250px]">
                <AnimatePresence initial={false} custom={testimonialDirection} mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    custom={testimonialDirection}
                    variants={testimonialVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute w-full"
                  >
                    <div className="testimonial-card">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
                            {testimonials[currentTestimonialIndex].name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-white/90">{testimonials[currentTestimonialIndex].name}</h3>
                          <p className="text-sm text-white/60">
                            {testimonials[currentTestimonialIndex].position},{" "}
                            {testimonials[currentTestimonialIndex].company}
                          </p>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < testimonials[currentTestimonialIndex].rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-500",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/80 italic">"{testimonials[currentTestimonialIndex].text}"</p>
                      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-white/50">
                        {testimonials[currentTestimonialIndex].relationship}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousTestimonial}
                  aria-label="Previous testimonial"
                  className="border-white/20 hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonialIndex ? "bg-primary w-4" : "bg-white/30"
                      }`}
                      onClick={() => {
                        setTestimonialDirection(index > currentTestimonialIndex ? 1 : -1)
                        setCurrentTestimonialIndex(index)
                      }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextTestimonial}
                  aria-label="Next testimonial"
                  className="border-white/20 hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={sectionRefs.contact} id="contact" className="py-20 md:py-32 gradient-bg relative">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  className="glass-card p-8 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 mr-4">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Email</p>
                        <a
                          href="mailto:gupta.rohitg.rohit900@gmail.com"
                          className="text-white/90 hover:text-primary transition-colors"
                        >
                          gupta.rohitg.rohit900@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-500/20 text-purple-400 mr-4">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Phone</p>
                        <a href="tel:+919910701948" className="text-white/90 hover:text-primary transition-colors">
                          +91 9910701948
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-500/20 text-green-400 mr-4">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Location</p>
                        <span className="text-white/90">Ghaziabad, Uttar Pradesh, India</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mt-10 mb-6">Connect With Me</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/rohit-gupta-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="http://hindikijiwani.blogspot.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Blog"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <FileText className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:gupta.rohitg.rohit900@gmail.com"
                      aria-label="Email"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="glass-card p-8 rounded-xl"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-6 gradient-text">Send Me a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1 text-white/80">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="bg-white/5 border-white/10 focus:border-primary text-white/90 placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1 text-white/80">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="bg-white/5 border-white/10 focus:border-primary text-white/90 placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1 text-white/80">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message"
                        rows={4}
                        required
                        className="bg-white/5 border-white/10 focus:border-primary text-white/90 placeholder:text-white/40"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                      disabled={isSubmitting}
                    >
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
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold gradient-text mb-2">Rohit Gupta</div>
              <p className="text-sm text-white/60">Technical Project Manager & Blockchain Expert</p>
            </div>
            <div className="text-sm text-white/60">© {new Date().getFullYear()} Rohit Gupta. All rights reserved.</div>
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
    "bg-violet-600",
    "bg-indigo-600",
    "bg-cyan-600",
    "bg-teal-600",
    "bg-green-600",
    "bg-amber-600",
  ]
  return colors[index % colors.length]
}

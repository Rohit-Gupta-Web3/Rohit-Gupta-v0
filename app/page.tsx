"use client"
import { useState, useEffect, useRef, useMemo, Suspense, lazy } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { Menu, X, Code, Briefcase, GraduationCap, Award, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getOptimizedImageUrl } from "@/lib/image-optimization"
import { timelineData } from "@/data/timeline"

// Lazy load heavy components
const ProjectsSection = lazy(() => import("@/components/sections/projects-section"))
const TestimonialsSection = lazy(() => import("@/components/sections/testimonials-section"))
const ContactSection = lazy(() => import("@/components/sections/contact-section"))

// Loading fallbacks
const SectionLoading = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="h-8 w-48 bg-white/10 rounded-md"></div>
      <div className="h-4 w-64 bg-white/10 rounded-md"></div>
    </div>
  </div>
)

export default function Home() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<string[]>([])
  const [isScrolling, setIsScrolling] = useState(false)

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

  // Throttle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true)

        // Use requestAnimationFrame for better performance
        window.requestAnimationFrame(() => {
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

          setIsScrolling(false)
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolling])

  // Scroll to section with optimized animation
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]
    if (section.current) {
      // Use native scrollIntoView for better performance
      section.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setMobileMenuOpen(false)
  }

  // Memoize skill categories to prevent unnecessary re-renders
  const skillCategories = useMemo(
    () => [
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
    ],
    [],
  )

  // Animation variants - memoized to prevent re-creation
  const animations = useMemo(
    () => ({
      fadeInUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      },
      staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
          },
        },
      },
    }),
    [],
  )

  // Skill section ref for intersection observer
  const skillsSectionRef = useRef(null)
  const isSkillsInView = useInView(skillsSectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isSkillsInView) {
      setSkillsVisible(true)
    }
  }, [isSkillsInView])

  // Timeline item visibility
  const handleTimelineItemVisible = (id: string, isVisible: boolean) => {
    if (isVisible && !visibleTimelineItems.includes(id)) {
      setVisibleTimelineItems((prev) => [...prev, id])
    }
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Navigation Indicator - only render on desktop for performance */}
      {typeof window !== "undefined" && window.innerWidth >= 1024 && (
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
      )}

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

          {/* Mobile Menu Button - Optimized to prevent re-renders */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation - Only render when open */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
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
        {/* Hero Section - Optimized with will-change for better performance */}
        <section
          ref={sectionRefs.home}
          id="home"
          className="min-h-screen flex items-center relative overflow-hidden animated-gradient-bg"
          style={{ willChange: "transform" }}
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
                transition={{ duration: 0.6, ease: "easeOut" }}
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
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                  <Image
                    src={
                      getOptimizedImageUrl(
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rohit.jpg-v0vd0xDZFnAZoKjZtI4MfOVaxX0iUj.jpeg",
                        320,
                      ) || "/placeholder.svg"
                    }
                    alt="Rohit Gupta"
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover"
                    priority
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <motion.div
                className="scroll-indicator text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
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
              viewport={{ once: true, amount: 0.2 }}
              variants={animations.staggerContainer}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
                variants={animations.fadeInUp}
              >
                About Me
              </motion.h2>

              <motion.div className="space-y-8" variants={animations.fadeInUp}>
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
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
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
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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

        {/* Skills Section - Optimized with reduced animations */}
        <section ref={sectionRefs.skills} id="skills" className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4" ref={skillsSectionRef}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
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
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
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
                                transitionDelay: `${skillIndex * 0.1 + 0.2}s`,
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
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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

        {/* Projects Section - Lazy loaded for performance */}
        <section ref={sectionRefs.projects} id="projects" className="py-20 md:py-32 gradient-bg relative">
          <Suspense fallback={<SectionLoading />}>
            <ProjectsSection />
          </Suspense>
        </section>

        {/* Testimonials Section - Lazy loaded for performance */}
        <section ref={sectionRefs.testimonials} id="testimonials" className="py-20 md:py-32 relative">
          <Suspense fallback={<SectionLoading />}>
            <TestimonialsSection />
          </Suspense>
        </section>

        {/* Contact Section - Lazy loaded for performance */}
        <section ref={sectionRefs.contact} id="contact" className="py-20 md:py-32 gradient-bg relative">
          <Suspense fallback={<SectionLoading />}>
            <ContactSection />
          </Suspense>
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

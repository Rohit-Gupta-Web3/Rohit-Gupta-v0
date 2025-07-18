"use client"
import { useState, useEffect, useRef, useMemo, Suspense, lazy } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { Menu, X, Code, Briefcase, GraduationCap, Award, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getOptimizedImageUrl } from "@/lib/image-optimization"
import { timelineData } from "@/data/timeline"
import { FloatingElements } from "@/components/animations/floating-elements"
import { TextReveal } from "@/components/animations/text-reveal"
import { ParallaxSection } from "@/components/animations/parallax-section"
import { MorphingBlob } from "@/components/animations/morphing-blob"
import { ScrollProgress } from "@/components/animations/scroll-progress"
import { StaggeredGrid } from "@/components/animations/staggered-grid"

// Lazy load heavy components
const ProjectsSection = lazy(() => import("@/components/sections/projects-section"))
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

  // Scroll animations
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8])

  // Refs for sections
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  }

  // Throttle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true)

        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 100

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
      section.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setMobileMenuOpen(false)
  }

  // Memoize skill categories
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

  // Animation variants
  const animations = useMemo(
    () => ({
      fadeInUp: {
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      },
      staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          },
        },
      },
      scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
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
    <div className="min-h-screen bg-background dark relative overflow-x-hidden">
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Navigation Indicator */}
      {typeof window !== "undefined" && window.innerWidth >= 1024 && (
        <motion.div
          className="nav-indicator"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ul>
            {Object.keys(sectionRefs).map((section, index) => (
              <motion.li
                key={section}
                className={activeSection === section ? "active" : ""}
                onClick={() => scrollToSection(section)}
                title={section.charAt(0).toUpperCase() + section.slice(1)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </ul>
        </motion.div>
      )}

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="text-xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Rohit Gupta
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {Object.keys(sectionRefs).map((section, index) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section ? "text-primary" : "text-muted-foreground"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute w-full bg-background/95 backdrop-blur-md border-b border-white/10"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {Object.keys(sectionRefs).map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-sm font-medium py-2 hover:text-primary text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section
          ref={sectionRefs.home}
          id="home"
          className="min-h-screen flex items-center relative overflow-hidden animated-gradient-bg"
        >
          <MorphingBlob />

          <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
          </motion.div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <motion.div
                className="flex-1 space-y-6"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold leading-tight text-shadow"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  I'm <span className="gradient-text">Rohit Gupta</span>
                </motion.h1>

                <TextReveal className="text-2xl md:text-3xl font-medium text-white/80" delay={0.5}>
                  Technical Project Manager & AI Expert
                </TextReveal>

                <TextReveal className="text-lg text-white/70 max-w-xl" delay={0.8}>
                  AI, Blockchain & IoT Specialist | Agile Leader | Azure | Python | EVM & Solidity | Driving Innovation Through
                  Emerging Tech & Scalable Architecture
                </TextReveal>

                <motion.div
                  className="flex flex-wrap gap-4 pt-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                      onClick={() => scrollToSection("about")}
                    >
                      Learn More About Me
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 hover:bg-white/10"
                      onClick={() => scrollToSection("contact")}
                    >
                      Get In Touch
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 blur-2xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
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

            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.div
                className="scroll-indicator text-white/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <ParallaxSection speed={0.3}>
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
                  <TextReveal className="text-lg text-white/80 leading-relaxed">
                    As a Technical Lead specializing in Blockchain, IoT, and AI solutions, I thrive at the intersection of
                    cutting-edge technology and practical business impact. With hands-on experience designing,
                    developing, and deploying decentralized and connected systems, I lead high-performing engineering
                    teams to deliver secure, scalable, and innovative solutions across industries.
                  </TextReveal>

                  <TextReveal className="text-lg text-white/80 leading-relaxed" delay={0.3}>
                    Currently at MCN Solutions, I architect technical frameworks, define coding standards, and ensure
                    rigorous testing and deployment protocols for next-gen blockchain, IoT, and AI projects. Beyond delivery,
                    I take pride in mentoring junior engineers, fostering a growth-driven team culture, and embedding
                    Agile best practices using tools like Jira, ClickUp, and Azure Boards.
                  </TextReveal>

                  <StaggeredGrid className="grid md:grid-cols-2 gap-8" staggerDelay={0.2}>
                    <motion.div
                      className="glass-card p-8 rounded-xl hover-lift"
                      whileHover={{ scale: 1.02, rotateY: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="p-3 rounded-full bg-blue-500/20 text-blue-400"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <GraduationCap className="h-6 w-6" />
                        </motion.div>
                        <h3 className="text-xl font-bold">Education</h3>
                      </div>
                      <div className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <h4 className="font-medium">M.Sc. Informatics</h4>
                          <p className="text-sm text-white/60">
                            Institute of Informatics & Communication, DU | 2016-2019
                          </p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h4 className="font-medium">Intel Edge AI for IoT Nanodegree</h4>
                          <p className="text-sm text-white/60">Udacity | 2020</p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h4 className="font-medium">B.Sc. Electronics</h4>
                          <p className="text-sm text-white/60">Sri Aurobindo College | 2012-2015</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="glass-card p-8 rounded-xl hover-lift"
                      whileHover={{ scale: 1.02, rotateY: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="p-3 rounded-full bg-purple-500/20 text-purple-400"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Award className="h-6 w-6" />
                        </motion.div>
                        <h3 className="text-xl font-bold">Awards & Honors</h3>
                      </div>
                      <div className="space-y-2">
                        {[
                          "C# Corner MVP 2019",
                          "Sarita Gupta Memorial Scholarship",
                          "Pasricha Memorial Award",
                          "Student of the Month",
                          "Medhavi Chatravriti + Vigyan Pratibha Khoj",
                        ].map((award, index) => (
                          <motion.p
                            key={award}
                            className="text-white/80"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            • {award}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  </StaggeredGrid>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </ParallaxSection>

        {/* Experience Section */}
        <section ref={sectionRefs.experience} id="experience" className="py-20 md:py-32 gradient-bg relative">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              Professional Journey
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <div className="timeline-container">
                {timelineData.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="mb-12 relative"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    onViewportEnter={() => handleTimelineItemVisible(item.id, true)}
                  >
                    <motion.div
                      className="timeline-dot"
                      style={{ top: "24px" }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    />
                    <motion.div
                      className="glass-card p-6 rounded-xl hover-lift"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="p-3 rounded-full bg-blue-500/20 text-blue-400"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.icon === "Code" ? (
                            <Code className="h-6 w-6" />
                          ) : item.icon === "Briefcase" ? (
                            <Briefcase className="h-6 w-6" />
                          ) : item.icon === "FileText" ? (
                            <FileText className="h-6 w-6" />
                          ) : (
                            <Users className="h-6 w-6" />
                          )}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-white/60">{item.company}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <motion.div
                          className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.5 }}
                        >
                          {item.startDate} - {item.endDate}
                        </motion.div>
                      </div>
                      <p className="text-white/80 mb-4">{item.description}</p>
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 text-white/90">Key Achievements:</h4>
                        <ul className="space-y-1 text-white/70">
                          {item.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + i * 0.1 + 0.6 }}
                            >
                              <span className="mr-2">•</span>
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <ParallaxSection speed={0.2}>
          <section ref={sectionRefs.skills} id="skills" className="py-20 md:py-32 relative">
            <div className="container mx-auto px-4" ref={skillsSectionRef}>
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                Skills & Expertise
              </motion.h2>

              <div className="max-w-4xl mx-auto">
                <StaggeredGrid className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
                  {skillCategories.map((category, categoryIndex) => (
                    <motion.div
                      key={category.name}
                      className="glass-card p-8 rounded-xl"
                      whileHover={{
                        scale: 1.05,
                        rotateY: 5,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h3 className="text-xl font-bold mb-6 gradient-text">{category.name}</h3>
                      <div className="space-y-6">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-white/90">{skill.name}</span>
                              <motion.span
                                className="text-sm text-white/60"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: skillIndex * 0.1 + 0.5 }}
                              >
                                {skill.level}%
                              </motion.span>
                            </div>
                            <div className="skill-bar">
                              <motion.div
                                className="skill-progress"
                                initial={{ width: 0 }}
                                whileInView={{ width: skillsVisible ? `${skill.level}%` : "0%" }}
                                transition={{
                                  delay: skillIndex * 0.1 + 0.3,
                                  duration: 1.5,
                                  ease: "easeOut",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </StaggeredGrid>

                <StaggeredGrid className="mt-16 grid md:grid-cols-2 gap-8" staggerDelay={0.2}>
                  <motion.div
                    className="glass-card p-8 rounded-xl"
                    whileHover={{ scale: 1.02, rotateY: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="p-3 rounded-full bg-blue-500/20 text-blue-400"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Code className="h-6 w-6" />
                      </motion.div>
                      <h3 className="text-xl font-bold">Technical Leadership</h3>
                    </div>
                    <ul className="space-y-2 text-white/80">
                      {[
                        "Architecture design and system planning",
                        "Code quality and standards enforcement",
                        "Technical mentorship and team development",
                        "Research and innovation initiatives",
                        "Cross-functional team collaboration",
                      ].map((item, index) => (
                        <motion.li
                          key={item}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    className="glass-card p-8 rounded-xl"
                    whileHover={{ scale: 1.02, rotateY: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="p-3 rounded-full bg-purple-500/20 text-purple-400"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Briefcase className="h-6 w-6" />
                      </motion.div>
                      <h3 className="text-xl font-bold">Project Management</h3>
                    </div>
                    <ul className="space-y-2 text-white/80">
                      {[
                        "Agile methodologies implementation",
                        "Sprint planning and execution",
                        "Resource allocation and optimization",
                        "Risk assessment and mitigation",
                        "Stakeholder communication",
                      ].map((item, index) => (
                        <motion.li
                          key={item}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </StaggeredGrid>
              </div>
            </div>
          </section>
        </ParallaxSection>

        {/* Projects Section */}
        <section ref={sectionRefs.projects} id="projects" className="py-20 md:py-32 gradient-bg relative">
          <Suspense fallback={<SectionLoading />}>
            <ProjectsSection />
          </Suspense>
        </section>

        {/* Contact Section */}
        <ParallaxSection speed={0.1}>
          <section ref={sectionRefs.contact} id="contact" className="py-20 md:py-32 relative">
            <Suspense fallback={<SectionLoading />}>
              <ContactSection />
            </Suspense>
          </section>
        </ParallaxSection>
      </main>

      {/* Footer */}
      <motion.footer
        className="py-8 border-t border-white/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-4 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xl font-bold gradient-text mb-2">Rohit Gupta</div>
              <p className="text-sm text-white/60">Technical Project Manager & AI Expert</p>
            </motion.div>
            <motion.div
              className="text-sm text-white/60"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              © {new Date().getFullYear()} Rohit Gupta. All rights reserved.
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

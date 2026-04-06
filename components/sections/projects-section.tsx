"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { StaggeredGrid } from "@/components/animations/staggered-grid"
import { TextReveal } from "@/components/animations/text-reveal"

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

export default function ProjectsSection() {
  const [projectFilter, setProjectFilter] = useState("all")

  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter((project) => project.tags?.includes(projectFilter))

  return (
    <div className="container mx-auto px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Featured Projects
      </motion.h2>

      <motion.div
        className="max-w-lg mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TextReveal className="text-white/70">
          Explore my portfolio of innovative projects spanning blockchain, IoT, and software development.
        </TextReveal>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {["all", "AI", "Blockchain", "IoT", "Python"].map((filter, index) => (
          <motion.div
            key={filter}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={projectFilter === filter ? "default" : "outline"}
              onClick={() => setProjectFilter(filter)}
              className={projectFilter !== filter ? "border-white/20 hover:bg-white/10" : ""}
            >
              {filter === "all" ? "All Projects" : filter}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <StaggeredGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glass-card rounded-xl overflow-hidden hover-lift group"
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getColorByIndex(index)}`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.title.charAt(0)}
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold group-hover:text-primary transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                </div>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-sm text-white/60 mb-1">
                    <span className="font-medium text-white/80">Client:</span> {project.client}
                  </div>
                  <div className="text-sm text-white/60">
                    <span className="font-medium text-white/80">Role:</span> {project.role}
                  </div>
                </motion.div>

                <motion.p
                  className="text-white/70 line-clamp-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <motion.div
                      key={tagIndex}
                      className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + tagIndex * 0.1 }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      {tag}
                    </motion.div>
                  ))}
                  {project.tags && project.tags.length > 3 && (
                    <motion.div
                      className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      +{project.tags.length - 3} more
                    </motion.div>
                  )}
                </motion.div>

                {project.link && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button asChild className="w-full" variant="secondary">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} project link`}>
                        Visit Project
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </StaggeredGrid>
      </div>
    </div>
  )
}

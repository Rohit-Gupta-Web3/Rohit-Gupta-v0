"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

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

  // Filter projects - memoize this if the list is large
  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter((project) => project.tags?.includes(projectFilter))

  return (
    <div className="container mx-auto px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>

      <motion.div
        className="max-w-lg mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
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
        transition={{ duration: 0.5, delay: 0.2 }}
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
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }} // Cap the delay for better performance
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
  )
}

"use client"

import { motion } from "framer-motion"
import { useScrollAnimations } from "@/hooks/use-scroll-animations"

export function FloatingElements() {
  const { scrollY } = useScrollAnimations()

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const elements = [
    { size: 60, left: "10%", top: "20%", delay: 0 },
    { size: 40, left: "85%", top: "15%", delay: 2 },
    { size: 80, left: "15%", top: "70%", delay: 4 },
    { size: 50, left: "80%", top: "75%", delay: 1 },
    { size: 35, left: "50%", top: "10%", delay: 3 },
    { size: 45, left: "90%", top: "50%", delay: 5 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm"
          style={{
            width: element.size,
            height: element.size,
            left: element.left,
            top: element.top,
            y: scrollY * -0.1 * (index + 1),
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: element.delay }}
        />
      ))}
    </div>
  )
}

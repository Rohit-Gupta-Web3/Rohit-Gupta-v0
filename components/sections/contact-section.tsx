"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Send } from "lucide-react"

export default function ContactSection() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle contact form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        })

        // Reset form
        setName("")
        setEmail("")
        setMessage("")
      } else {
        throw new Error("Failed to send message")
      }
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

  return (
    <div className="container mx-auto px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5 }}
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
              <motion.a
                href="https://www.linkedin.com/in/rohit-gupta-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="http://hindikijiwani.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Blog"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FileText className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:gupta.rohitg.rohit900@gmail.com"
                aria-label="Email"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

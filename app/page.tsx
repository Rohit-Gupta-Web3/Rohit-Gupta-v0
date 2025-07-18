import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Linkedin, Calendar } from 'lucide-react'
import { projects } from '@/data/projects'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <main className="min-h-screen text-foreground bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Rohit Gupta</h1>
        <p className="text-xl mb-6">Technical PM | AI &amp; Blockchain Expert | Public Speaker</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button asChild>
            <Link href="mailto:gupta.rohitg.rohit900@gmail.com">Hire Me</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/resume.pdf" target="_blank">Download Resume</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="https://calendly.com/rohit-gupta" target="_blank">Book Talk</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-center mb-4">About Me</h2>
        <p>
          Passionate about building scalable technology solutions, I have led cross-functional teams to deliver complex software products across industries. My journey spans AI research, blockchain development and technical project management, enabling organisations to innovate rapidly while maintaining rigorous quality standards. I value continuous learning, clear communication and empowering teams to succeed together.
        </p>
      </section>

      {/* Expertise Grid */}
      <section id="expertise" className="py-20 bg-muted/20">
        <h2 className="text-3xl font-semibold text-center mb-10">Core Expertise</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          <div>
            <h3 className="text-xl font-medium mb-2">🧠 AI &amp; LLMs</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Transformer models</li>
              <li>LangChain agents</li>
              <li>HF Spaces</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">🔗 Blockchain</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>EVM &amp; Solidity</li>
              <li>NFTs</li>
              <li>Proof of Skill Certs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">🚀 PM Leadership</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Agile/Scrum</li>
              <li>Dev cycles</li>
              <li>Stakeholder delivery</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">Projects Showcase</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.slice(0,6).map(project => (
            <div key={project.title} className="border rounded-lg p-4 flex flex-col shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-sm mb-2 line-clamp-3">{project.description}</p>
              {project.tags && (
                <div className="flex flex-wrap gap-1 text-xs mb-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-muted rounded-md">{tag}</span>
                  ))}
                </div>
              )}
              {project.link && (
                <Link href={project.link} target="_blank" className="text-primary text-sm mt-auto">View project</Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Speaking Section */}
      <section id="speaking" className="py-20 bg-muted/20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">Speaking &amp; Media</h2>
        <ul className="max-w-4xl mx-auto space-y-6">
          <li className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">AI for Social Good – Speaker</p>
            </div>
            <Link href="https://youtu.be/dQw4w9WgXcQ" target="_blank" className="text-primary text-sm">Watch</Link>
          </li>
          <li className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Blockchain &amp; Beyond – Panelist</p>
            </div>
            <Link href="https://youtu.be/dQw4w9WgXcQ" target="_blank" className="text-primary text-sm">Watch</Link>
          </li>
          <li className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Leading Distributed Teams – Speaker</p>
            </div>
            <Link href="https://youtu.be/dQw4w9WgXcQ" target="_blank" className="text-primary text-sm">Watch</Link>
          </li>
          <li className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Building with LangChain – Workshop</p>
            </div>
            <Link href="https://youtu.be/dQw4w9WgXcQ" target="_blank" className="text-primary text-sm">Watch</Link>
          </li>
        </ul>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">Testimonials</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <blockquote className="border-l-4 pl-4 italic">
            "Rohit's ability to translate complex ideas into actionable plans is exceptional."
            <footer className="mt-2 text-sm">— Jane Doe, CEO, TechCorp</footer>
          </blockquote>
          <blockquote className="border-l-4 pl-4 italic">
            "A dynamic speaker who brings clarity and enthusiasm to every event."
            <footer className="mt-2 text-sm">— John Smith, Conference Organizer</footer>
          </blockquote>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">Contact</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center gap-4">
            <Link href="mailto:gupta.rohitg.rohit900@gmail.com" className="flex items-center gap-2"><Mail size={16}/> Email</Link>
            <Link href="https://www.linkedin.com/in/rohit-gupta-ai" target="_blank" className="flex items-center gap-2"><Linkedin size={16}/> LinkedIn</Link>
            <Link href="https://calendly.com/rohit-gupta" target="_blank" className="flex items-center gap-2"><Calendar size={16}/> Calendly</Link>
          </div>
          <form className="space-y-4" action="/api/contact" method="post">
            <Input name="name" placeholder="Name" required />
            <Input type="email" name="email" placeholder="Email" required />
            <Textarea name="message" placeholder="Message" rows={4} required />
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </section>
    </main>
  )
}

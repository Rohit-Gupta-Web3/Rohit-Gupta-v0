import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"

// This would typically come from a database or CMS
const projectsData = {
  "blockchain-iot": {
    title: "Blockchain IoT Integration",
    description: "Architected a secure IoT data platform using blockchain for data integrity and smart contracts.",
    client: "MCN Solutions",
    duration: "8 months",
    role: "Technical Lead",
    tags: ["Blockchain", "IoT", "Solidity", "Azure"],
    overview:
      "Led the development of an integrated blockchain and IoT solution that enables secure, tamper-proof data collection and processing from distributed IoT devices. The system uses smart contracts to automate actions based on sensor data and provides a transparent audit trail for all transactions.",
    challenge:
      "The main challenge was ensuring data integrity from IoT devices to the blockchain while maintaining performance at scale. Additionally, we needed to design smart contracts that could efficiently process high-volume sensor data without excessive gas costs.",
    process: [
      {
        title: "Architecture Design",
        description:
          "Designed a scalable architecture that included edge computing for data preprocessing before blockchain submission.",
      },
      {
        title: "Smart Contract Development",
        description: "Created optimized Solidity smart contracts for data validation and automated actions.",
      },
      {
        title: "IoT Integration",
        description: "Implemented secure communication protocols between IoT devices and blockchain nodes.",
      },
      {
        title: "Testing & Security Audit",
        description: "Conducted extensive testing and security audits to ensure data integrity and system resilience.",
      },
      {
        title: "Deployment & Monitoring",
        description: "Deployed the solution with comprehensive monitoring and alerting systems.",
      },
    ],
    outcome:
      "The solution successfully reduced data tampering incidents by 100% while providing real-time visibility into IoT operations. The blockchain integration enabled automated settlements between parties based on verified sensor data, reducing dispute resolution time by 85% and operational costs by 35%.",
  },
  "alpr-system": {
    title: "ALPR System",
    description: "Developed an Automatic License Plate Recognition system using Python and computer vision techniques.",
    client: "Aarohi Impex",
    duration: "6 months",
    role: "Software Engineer",
    tags: ["Python", "OCR", "Computer Vision", "Image Processing"],
    overview:
      "Created a robust Automatic License Plate Recognition (ALPR) system capable of detecting and reading license plates from images and video streams in various lighting and weather conditions. The system was designed for real-world applications with high accuracy requirements.",
    challenge:
      "License plate detection in real-world scenarios presents numerous challenges including varying lighting conditions, different plate formats, dirt and damage on plates, and capturing plates from moving vehicles at different angles.",
    process: [
      {
        title: "Research & Algorithm Selection",
        description:
          "Researched state-of-the-art computer vision techniques and selected optimal algorithms for plate detection.",
      },
      {
        title: "Image Preprocessing",
        description: "Implemented robust preprocessing to handle various lighting and environmental conditions.",
      },
      {
        title: "Plate Detection",
        description: "Developed algorithms to accurately locate and isolate license plates within images.",
      },
      {
        title: "Character Segmentation",
        description: "Created character segmentation techniques to separate individual characters on the plate.",
      },
      {
        title: "OCR Integration",
        description: "Integrated and optimized OCR to accurately read the segmented characters.",
      },
    ],
    outcome:
      "The ALPR system achieved 94% accuracy in real-world testing across various conditions. It successfully processed images from stationary cameras and moving vehicles, with recognition times averaging under 0.5 seconds per plate. The system was deployed for vehicle access control and traffic monitoring applications.",
  },
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch project data based on the slug
  const projectData = projectsData[params.slug as keyof typeof projectsData] || projectsData["blockchain-iot"]

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
          <Button size="sm" className="hidden md:flex">
            Resume
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-12 md:py-24">
          <Button variant="ghost" size="sm" className="mb-8" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=900&width=1900"
              alt={projectData.title}
              width={1900}
              height={900}
              className="object-cover"
              priority
            />
          </div>

          <div className="mx-auto max-w-3xl py-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{projectData.title}</h1>
            <p className="mt-4 text-xl text-muted-foreground">{projectData.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <h3 className="font-medium">Client</h3>
                <p className="text-muted-foreground">{projectData.client}</p>
              </div>
              <div>
                <h3 className="font-medium">Duration</h3>
                <p className="text-muted-foreground">{projectData.duration}</p>
              </div>
              <div>
                <h3 className="font-medium">Role</h3>
                <p className="text-muted-foreground">{projectData.role}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {projectData.tags.map((tag, index) => (
                <div key={index} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                  {tag}
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="mt-4 text-muted-foreground">{projectData.overview}</p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Challenge</h2>
              <p className="mt-4 text-muted-foreground">{projectData.challenge}</p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Process</h2>
              <div className="mt-6 grid gap-8">
                {projectData.process.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Project diagram"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Project implementation"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Outcome</h2>
              <p className="mt-4 text-muted-foreground">{projectData.outcome}</p>
            </div>

            <div className="mt-12 flex justify-center">
              <Button asChild>
                <Link href="/#contact">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Me for Similar Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
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

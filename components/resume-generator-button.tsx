"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { collectResumeData, generateResumePDF } from "@/lib/resume-generator"
import type { ButtonProps } from "@/components/ui/button"

interface ResumeGeneratorButtonProps extends ButtonProps {
  className?: string
}

export function ResumeGeneratorButton({ className, ...props }: ResumeGeneratorButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateResume = async () => {
    setIsGenerating(true)

    try {
      // Collect data from the website
      const resumeData = collectResumeData()

      // Generate the PDF
      const pdfBlob = await generateResumePDF(resumeData)

      // Create a URL for the blob
      const url = window.URL.createObjectURL(pdfBlob)

      // Create a temporary anchor element
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `rohit-gupta-resume-${Date.now()}.pdf`

      // Append to the document and trigger the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Resume generated",
        description: "Your custom resume has been generated and downloaded.",
      })
    } catch (error) {
      console.error("Resume generation error:", error)
      toast({
        title: "Generation failed",
        description: "There was a problem generating your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button onClick={handleGenerateResume} disabled={isGenerating} className={className} {...props}>
      {isGenerating ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
          <FileDown className="mr-2 h-4 w-4" />
          Generate Resume
        </>
      )}
    </Button>
  )
}

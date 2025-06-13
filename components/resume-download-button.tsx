"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ResumeDownloadButtonProps extends ButtonProps {
  showIcon?: boolean
  text?: string
  className?: string
}

export function ResumeDownloadButton({
  showIcon = true,
  text = "Resume",
  className,
  ...props
}: ResumeDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Trigger the download
      const response = await fetch("/api/download-resume")

      if (!response.ok) {
        throw new Error("Failed to download resume")
      }

      // Get the blob from the response
      const blob = await response.blob()

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob)

      // Create a temporary anchor element
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "rohit-gupta-resume.pdf"

      // Append to the document and trigger the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Download started",
        description: "Your download should begin shortly.",
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download failed",
        description: "There was a problem downloading the resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={isDownloading} className={className} {...props}>
      {isDownloading ? (
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
          Downloading...
        </>
      ) : (
        <>
          {showIcon && <Download className="mr-2 h-4 w-4" />}
          {text}
        </>
      )}
    </Button>
  )
}

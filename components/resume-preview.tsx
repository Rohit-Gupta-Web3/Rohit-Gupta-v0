"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { ResumeDownloadButton } from "@/components/resume-download-button"

export function ResumePreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Preview Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Rohit Gupta - Resume</DialogTitle>
          <div className="flex justify-end">
            <ResumeDownloadButton variant="secondary" size="sm" />
          </div>
        </DialogHeader>
        <div className="mt-4 h-full">
          <iframe src="/rohit.pdf" className="w-full h-full rounded-md border" title="Resume Preview" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { ResumeData } from "@/lib/resume-generator"

// This is a simplified version. In a real implementation, you would use a library like PDFKit or jsPDF
export async function POST(request: Request) {
  try {
    const data: ResumeData = await request.json()

    // In a real implementation, you would generate a PDF here
    // For now, we'll just return the existing PDF
    const filePath = path.join(process.cwd(), "public", "rohit.pdf")
    const fileBuffer = fs.readFileSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="rohit-gupta-resume-${Date.now()}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating resume:", error)
    return new NextResponse("Error generating resume", { status: 500 })
  }
}

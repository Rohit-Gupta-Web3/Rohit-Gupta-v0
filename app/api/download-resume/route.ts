import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Path to the PDF file in the public directory
    const filePath = path.join(process.cwd(), "public", "rohit.pdf")

    // Read the file
    const fileBuffer = fs.readFileSync(filePath)

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="rohit-gupta-resume.pdf"',
      },
    })
  } catch (error) {
    console.error("Error serving PDF:", error)
    return new NextResponse("Error serving PDF file", { status: 500 })
  }
}

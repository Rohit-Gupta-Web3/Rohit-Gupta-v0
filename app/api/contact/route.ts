import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate the request
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      to: "gupta.rohitg.rohit900@gmail.com",
      from: process.env.EMAIL_FROM || "noreply@rohitg.site",
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    // For now, we'll just return a success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

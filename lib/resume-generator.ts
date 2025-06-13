import type { Project } from "@/types/project"
import type { Skill } from "@/types/skill"
import type { Experience } from "@/types/experience"
import type { Education } from "@/types/education"

export interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
    title: string
  }
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
}

export async function generateResumePDF(data: ResumeData): Promise<Blob> {
  try {
    // In a real implementation, we would use a library like jsPDF or pdfmake
    // For this example, we'll simulate PDF generation with a fetch to an API endpoint
    const response = await fetch("/api/generate-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to generate resume")
    }

    return await response.blob()
  } catch (error) {
    console.error("Error generating resume:", error)
    throw error
  }
}

export function collectResumeData(): ResumeData {
  // This function would normally collect data from the website
  // For now, we'll return hardcoded data that matches the website content
  return {
    personalInfo: {
      name: "Rohit Gupta",
      email: "gupta.rohitg.rohit900@gmail.com",
      phone: "+91 9910701948",
      location: "Ghaziabad, Uttar Pradesh, India",
      summary:
        "Blockchain & IoT Expert | Agile Leader | Azure | Python | EVM & Solidity | Driving Innovation Through Emerging Tech & Scalable Architecture",
      title: "Technical Project Manager",
    },
    skills: [
      { name: "Python", level: 95, category: "Programming Languages" },
      { name: "C#/.NET", level: 90, category: "Programming Languages" },
      { name: "Solidity", level: 85, category: "Programming Languages" },
      { name: "JavaScript", level: 80, category: "Programming Languages" },
      { name: "SQL", level: 85, category: "Programming Languages" },
      { name: "Django", level: 90, category: "Frameworks" },
      { name: "Blazor", level: 85, category: "Frameworks" },
      { name: "Radzen", level: 80, category: "Frameworks" },
      { name: "EVM", level: 85, category: "Frameworks" },
      { name: "Blockchain", level: 90, category: "Domains" },
      { name: "IoT", level: 85, category: "Domains" },
      { name: "AI/ML", level: 80, category: "Domains" },
      { name: "Computer Vision", level: 75, category: "Domains" },
      { name: "ALPR", level: 85, category: "Domains" },
      { name: "Azure", level: 90, category: "Tools" },
      { name: "Jira", level: 85, category: "Tools" },
      { name: "ClickUp", level: 80, category: "Tools" },
      { name: "Azure Boards", level: 85, category: "Tools" },
      { name: "Raspberry Pi", level: 90, category: "Tools" },
    ],
    experience: [
      {
        company: "MCN Solutions",
        position: "Technical Lead",
        startDate: "Apr 2022",
        endDate: "Present",
        responsibilities: [
          "Architected and led development of blockchain + IoT products",
          "Managed cross-functional teams (Django, .NET 6, Blazor)",
          "Enforced coding/testing standards",
          "Delivered Agile-driven releases",
          "Mentored engineers and conducted R&D",
        ],
      },
      {
        company: "MCN Solutions",
        position: "Technical Trainer",
        startDate: "Jul 2019",
        endDate: "Mar 2022",
        responsibilities: [
          "Delivered training in JS, Python, C++, SQL, Django",
          "Built hands-on modules and interactive sessions",
          "Trained teams in full-stack & Web3 tools (Polygon, Base, etc.)",
        ],
      },
      {
        company: "C# Corner",
        position: "Technical Writer",
        startDate: "Jul 2019",
        endDate: "Jun 2025",
        responsibilities: [
          "Authored 80+ articles and 3 eBooks on AI, Python, Web3",
          "Covered ML, OpenVINO, IoT, Windows 11",
          "Focused on clarity, depth, and beginner-to-pro content",
        ],
      },
      {
        company: "C# Corner",
        position: "Program Director",
        startDate: "Dec 2020",
        endDate: "Jun 2022",
        responsibilities: [
          "Managed C# Corner MVP program",
          "Enhanced member engagement and program benefits",
          "Implemented support and feedback loops",
        ],
      },
    ],
    education: [
      {
        degree: "M.Sc. Informatics",
        institution: "Institute of Informatics & Communication, DU",
        year: "2016-2019",
      },
      {
        degree: "Intel Edge AI for IoT Nanodegree",
        institution: "Udacity",
        year: "2020",
      },
      {
        degree: "B.Sc. Electronics",
        institution: "Sri Aurobindo College",
        year: "2012-2015",
      },
    ],
    projects: [
      {
        title: "Sharp Token",
        client: "Sharp Innovation Foundation",
        role: "Project Manager",
        environment: "Polygon, Alchemy, Polygonscan",
        description:
          "Sharp Token is the digital fuel for thriving, growth-focused, and purpose-driven communities. Created on a robust and scalable blockchain, powered by AI, our utility token revolutionizes the way communities grow, engage, and create value.",
        link: "SHARP Token",
      },
      {
        title: "Sharp Rewards App",
        client: "Sharp Innovation Foundation",
        role: "Product Owner",
        environment: "Polygon Blockchain, Alchemy, JIRA, Azure boards, Microsoft Planner",
        description:
          "The Sharp Economy represents the first AI-driven growth economy tailored for purpose-oriented communities, brands, and educational institutions. Its primary objective is to foster member growth through innovative models such as Learn2Earn and Spend2Grow.",
        link: "Sharp Economy",
      },
      {
        title: "MAPay Credentialing Application",
        client: "MPayz LLC",
        role: "Technical Lead, DBA",
        environment: ".Net 6, Radzen Blazor, PostgreSQL, Microsoft Azure, Algorand Blockchain",
        description:
          "The MAPay Credentialing app is a secure blockchain-based platform for healthcare providers seeking valid credentials from the Bermuda Health Council (BHC). It stores credentials on the Algorand blockchain using our proprietary algorithm for integrity and immutability.",
        link: "MAPay Credentialing Application",
      },
      {
        title: "MPayz Wallet Application",
        client: "MPayz LLC",
        role: "Technical Lead, Developer",
        environment: "Django, Python 3, PostgreSQL, Microsoft Azure, Algorand Blockchain",
        description:
          'MPayz Wallet is a customized wallet designed specifically for the Algorand standard asset called "MPayz Token." This user-friendly application allows you to effortlessly send, request, and view transaction history for both Algo coin and MPayz Token.',
        link: "MPayz Wallet",
      },
      {
        title: "C# Corner MVP Program",
        client: "C# Corner",
        role: "Program Director",
        environment: "",
        description:
          "C# Corner MVP program is designed to recognize and honor professionals and tech enthusiasts who actively contribute to the community through their valuable contributions, such as writing articles, blogs, answering forum questions, and speaking at conferences and chapter events.",
        link: "",
      },
      {
        title: "Stratis Blockchain Student Hackathon",
        client: "Stratis Blockchain",
        role: "Organizer, Judge",
        environment: "Stratis Blockchain, C#.Net",
        description:
          "Stratis Blockchain Student Hackathon was an exciting and immersive online event spanning over a week. Participants were challenged to develop innovative and functional solutions using Stratis Blockchain SDKs (Unity, Python, C# .Net, Unreal Engine), focusing on various industries.",
        link: "",
      },
    ],
  }
}

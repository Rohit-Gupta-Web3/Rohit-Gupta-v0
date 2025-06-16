// Fetch and process LinkedIn recommendations CSV
async function processRecommendations() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recommendations_Received-FeSMfnbF614dAwioHhNQXp4fLDQIRO.csv",
    )
    const csvText = await response.text()

    console.log("CSV Content:")
    console.log(csvText)

    // Parse CSV manually (simple parser for this specific format)
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    console.log("Headers:", headers)

    const recommendations = []

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        // Handle CSV parsing with quoted fields that may contain commas
        const fields = []
        let currentField = ""
        let inQuotes = false

        for (let j = 0; j < lines[i].length; j++) {
          const char = lines[i][j]

          if (char === '"') {
            inQuotes = !inQuotes
          } else if (char === "," && !inQuotes) {
            fields.push(currentField.trim())
            currentField = ""
          } else {
            currentField += char
          }
        }
        fields.push(currentField.trim()) // Add the last field

        if (fields.length >= 6) {
          const recommendation = {
            firstName: fields[0],
            lastName: fields[1],
            company: fields[2],
            jobTitle: fields[3],
            text: fields[4],
            creationDate: fields[5],
            status: fields[6] || "VISIBLE",
          }

          // Only include visible recommendations
          if (recommendation.status === "VISIBLE" && recommendation.text) {
            recommendations.push(recommendation)
          }
        }
      }
    }

    console.log("Processed Recommendations:", recommendations)
    return recommendations
  } catch (error) {
    console.error("Error processing recommendations:", error)
    return []
  }
}

// Execute the function
processRecommendations()

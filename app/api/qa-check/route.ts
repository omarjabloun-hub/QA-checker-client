import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Get URL from query parameters
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  // Validate URL parameter
  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // Call the real service
    const response = await fetch("https://qualityassurance-analyzer.onrender.com/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error(`Service returned status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error processing QA check:", error)
    return NextResponse.json({ error: "Failed to process QA check" }, { status: 500 })
  }
}


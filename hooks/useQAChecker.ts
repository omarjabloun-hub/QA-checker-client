"use client"

import type React from "react"

import { useState } from "react"
import type { QAFeedbackResponse } from "@/types/qa-feedback"

export function useQAChecker() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<QAFeedbackResponse | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Function to validate URL format
  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString)
      return true
    } catch (e) {
      return false
    }
  }

  // Function to copy element code to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setError(null)
    setFeedback(null)
    setActiveTab("all")
    setSeverityFilter([])

    // Validate URL
    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)")
      return
    }

    // Start loading
    setIsLoading(true)

    try {
      const response = await fetch(`/api/qa-check?url=${encodeURIComponent(url)}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || `Server error: ${response.status}`)
      }

      const data = await response.json()
      setFeedback(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    url,
    setUrl,
    isLoading,
    error,
    feedback,
    activeTab,
    setActiveTab,
    severityFilter,
    setSeverityFilter,
    copiedId,
    handleSubmit,
    copyToClipboard,
  }
}


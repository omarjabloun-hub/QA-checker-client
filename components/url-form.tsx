"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface URLFormProps {
  url: string
  setUrl: (url: string) => void
  isLoading: boolean
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

export function URLForm({ url, setUrl, isLoading, handleSubmit }: URLFormProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Check a webpage for QA issues</CardTitle>
        <CardDescription>
          Enter a URL to analyze for accessibility, HTML validation, UX, and performance issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label="Website URL"
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Check URL"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


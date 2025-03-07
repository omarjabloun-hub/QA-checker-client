"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { FeedbackItem } from "@/types/qa-feedback"
import { AlertCircle, CheckCircle, Copy, Check, ZapIcon } from "lucide-react"

interface IssueListProps {
  issues: FeedbackItem[]
  activeTab: string
  severityFilter: string[]
  copiedId: string | null
  copyToClipboard: (text: string, id: string) => void
}

export function IssueList({ issues, activeTab, severityFilter, copiedId, copyToClipboard }: IssueListProps) {
  // Get icon for issue type
  const getIssueTypeIcon = (type: string) => {
    switch (type) {
      case "accessibility":
        return <span className="text-blue-500">A11y</span>
      case "html":
        return <span className="text-purple-500">HTML</span>
      case "ux":
        return <span className="text-green-500">UX</span>
      case "performance":
        return <ZapIcon className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {activeTab === "all" ? "All Issues" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Issues`}
          {severityFilter.length > 0 && (
            <span className="text-sm font-normal ml-2">(Filtered by: {severityFilter.join(", ")})</span>
          )}
        </CardTitle>
        <CardDescription>{issues.length} issues found</CardDescription>
      </CardHeader>
      <CardContent>
        {issues.length > 0 ? (
          <ul className="space-y-4">
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="border-l-4 pl-4 py-2"
                style={{
                  borderColor:
                    issue.severity === "critical"
                      ? "rgb(239, 68, 68)"
                      : issue.severity === "warning"
                        ? "rgb(234, 179, 8)"
                        : "rgb(59, 130, 246)",
                }}
              >
                <div className="flex items-start gap-2">
                  {issue.severity === "critical" ? (
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  ) : issue.severity === "warning" ? (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="w-full">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{issue.message}</p>
                      <div className="flex items-center gap-1 ml-2">
                        
                        <Badge className="ml-1" variant="outline">
                          {issue.type}
                        </Badge>
                      </div>
                    </div>
                    {issue.element && (
                      <div className="mt-2 mb-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-muted-foreground">Element:</p>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(issue.element!, issue.id)}
                            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                            aria-label="Copy element code to clipboard"
                          >
                            {copiedId === issue.id ? (
                              <>
                                <Check className="h-3 w-3" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                        <div className="relative">
                          <pre className="bg-muted p-2 rounded text-xs overflow-x-auto max-h-24 overflow-y-auto">
                            <code>{issue.element}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                    {issue.line && <p className="text-sm text-muted-foreground mt-1">Line: {issue.line}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No issues found with the current filters</div>
        )}
      </CardContent>
    </Card>
  )
}


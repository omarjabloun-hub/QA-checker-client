import type { FeedbackItem } from "@/types/qa-feedback"

// Get severity count
export function getSeverityCount(
  issues: FeedbackItem[] | undefined,
  severity: "critical" | "warning" | "info",
): number {
  return issues?.filter((issue) => issue.severity === severity).length || 0
}

// Get type count
export function getTypeCount(
  issues: FeedbackItem[] | undefined,
  type: "accessibility" | "html" | "ux" | "performance",
): number {
  return issues?.filter((issue) => issue.type === type).length || 0
}

// Get filtered issues
export function getFilteredIssues(
  issues: FeedbackItem[] | undefined,
  activeTab: string,
  severityFilter: string[],
): FeedbackItem[] {
  if (!issues) return []

  let filtered = issues

  // Filter by type if not "all"
  if (activeTab !== "all") {
    filtered = filtered.filter((issue) => issue.type === activeTab)
  }

  // Filter by severity if any selected
  if (severityFilter.length > 0) {
    filtered = filtered.filter((issue) => severityFilter.includes(issue.severity))
  }

  return filtered
}


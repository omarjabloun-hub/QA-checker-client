// Define the feedback item interface
export interface FeedbackItem {
  id: string
  type: "accessibility" | "html" | "ux" | "performance"
  severity: "critical" | "warning" | "info"
  message: string
  element?: string
  line?: number
}

// QA Feedback Response interface
export interface QAFeedbackResponse {
  url: string
  timestamp?: string
  analysis_time?: number
  issues: FeedbackItem[]
}


import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { QAFeedbackResponse } from "@/types/qa-feedback"
import { getSeverityCount, getTypeCount } from "@/utils/qa-helpers"

interface ResultsSummaryProps {
  feedback: QAFeedbackResponse
}

export function ResultsSummary({ feedback }: ResultsSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>QA Feedback Results</CardTitle>
        <CardDescription>
          Analysis for <span className="font-medium">{feedback.url}</span>
          {feedback.analysis_time && (
            <span className="block text-sm mt-1">
              Analysis completed in {feedback.analysis_time.toFixed(2)} seconds
            </span>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant={getSeverityCount(feedback.issues, "critical") > 0 ? "destructive" : "outline"}>
              {getSeverityCount(feedback.issues, "critical")} Critical
            </Badge>
            <Badge variant={getSeverityCount(feedback.issues, "warning") > 0 ? "default" : "outline"}>
              {getSeverityCount(feedback.issues, "warning")} Warnings
            </Badge>
            <Badge variant="outline">{getSeverityCount(feedback.issues, "info")} Info</Badge>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50">
              {getTypeCount(feedback.issues, "accessibility")} Accessibility
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              {getTypeCount(feedback.issues, "html")} HTML
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              {getTypeCount(feedback.issues, "ux")} UX
            </Badge>
            <Badge variant="outline" className="bg-orange-50">
              {getTypeCount(feedback.issues, "performance")} Performance
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}


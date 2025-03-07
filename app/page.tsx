"use client"

import { URLForm } from "@/components/url-form"
import { ErrorMessage } from "@/components/error-message"
import { ResultsSummary } from "@/components/results-summary"
import { FilterControls } from "@/components/filter-controls"
import { IssueList } from "@/components/issue-list"
import { useQAChecker } from "@/hooks/useQAChecker"
import { getFilteredIssues } from "@/utils/qa-helpers"

export default function QAChecker() {
  const {
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
  } = useQAChecker()

  // Get filtered issues
  const filteredIssues = feedback ? getFilteredIssues(feedback.issues, activeTab, severityFilter) : []

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">QA Feedback Checker</h1>

      {/* URL Input Form */}
      <URLForm url={url} setUrl={setUrl} isLoading={isLoading} handleSubmit={handleSubmit} />

      {/* Error Message */}
      <ErrorMessage error={error} />

      {/* Results Display */}
      {feedback && (
        <div className="space-y-6">
          {/* Results Summary */}
          <ResultsSummary feedback={feedback} />

          {/* Filter Controls */}
          <FilterControls
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            severityFilter={severityFilter}
            setSeverityFilter={setSeverityFilter}
          />

          {/* Issue List */}
          <IssueList
            issues={filteredIssues}
            activeTab={activeTab}
            severityFilter={severityFilter}
            copiedId={copiedId}
            copyToClipboard={copyToClipboard}
          />
        </div>
      )}
    </div>
  )
}


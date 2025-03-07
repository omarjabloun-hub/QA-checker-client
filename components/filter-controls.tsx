"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FilterControlsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  severityFilter: string[]
  setSeverityFilter: (filter: string[]) => void
}

export function FilterControls({ activeTab, setActiveTab, severityFilter, setSeverityFilter }: FilterControlsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Filter by type:</h3>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="ux">UX</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Filter by severity:</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={severityFilter.includes("critical") ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSeverityFilter((prev) =>
                    prev.includes("critical") ? prev.filter((s) => s !== "critical") : [...prev, "critical"],
                  )
                }}
                className={severityFilter.includes("critical") ? "bg-red-500 hover:bg-red-600" : ""}
              >
                Critical
              </Button>
              <Button
                variant={severityFilter.includes("warning") ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSeverityFilter((prev) =>
                    prev.includes("warning") ? prev.filter((s) => s !== "warning") : [...prev, "warning"],
                  )
                }}
                className={severityFilter.includes("warning") ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                Warning
              </Button>
              <Button
                variant={severityFilter.includes("info") ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSeverityFilter((prev) =>
                    prev.includes("info") ? prev.filter((s) => s !== "info") : [...prev, "info"],
                  )
                }}
                className={severityFilter.includes("info") ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                Info
              </Button>
              {severityFilter.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setSeverityFilter([])}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


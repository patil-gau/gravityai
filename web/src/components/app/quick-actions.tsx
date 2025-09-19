import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full justify-start" variant="outline">
          📝 New Journal Entry
        </Button>
        <Button className="w-full justify-start" variant="outline">
          ✅ Add Task
        </Button>
        <Button className="w-full justify-start" variant="outline">
          📅 Schedule Meeting
        </Button>
        <Button className="w-full justify-start" variant="outline">
          📄 Create Document
        </Button>
      </CardContent>
    </Card>
  )
}

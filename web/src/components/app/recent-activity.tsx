import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const activities = [
  { action: 'Created journal entry', time: '2 hours ago', icon: '📝' },
  { action: 'Completed task "Review proposal"', time: '4 hours ago', icon: '✅' },
  { action: 'Scheduled meeting with team', time: '1 day ago', icon: '📅' },
  { action: 'Updated document "Project Plan"', time: '2 days ago', icon: '📄' },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-lg">{activity.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { DashboardStats } from '@/components/app/dashboard-stats'
import { RecentActivity } from '@/components/app/recent-activity'
import { QuickActions } from '@/components/app/quick-actions'

export const metadata = {
  title: 'Dashboard - Gravity AI',
  description: 'Your AI workspace overview',
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's what's happening with your AI workspace.
        </p>
      </div>

      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  )
}

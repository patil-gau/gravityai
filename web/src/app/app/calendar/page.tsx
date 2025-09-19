import { CalendarView, CreateEventButton, CalendarSidebar } from '@/components/app/stubs'

export const metadata = {
  title: 'Calendar - Gravity AI',
  description: 'AI-powered scheduling and time management',
}

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="mt-2 text-gray-600">
            Smart scheduling with AI-driven time optimization and conflict resolution.
          </p>
        </div>
        <CreateEventButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CalendarSidebar />
        <div className="lg:col-span-3">
          <CalendarView />
        </div>
      </div>
    </div>
  )
}

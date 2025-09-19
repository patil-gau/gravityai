// Placeholder components for app sections
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function JournalList() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900">No journals yet</h3>
        <p className="mt-2 text-sm text-gray-600">Create your first AI-powered journal entry.</p>
      </CardContent>
    </Card>
  )
}

export function CreateJournalButton() {
  return <Button>📝 New Journal</Button>
}

export function TodoList() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
        <p className="mt-2 text-sm text-gray-600">No pending tasks. Create a new one to get started.</p>
      </CardContent>
    </Card>
  )
}

export function CreateTodoButton() {
  return <Button>✅ Add Task</Button>
}

export function TodoFilters() {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm">All</Button>
      <Button variant="outline" size="sm">Active</Button>
      <Button variant="outline" size="sm">Completed</Button>
    </div>
  )
}

export function CalendarView() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900">Calendar View</h3>
        <p className="mt-2 text-sm text-gray-600">Smart calendar interface will be implemented here.</p>
      </CardContent>
    </Card>
  )
}

export function CreateEventButton() {
  return <Button>📅 New Event</Button>
}

export function CalendarSidebar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mini Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">Calendar sidebar controls</p>
      </CardContent>
    </Card>
  )
}

export function DocumentGrid() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900">No documents</h3>
        <p className="mt-2 text-sm text-gray-600">Create your first AI-enhanced document.</p>
      </CardContent>
    </Card>
  )
}

export function CreateDocumentButton() {
  return <Button>📄 New Document</Button>
}

export function DocumentFilters() {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm">All</Button>
      <Button variant="outline" size="sm">Recent</Button>
      <Button variant="outline" size="sm">Shared</Button>
    </div>
  )
}

export function SettingsTabs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">Profile</Button>
          <Button variant="ghost" className="w-full justify-start">Preferences</Button>
          <Button variant="ghost" className="w-full justify-start">Security</Button>
          <Button variant="ghost" className="w-full justify-start">Billing</Button>
        </nav>
      </CardContent>
    </Card>
  )
}

export function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">Profile management interface</p>
      </CardContent>
    </Card>
  )
}

export function PreferencesSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">User preferences and customization</p>
      </CardContent>
    </Card>
  )
}

export function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">Password and security settings</p>
      </CardContent>
    </Card>
  )
}

export function BillingSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">Subscription and billing management</p>
      </CardContent>
    </Card>
  )
}

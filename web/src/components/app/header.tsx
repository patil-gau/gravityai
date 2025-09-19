import { Button } from '@/components/ui/button'

export function AppHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-gray-900">Workspace</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            🔔
          </Button>
          <Button variant="ghost" size="sm">
            👤 Demo User
          </Button>
        </div>
      </div>
    </header>
  )
}

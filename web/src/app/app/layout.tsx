import { AuthGate } from '@/components/auth/auth-gate'
import { AppSidebar } from '@/components/app/sidebar'
import { AppHeader } from '@/components/app/header'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGate>
      <div className="flex h-screen bg-gray-100">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto bg-white">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGate>
  )
}

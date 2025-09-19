'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: '📊' },
  { name: 'Journals', href: '/app/journals', icon: '📝' },
  { name: 'Todos', href: '/app/todos', icon: '✅' },
  { name: 'Calendar', href: '/app/calendar', icon: '📅' },
  { name: 'Documents', href: '/app/documents', icon: '📄' },
  { name: 'Settings', href: '/app/settings', icon: '⚙️' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <Link href="/app/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-brand-600">Gravity AI</span>
        </Link>
      </div>
      
      <nav className="px-3 pb-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

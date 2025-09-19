'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Placeholder for Firebase Auth integration
// This will be replaced with actual Firebase Auth logic
function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check - replace with Firebase Auth
    const timer = setTimeout(() => {
      // For demo purposes, always return authenticated
      // In real implementation, check Firebase Auth state
      setUser({ id: 'demo-user', email: 'demo@example.com' })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { user, loading }
}

interface AuthGateProps {
  children: React.ReactNode
}

export function AuthGate({ children }: AuthGateProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

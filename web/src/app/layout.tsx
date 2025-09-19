import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gravity AI',
  description: 'Production-ready AI platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

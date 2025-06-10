'use client'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        <ul>
          <li><Link href="/dashboard">Dashboard Home</Link></li>
          <li><Link href="/dashboard/analytics">Analytics</Link></li>
        </ul>
      </nav>
      <div>{children}</div>
    </section>
  )
}

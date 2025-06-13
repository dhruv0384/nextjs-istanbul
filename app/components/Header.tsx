'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ background: '#eee', padding: '1rem' }}>
      <h1>🌐 Complex Next App</h1>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/dashboard/analytics">Analytics</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}

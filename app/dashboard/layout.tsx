export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        <ul>
          <li><a href="/dashboard">Dashboard Home</a></li>
          <li><a href="/dashboard/analytics">Analytics</a></li>
        </ul>
      </nav>
      <div>{children}</div>
    </section>
  )
}

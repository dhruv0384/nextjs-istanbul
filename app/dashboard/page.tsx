'use client'
export default function DashboardHome() {
  const isAdmin = false; // Unused condition (not triggered)
  
  if (isAdmin) {
    console.log("Admin panel enabled"); // Never runs
  }

  return <h3>📊 Dashboard Overview</h3>
}

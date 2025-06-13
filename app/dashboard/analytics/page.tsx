'use client'
import { useEffect, useState } from 'react'
import { getStats } from '../../lib/fakeApi'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import unusedFn from '../../lib/unused'

export default function AnalyticsPage() {
  const [data, setData] = useState<number | null>(null)

  useEffect(() => {
    getStats().then(setData)
  }, [])

  return (
    <div>
      <h3>📈 Analytics</h3>
      {data === null ? <p>Loading...</p> : <p>Visitors Today: {data}</p>}
    </div>
  )
}

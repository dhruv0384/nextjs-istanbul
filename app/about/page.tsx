'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import dynamic from 'next/dynamic'

// Dynamic import from another file
const DynamicInline = dynamic(() => import('@/app/components/DynamicHello'), {
  ssr: false
})

export default function AboutPage() {
  return (
    <>
      <p>This is a complex app built with Next.js 15 App Router.</p>
      {/* <DynamicInline /> */}
    </>
  )
}

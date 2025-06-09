'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Message sent: ${message}`)
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Your Message:</label><br />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} /><br />
      <button type="submit">Send</button>
    </form>
  )
}

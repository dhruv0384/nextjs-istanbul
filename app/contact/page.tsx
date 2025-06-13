'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Message sent: ${message}`)
    setMessage('')
    setShowModal(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Your Message:</label><br />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} /><br />
        <button type="submit">Send</button>
      </form>

      {showModal && (
        <div style={{
          background: '#ccc',
          padding: '1rem',
          marginTop: '1rem',
          border: '1px solid black'
        }}>
          ✅ Modal: Your message was sent!
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </>
  )
}

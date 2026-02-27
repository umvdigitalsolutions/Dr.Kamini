"use client"
import { useState } from 'react'

export default function ReviewForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Review from ${name || 'Anonymous'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nReview:\n${message}`)
    window.location.href = `mailto:drkaminishakyapt@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="mt-10 bg-white border border-slate-100 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-slate-900">Leave a Review</h3>
      <p className="mt-1 text-sm text-slate-600">Share a short review — it will open your mail client to send to the clinic.</p>

      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email (optional)" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your review..." rows={4} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />

        <div className="flex items-center gap-3">
          <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-md text-sm hover:bg-teal-800">Send Review</button>
          {submitted && <span className="text-sm text-slate-600">Opening mail client…</span>}
        </div>
      </form>
    </div>
  )
}

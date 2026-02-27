"use client"

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please provide name, email and a message.' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ type: 'success', message: data.message || 'Message sent.' })
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.error || 'Submission failed.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status && (
        <div className={`p-3 rounded ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-200 shadow-sm" placeholder="Your full name" />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-200 shadow-sm" placeholder="you@example.com" />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Phone (optional)</span>
        <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-200 shadow-sm" placeholder="+91 9XXXXXXXXX" />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Message</span>
        <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="mt-1 block w-full rounded-md border-slate-200 shadow-sm" placeholder="Tell us about your condition or question"></textarea>
      </label>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-60">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        <button type="button" onClick={() => setForm({ name: '', email: '', phone: '', message: '' })} className="text-sm text-slate-600">Clear</button>
      </div>
    </form>
  )
}

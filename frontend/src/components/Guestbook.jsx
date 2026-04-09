import { useState, useEffect } from 'react'
import { getGuestbook, postGuestbook } from '../services/api'

export default function Guestbook() {
  const [entries, setEntries] = useState([])
  const [form, setForm] = useState({ name: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getGuestbook()
      .then((res) => setEntries(res.data))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    setLoading(true)
    try {
      const res = await postGuestbook(form)
      setEntries([res.data, ...entries])
      setForm({ name: '', message: '' })
      setStatus('Thanks for signing the guestbook!')
      setTimeout(() => setStatus(''), 3000)
    } catch {
      setStatus('Something went wrong. Try again.')
    }
    setLoading(false)
  }

  const timeAgo = (dateStr) => {
    const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <section id="guestbook">
      <div className="container">
        <h2 className="section-title">Guestbook</h2>
        <p className="section-subtitle">
          Leave a message — powered by a real database and REST API built with ASP.NET Core + SQLite.
        </p>
        <div className="guestbook-grid">
          <form className="guestbook-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={50}
              required
            />
            <textarea
              placeholder="Leave a message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              maxLength={500}
              required
            />
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Signing...' : 'Sign Guestbook'}
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
          <div className="guestbook-entries">
            {entries.length === 0 && <p className="guestbook-empty">No entries yet. Be the first!</p>}
            {entries.map((entry) => (
              <div className="guestbook-entry" key={entry.id}>
                <div className="entry-header">
                  <strong>{entry.name}</strong>
                  <span>{timeAgo(entry.createdAt)}</span>
                </div>
                <p>{entry.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { postContact } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await postContact(form)
      setStatus('Message sent! I will get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus(''), 5000)
    } catch {
      setStatus('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p>I am actively looking for opportunities in software development, DevOps, data analytics, and IT. Let us connect.</p>
            <div className="contact-items">
              <div className="contact-item">
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:jonathan@yepiz.work">jonathan@yepiz.work</a>
              </div>
              <div className="contact-item">
                <i className="fa-brands fa-linkedin"></i>
                <a href="https://www.linkedin.com/in/jonathanyepiz/" target="_blank" rel="noreferrer">linkedin.com/in/jonathanyepiz</a>
              </div>
              <div className="contact-item">
                <i className="fa-brands fa-github"></i>
                <a href="https://github.com/YepizTechJonathan" target="_blank" rel="noreferrer">github.com/YepizTechJonathan</a>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>California, USA</span>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Your Name" value={form.name} onChange={update('name')} required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" value={form.email} onChange={update('email')} required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" value={form.subject} onChange={update('subject')} required />
            </div>
            <div className="form-group">
              <textarea rows={5} placeholder="Your Message" value={form.message} onChange={update('message')} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

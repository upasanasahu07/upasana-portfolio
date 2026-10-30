import { useState } from 'react'
import { profile } from '../data'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked: mailto link still works */ }
  }
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="contact reveal">
          <div className="contact-dots" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
          <div className="kicker light">07 · Contact</div>
          <h2>Let's keep people on their feet.</h2>
          <p>Open to postdoctoral positions, research collaborations, and translational roles in medtech, clinical research and digital health.</p>
          <div className="contact-row">
            <a className="btn light" href={`mailto:${profile.email}`}>{profile.email}</a>
            <button className="btn ghost-light" onClick={copy}>{copied ? 'Copied ✓' : 'Copy email'}</button>
          </div>
          <div className="contact-links">
            <a href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <span>Chicago, IL</span>
          </div>
        </div>
        <footer>© {new Date().getFullYear()} {profile.name} · {profile.place}</footer>
      </div>
    </section>
  )
}

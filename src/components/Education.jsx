import { useState } from 'react'
import { education, dissertation, coursework } from '../data'

export default function Education() {
  const [hl, setHl] = useState(null)
  const total = coursework.reduce((a, c) => a + c.credits, 0)
  return (
    <section id="education" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="kicker">02 · Education</div>
          <h2>Three degrees, one direction</h2>
          <p>Each degree went one level deeper — from treating movement, to understanding it, to measuring it.</p>
        </div>

        <div className="edu-steps">
          {education.map((e, i) => (
            <div key={e.degree} className="edu reveal" style={{ '--i': i }}>
              <div className="edu-bar"><span style={{ height: `${40 + i * 30}%` }} /></div>
              <small>{e.years}</small>
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
              <em>{e.badge}</em>
            </div>
          ))}
        </div>

        <div className="edu-lower">
          <div className="card diss reveal">
            <div className="kicker">Dissertation</div>
            <h3>{dissertation.title}</h3>
            <p className="status"><span className="pulse" />{dissertation.status}</p>
            <p className="muted"><b>{dissertation.chair}</b></p>
            <p className="muted">Committee: {dissertation.committee.join(' · ')}</p>
          </div>

          <div className="card reveal">
            <div className="kicker">Doctoral coursework · {total} credits</div>
            <h3>Where the credits went</h3>
            <div className="stack" onMouseLeave={() => setHl(null)}>
              {coursework.map((c) => (
                <div key={c.area} className={hl && hl !== c.area ? 'dim' : ''} onMouseEnter={() => setHl(c.area)}
                  style={{ flex: c.credits, background: c.color }}><span>{c.credits}</span></div>
              ))}
            </div>
            <ul className="stack-legend">
              {coursework.map((c) => (
                <li key={c.area} className={hl === c.area ? 'on' : ''} onMouseEnter={() => setHl(c.area)} onMouseLeave={() => setHl(null)}>
                  <i style={{ background: c.color }} /><b>{c.area}</b><span>{c.courses}</span>
                </li>
              ))}
            </ul>
            <p className="insight">Insight: statistics is her biggest block — {Math.round((12 / total) * 100)}% of listed credits. She's a clinician who can also run the numbers.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useLayoutEffect, useRef, useState } from 'react'
import { projects, skills, teaching, certifications, populations, clinicalSkills, clinicalJobs, personal } from '../data'
import Icon from './Icon'

const tabs = [
  { id: 'sci', label: 'Scientist & teacher', sub: 'What she builds in the lab' },
  { id: 'clin', label: 'Clinician', sub: '7+ years with patients' },
  { id: 'me', label: 'Person', sub: 'Outside the lab' },
]

export default function Sides() {
  const [tab, setTab] = useState('sci')
  return (
    <section id="sides" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="kicker">01 · Three sides</div>
          <h2>One person, three lenses</h2>
          <p>Her research makes sense because of her clinical years — and both make sense because of who she is.</p>
        </div>
        <div className="tabs reveal" role="tablist">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>
              <b>{t.label}</b><span>{t.sub}</span>
            </button>
          ))}
        </div>
        <div className="tab-panel" key={tab}>
          {tab === 'sci' && <Scientist />}
          {tab === 'clin' && <Clinician />}
          {tab === 'me' && <Person />}
        </div>
      </div>
    </section>
  )
}

function Scientist() {
  const [hover, setHover] = useState(null)
  const [lines, setLines] = useState([])
  const box = useRef(null), colRef = useRef(null), chipRefs = useRef({}), projRefs = useRef({})
  const active = hover ? skills.find((s) => s.name === hover) : null

  useLayoutEffect(() => {
    if (!active || !box.current || window.innerWidth < 860) { setLines([]); return }
    const b = box.current.getBoundingClientRect(), c = chipRefs.current[active.name].getBoundingClientRect()
    setLines(active.uses.map((id) => {
      const r = projRefs.current[id].getBoundingClientRect()
      const x1 = colRef.current.getBoundingClientRect().right - b.left + 8, y1 = c.top + c.height / 2 - b.top, x2 = r.left - b.left, y2 = r.top + r.height / 2 - b.top
      const mx = (x1 + x2) / 2
      return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`
    }))
  }, [active])

  const groups = [...new Set(skills.map((s) => s.group))]
  return (
    <>
      <div className="skillmap" ref={box}>
        <svg className="skill-lines">{lines.map((d, i) => <path key={i} d={d} />)}{lines[0] && <circle cx={lines[0].split(" ")[0].slice(1)} cy={lines[0].split(" ")[1]} r="5" />}</svg>
        <div className="skill-col" ref={colRef}>
          <p className="hint">Hover or tap a skill → see the projects where she used it</p>
          {groups.map((g) => (
            <div key={g} className="skill-group">
              <small>{g}</small>
              <div className="chips">
                {skills.filter((s) => s.group === g).map((s) => (
                  <button key={s.name} ref={(el) => (chipRefs.current[s.name] = el)}
                    className={'chip' + (hover === s.name ? ' on' : '')}
                    onMouseEnter={() => setHover(s.name)} onMouseLeave={() => setHover(null)} onClick={() => setHover(hover === s.name ? null : s.name)}>
                    {s.name}<sup>{s.uses.length}</sup>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="proj-col">
          {projects.map((p) => {
            const lit = active?.uses.includes(p.id)
            return (
              <div key={p.id} ref={(el) => (projRefs.current[p.id] = el)} className={'proj' + (active ? (lit ? ' lit' : ' dim') : '')}>
                <small>{p.short}</small><b>{p.title}</b><span>{p.note}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="certs">
        <h3>Research certifications</h3>
        <div className="cert-row">
          {certifications.map((c) => <div key={c.name} className="cert"><small>{c.year}</small><span>{c.name}</span></div>)}
        </div>
      </div>
      <div className="teach">
        <h3>Teaching & mentoring</h3>
        <div className="teach-row">
          {teaching.map((t) => <div key={t.k} className="teach-card"><b>{t.k}</b><span>{t.t}</span></div>)}
        </div>
      </div>
    </>
  )
}

function Clinician() {
  return (
    <div className="clin">
      <div className="clin-left">
        <h3>Who she has treated</h3>
        <div className="bubbles">
          {populations.map((p, i) => <span key={p.name} className="bubble" style={{ animationDelay: `${(i % 5) * -1.1}s` }}>{p.name}</span>)}
        </div>
        <h3 style={{ marginTop: 28 }}>Hands-on methods</h3>
        <div className="chips">{clinicalSkills.map((s) => <span key={s} className="chip static">{s}</span>)}</div>
      </div>
      <div className="clin-right">
        <h3>Clinical journey · India</h3>
        <ol className="cjobs">
          {clinicalJobs.map((j) => (
            <li key={j.role}><span className="cy">{j.y}</span><div><b>{j.role}</b><span>{j.where}</span></div><em>{j.tag}</em></li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function Person() {
  const hello = [['English', 'Hello'], ['Hindi', 'नमस्ते'], ['Marathi', 'नमस्कार'], ['Kannada', 'ನಮಸ್ಕಾರ']]
  return (
    <div className="person">
      <div className="route card">
        <h3>Mangalore → Chicago</h3>
        <svg viewBox="0 0 600 150" className="route-svg" preserveAspectRatio="none">
          <path id="routePath" d="M40 110 C 140 60, 200 120, 300 90 S 470 20, 560 60" />
          <circle r="7" className="traveller"><animateMotion dur="7s" repeatCount="indefinite"><mpath href="#routePath" /></animateMotion></circle>
        </svg>
        <div className="cities">
          {personal.route.map((c) => <div key={c.city}><b>{c.city}</b><span>{c.what}</span></div>)}
        </div>
      </div>
      <div className="card">
        <h3>Speaks 4 languages</h3>
        <div className="hello">{hello.map(([l, w]) => <div key={l}><b>{w}</b><span>{l}</span></div>)}</div>
      </div>
      <div className="card">
        <h3>Loves</h3>
        <div className="loves">{personal.loves.map((l) => <div key={l.t}><Icon name={l.icon} /><span>{l.t}</span></div>)}</div>
      </div>
      <div className="card">
        <h3>Certified instructor</h3>
        <div className="chips">{personal.instructor.map((s) => <span key={s} className="chip static">{s}</span>)}</div>
      </div>
      <div className="card wide">
        <h3>Gives back</h3>
        <div className="chips">{personal.volunteering.map((s) => <span key={s} className="chip static warm">{s}</span>)}</div>
      </div>
    </div>
  )
}

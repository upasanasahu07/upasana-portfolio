import { useEffect, useMemo, useRef, useState } from 'react'
import { publications, presentations, themes, awards } from '../data'
import { prefersReducedMotion } from '../walker'

const ME = 'Sahu U'

export default function Research() {
  const [filter, setFilter] = useState('all')
  const facts = useMemo(() => {
    const withBhatt = publications.filter((p) => p.authors.includes('Bhatt T')).length
    const csm = presentations.filter((p) => p.venue === 'CSM').length
    const coauthors = new Set(publications.flatMap((p) => p.authors)).size - 1
    const y25 = awards.filter((a) => a.year === 2025).length
    return [
      { big: `${withBhatt}/${publications.length}`, t: 'papers co-written with her advisor, Dr. Tanvi Bhatt — a long, steady partnership.' },
      { big: `${csm}/${presentations.length}`, t: 'listed presentations were at CSM — the APTA Combined Sections Meeting is her home stage.' },
      { big: coauthors, t: 'different co-authors across 6 papers — she works in teams, across labs and countries.' },
      { big: y25, t: 'awards in 2025 alone — her busiest, most recognized year so far.' },
    ]
  }, [])

  const shown = publications.filter((p) => filter === 'all' || p.theme === filter)
  return (
    <section id="research" className="section dark">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="kicker">03 · Research, by the data</div>
          <h2>What her CV says when you treat it like a dataset</h2>
          <p>Every chart below is drawn from her real publication, presentation and award records.</p>
        </div>

        <div className="facts">
          {facts.map((f, i) => <div key={i} className="fact reveal" style={{ '--i': i }}><b>{f.big}</b><span>{f.t}</span></div>)}
        </div>

        <div className="viz-grid">
          <div className="card dark-card reveal"><h3>Output over time</h3><p className="muted">Papers and conference presentations by year. Hover a mark.</p><Timeline /></div>
          <div className="card dark-card reveal"><h3>Co-author network</h3><p className="muted">Each dot is a co-author. Closer to her = more papers together. Hover a name to see who they wrote with.</p><Network /></div>
        </div>

        <div className="pub-head reveal">
          <h3>Peer-reviewed publications</h3>
          <div className="filters">
            <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All <sup>{publications.length}</sup></button>
            {Object.entries(themes).map(([k, v]) => (
              <button key={k} className={filter === k ? 'on' : ''} onClick={() => setFilter(k)}>
                <i style={{ background: v.color }} />{v.label} <sup>{publications.filter((p) => p.theme === k).length}</sup>
              </button>
            ))}
          </div>
        </div>
        <div className="pubs">
          {shown.map((p) => (
            <article key={p.title} className="pub">
              <div className="pub-year">{p.year}</div>
              <div>
                <div className="pub-meta">
                  <i style={{ background: themes[p.theme].color }} />{p.journal}
                  {p.first && <span className="badge">First author</span>}
                  {p.status && <span className="badge soft">{p.status}</span>}
                </div>
                <h4>{p.title}</h4>
                <p className="authors">{p.authors.map((a, i) => <span key={a}>{a === ME ? <b>{a}</b> : a}{i < p.authors.length - 1 ? ', ' : ''}</span>)}</p>
              </div>
              {p.doi ? <a className="pub-link" href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">Read ↗</a> : <span className="pub-link off">—</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  const [tip, setTip] = useState(null)
  const years = Array.from({ length: 10 }, (_, i) => 2017 + i)
  const W = 560, H = 250, x0 = 30, x1 = W - 16, base = 200
  const X = (y) => x0 + ((y - 2017) / 9) * (x1 - x0)
  const items = []
  years.forEach((y) => {
    let k = 0
    publications.filter((p) => p.year === y).forEach((p) => items.push({ y, k: k++, kind: 'paper', main: p.first, title: p.title, venue: p.journal }))
    presentations.filter((p) => p.year === y).forEach((p) => items.push({ y, k: k++, kind: 'talk', main: p.primary, title: p.title, venue: p.venue }))
  })
  return (
    <div className="tl-viz">
      <svg viewBox={`0 0 ${W} ${H}`}>
        <rect x={X(2017) - 10} y={20} width={X(2020.5) - X(2017) + 10} height={base - 20} className="band" />
        <text x={X(2018.75)} y={40} className="band-label" textAnchor="middle">Full-time clinician</text>
        <line x1={X(2021) - 12} x2={X(2021) - 12} y1={20} y2={base} className="phd-line" />
        <text x={X(2021) - 6} y={34} className="band-label">PhD starts →</text>
        <line x1={x0 - 10} x2={x1} y1={base + 6} y2={base + 6} className="axis" />
        {years.map((y) => <text key={y} x={X(y)} y={base + 26} textAnchor="middle" className="tick">{String(y).slice(2).padStart(3, "'")}</text>)}
        {items.map((it, i) => {
          const cx = X(it.y), cy = base - 10 - it.k * 22
          const cls = `${it.kind} ${it.main ? 'main' : ''}`
          const ev = { onMouseEnter: () => setTip({ ...it, cx, cy }), onMouseLeave: () => setTip(null), onClick: () => setTip({ ...it, cx, cy }) }
          return it.kind === 'paper'
            ? <rect key={i} x={cx - 8} y={cy - 8} width={16} height={16} rx={3} className={cls} style={{ animationDelay: `${i * 60}ms` }} {...ev} />
            : <circle key={i} cx={cx} cy={cy} r={8} className={cls} style={{ animationDelay: `${i * 60}ms` }} {...ev} />
        })}
      </svg>
      <div className="tl-legend"><span><i className="sq" />Paper</span><span><i className="ci" />Presentation</span><span><i className="ci main" />Filled = she led it</span></div>
      {tip && (
        <div className="tip" style={{ left: `${(tip.cx / W) * 100}%`, top: `${(tip.cy / H) * 100}%` }}>
          <small>{tip.y} · {tip.venue}</small>{tip.title}
        </div>
      )}
    </div>
  )
}

function Network() {
  const svgRef = useRef(null)
  const [hover, setHover] = useState(null)
  // Radial layout: closer to the centre = more papers together. Ordered by first shared paper so teams sit side by side.
  const { nodes, links } = useMemo(() => {
    const count = {}, order = [], pair = {}
    ;[...publications].reverse().forEach((p) => p.authors.forEach((a) => { if (a !== ME && !count[a]) order.push(a); count[a] = (count[a] || 0) + 1 }))
    publications.forEach((p) => p.authors.forEach((a, i) => p.authors.slice(i + 1).forEach((b) => { const k = [a, b].sort().join('|'); pair[k] = (pair[k] || 0) + 1 })))
    const ring = (n) => (n >= 4 ? 62 : n >= 2 ? 118 : 172)
    const nodes = order.map((id, i) => {
      const ang = (i / order.length) * Math.PI * 2 - Math.PI / 2, n = count[id]
      return { id, n, ang, x: Math.cos(ang) * ring(n) * 1.3, y: Math.sin(ang) * ring(n) * 0.62 }
    })
    const links = Object.entries(pair).map(([k, w]) => { const [a, b] = k.split('|'); return { a, b, w } })
    return { nodes, links }
  }, [])
  const pos = (id) => (id === ME ? { x: 0, y: 0 } : nodes.find((n) => n.id === id))

  useEffect(() => {
    if (prefersReducedMotion()) return
    const g = svgRef.current.querySelectorAll('g.node:not(.me)')
    let raf
    const tick = (t) => {
      nodes.forEach((n, i) => g[i].setAttribute('transform', `translate(${n.x + Math.sin(t / 1300 + i) * 4},${n.y + Math.cos(t / 1100 + i * 2) * 3})`))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [nodes])

  const shown = links.filter((l) => (hover ? l.a === hover || l.b === hover : l.a === ME || l.b === ME))
  return (
    <svg ref={svgRef} viewBox="-290 -135 580 270" className="net">
      {[62, 118, 172].map((r) => <ellipse key={r} rx={r * 1.3} ry={r * 0.62} className="ring" />)}
      {shown.map((l, i) => { const a = pos(l.a), b = pos(l.b); return <line key={l.a + l.b} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={'link' + (hover ? ' on' : '')} strokeWidth={0.6 + l.w * 0.6} /> })}
      {nodes.map((n) => {
        const c = n.n >= 4 ? 0 : Math.cos(n.ang), anchor = c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle'
        const r = 4 + n.n * 1.8, dx = anchor === 'start' ? r + 5 : anchor === 'end' ? -(r + 5) : 0, dy = anchor === 'middle' ? (Math.sin(n.ang) > 0 && n.n < 4 ? r + 13 : -(r + 6)) : 4
        const lit = !hover || hover === n.id || links.some((l) => (l.a === hover && l.b === n.id) || (l.b === hover && l.a === n.id))
        return (
          <g key={n.id} className={'node' + (lit ? '' : ' off') + (hover === n.id ? ' on' : '')} transform={`translate(${n.x},${n.y})`}
            onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}>
            <circle r={r} />
            <text x={dx} y={dy} textAnchor={anchor}>{n.id}{n.n > 1 ? ` · ${n.n}` : ''}</text>
          </g>
        )
      })}
      <g className="node me"><circle r={17} /><text y={34} textAnchor="middle">Upasana</text></g>
    </svg>
  )
}

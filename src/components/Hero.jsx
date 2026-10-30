import { useEffect, useRef, useState } from 'react'
import { pose, tripEnvelope, fitCanvas, prefersReducedMotion } from '../walker'
import { profile, heroStats } from '../data'
import CountUp from './CountUp'

const TEAL = '#3CC4B4', CORAL = '#F08A5D'

export default function Hero() {
  const canvasRef = useRef(null)
  const traceRef = useRef(null)
  const uiRef = useRef(null)
  const trip = useRef({ at: -99, auto: 4.5 })
  const [skeleton, setSkeleton] = useState(true)
  const skelRef = useRef(true)
  const [tripping, setTripping] = useState(false)
  skelRef.current = skeleton

  const triggerTrip = () => { trip.current.at = performance.now() / 1000; trip.current.auto = 1e9 }

  useEffect(() => {
    const canvas = canvasRef.current, trace = traceRef.current
    const still = prefersReducedMotion()
    const dust = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.012, vy: (Math.random() - 0.5) * 0.012 }))
    const hist = []
    let phase = 0, last = performance.now() / 1000, belt = 0, raf, wasTripping = false
    const start = last

    const frame = () => {
      const now = performance.now() / 1000, dt = Math.min(0.05, now - last); last = now
      if (now - start > trip.current.auto && trip.current.at < start) trip.current.at = now
      const p = tripEnvelope(now - trip.current.at)
      if ((p > 0.02) !== wasTripping) { wasTripping = p > 0.02; setTripping(wasTripping) }
      if (!still) { phase += dt * 5.2 * (1 - 0.55 * p); belt += dt * 120 }

      const { ctx, w, h } = fitCanvas(canvas)
      ctx.clearRect(0, 0, w, h)

      // constellation background
      ctx.lineWidth = 1
      dust.forEach((d) => {
        if (!still) { d.x = (d.x + d.vx * dt + 1) % 1; d.y = (d.y + d.vy * dt + 1) % 1 }
      })
      for (let i = 0; i < dust.length; i++) {
        const a = dust[i], ax = a.x * w, ay = a.y * h
        for (let j = i + 1; j < dust.length; j++) {
          const b = dust[j], dx = ax - b.x * w, dy = ay - b.y * h, dd = dx * dx + dy * dy
          if (dd < 110 * 110) { ctx.strokeStyle = `rgba(60,196,180,${0.12 * (1 - Math.sqrt(dd) / 110)})`; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(b.x * w, b.y * h); ctx.stroke() }
        }
        ctx.fillStyle = 'rgba(160,220,212,.35)'; ctx.beginPath(); ctx.arc(ax, ay, 1.4, 0, 7); ctx.fill()
      }

      // treadmill
      const wide = w > 980
      const H = wide ? Math.min(h * 0.46, 360) : 240
      const ground = wide ? h - 150 : uiRef.current.getBoundingClientRect().top - canvas.getBoundingClientRect().top - 44
      const cx = w * (wide ? 0.6 : 0.5)
      const bx0 = cx - H * 0.75, bx1 = cx + H * 0.75
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(bx0, ground + 3); ctx.lineTo(bx1, ground + 3); ctx.stroke()
      ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 2
      for (let x = bx1 - (belt % 24); x > bx0; x -= 24) { ctx.beginPath(); ctx.moveTo(x, ground + 8); ctx.lineTo(x - 10, ground + 8); ctx.stroke() }
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillText('ACTIVESTEP TREADMILL', bx0, ground + 26)

      const P = pose(phase, p, cx, ground, H)
      const col = (a) => p > 0.05 ? `rgba(240,138,93,${a})` : `rgba(60,196,180,${a})`

      // capture volume corners
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1.2
      const vx0 = cx - H * 0.55, vx1 = cx + H * 0.7, vy0 = ground - H * 1.18, vy1 = ground + 12
      ;[[vx0, vy0, 1, 1], [vx1, vy0, -1, 1], [vx0, vy1, 1, -1], [vx1, vy1, -1, -1]].forEach(([x, y, sx, sy]) => {
        ctx.beginPath(); ctx.moveTo(x, y + 14 * sy); ctx.lineTo(x, y); ctx.lineTo(x + 14 * sx, y); ctx.stroke()
      })

      if (skelRef.current) {
        P.bones.forEach(([a, b, d]) => {
          ctx.strokeStyle = col(d ? 0.18 : 0.38); ctx.lineWidth = d ? 2 : 2.5
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
        })
      }
      P.markers.forEach((m) => {
        const r = m.id === 'HEAD' ? 6 : 4
        ctx.shadowBlur = 14; ctx.shadowColor = p > 0.05 ? CORAL : TEAL
        ctx.fillStyle = m.d ? col(0.55) : '#fff'
        ctx.beginPath(); ctx.arc(m.pt[0], m.pt[1], r, 0, 7); ctx.fill()
        ctx.shadowBlur = 0
      })
      ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '9.5px "JetBrains Mono", monospace'
      ;['HEAD', 'C7', 'L_KNE', 'L_ANK', 'L_WRI'].forEach((id) => {
        const m = P.markers.find((k) => k.id === id); ctx.fillText(id, m.pt[0] + 9, m.pt[1] - 6)
      })
      if (p > 0.05) {
        ctx.fillStyle = `rgba(240,138,93,${p})`; ctx.font = '600 12px "JetBrains Mono", monospace'
        ctx.fillText('▲ PERTURBATION', cx - H * 0.55, vy0 - 10)
      }

      // live kinematic trace
      hist.push({ t: now, trunk: P.angles.trunk, knee: P.angles.knee, p })
      while (hist.length && now - hist[0].t > 5) hist.shift()
      const T = fitCanvas(trace)
      T.ctx.clearRect(0, 0, T.w, T.h)
      T.ctx.strokeStyle = 'rgba(255,255,255,.08)'; T.ctx.lineWidth = 1
      for (let i = 1; i < 4; i++) { T.ctx.beginPath(); T.ctx.moveTo(0, (T.h * i) / 4); T.ctx.lineTo(T.w, (T.h * i) / 4); T.ctx.stroke() }
      const X = (t) => T.w - ((now - t) / 5) * T.w
      hist.forEach((s) => { if (s.p > 0.05) { T.ctx.fillStyle = `rgba(240,138,93,${0.06 * s.p})`; T.ctx.fillRect(X(s.t), 0, 3, T.h) } })
      const line = (key, color, scale, off) => {
        T.ctx.strokeStyle = color; T.ctx.lineWidth = 1.8; T.ctx.beginPath()
        hist.forEach((s, i) => { const y = T.h - off - s[key] * scale; i ? T.ctx.lineTo(X(s.t), y) : T.ctx.moveTo(X(s.t), y) })
        T.ctx.stroke()
      }
      line('knee', TEAL, T.h * 0.42, T.h * 0.12)
      line('trunk', CORAL, T.h * 0.9, T.h * 0.08)

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <header className="hero" id="home">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-copy reveal">
          <div className="mono-tag"><span className="dot" />{profile.role}</div>
          <h1>Every fall begins in a <em>split second</em>. I study that second.</h1>
          <p className="lead">I'm Upasana — a neuro physiotherapist turned scientist. At UIC's {profile.lab} I use motion capture, force plates and perturbation treadmills to understand how people recover from slips and trips, so fewer older adults fall.</p>
          <div className="cta">
            <a className="btn light" href="#research">See the research</a>
            <a className="btn ghost-light" href="#contact">Get in touch</a>
          </div>
        </div>

        <div className="mocap-ui" ref={uiRef}>
          <div className="mocap-top">
            <span>MOTION CAPTURE · SIMULATED</span>
            <span className={tripping ? 'rec trip' : 'rec'}><i />{tripping ? 'TRIP' : 'WALKING'}</span>
          </div>
          <div className="mocap-controls">
            <button className="btn trip-btn" onClick={triggerTrip}>Trip the walker ⚡</button>
            <label className="switch"><input type="checkbox" checked={skeleton} onChange={(e) => setSkeleton(e.target.checked)} /><span />Skeleton</label>
          </div>
          <div className="trace">
            <div className="trace-legend"><span style={{ color: CORAL }}>— trunk angle</span><span style={{ color: TEAL }}>— knee flexion</span><span>last 5 s</span></div>
            <canvas ref={traceRef} />
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="hero-stats">
          {heroStats.map((s) => (
            <div key={s.label}><b><CountUp to={s.n} />{s.suffix}</b><span>{s.label}</span></div>
          ))}
        </div>
      </div>
    </header>
  )
}

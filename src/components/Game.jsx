import { useEffect, useRef, useState } from 'react'
import { pose, tripEnvelope, fitCanvas } from '../walker'

const TRIALS = 3
const avg = (a) => (a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : null)

export default function Game() {
  const canvasRef = useRef(null)
  const g = useRef({ state: 'idle', tripAt: Infinity })
  const [state, setState] = useState('idle')
  const [mode, setMode] = useState('single')
  const [last, setLast] = useState(null)
  const [res, setRes] = useState({ single: [], dual: [] })
  const [startNum, setStartNum] = useState(300)

  const go = (s) => { g.current.state = s; setState(s) }

  const act = () => {
    const now = performance.now() / 1000, s = g.current.state
    if (s === 'waiting') { g.current.tripAt = Infinity; go('early'); return }
    if (s === 'tripped') {
      const rt = Math.round((now - g.current.tripAt) * 1000)
      setLast(rt); setRes((r) => ({ ...r, [mode]: [...r[mode], rt].slice(-TRIALS) })); go('result'); return
    }
    if (res[mode].length >= TRIALS && s === 'result') return
    setStartNum(200 + Math.floor(Math.random() * 300))
    g.current.tripAt = now + 1.8 + Math.random() * 2.8
    go('waiting')
  }
  const actRef = useRef(act); actRef.current = act

  useEffect(() => {
    const c = canvasRef.current
    let raf, phase = 0, prev = performance.now() / 1000, belt = 0
    const loop = () => {
      const now = performance.now() / 1000, dt = Math.min(0.05, now - prev); prev = now
      if (g.current.state === 'waiting' && now >= g.current.tripAt) go('tripped')
      if (g.current.state === 'tripped' && now - g.current.tripAt > 2) { g.current.tripAt = Infinity; go('missed') }
      const p = tripEnvelope(now - g.current.tripAt)
      phase += dt * 5 * (1 - 0.5 * p); belt += dt * 110
      const { ctx, w, h } = fitCanvas(c)
      ctx.clearRect(0, 0, w, h)
      const H = Math.min(h * 0.7, 260), ground = h * 0.86, cx = w / 2
      ctx.strokeStyle = '#D8D2C4'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(cx - H * 0.8, ground + 3); ctx.lineTo(cx + H * 0.8, ground + 3); ctx.stroke()
      for (let x = cx + H * 0.8 - (belt % 22); x > cx - H * 0.8; x -= 22) { ctx.beginPath(); ctx.moveTo(x, ground + 9); ctx.lineTo(x - 8, ground + 9); ctx.stroke() }
      const P = pose(phase, p, cx, ground, H)
      const col = p > 0.05 ? '224,122,79' : '31,111,107'
      P.bones.forEach(([a, b, d]) => { ctx.strokeStyle = `rgba(${col},${d ? 0.25 : 0.55})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke() })
      P.markers.forEach((m) => { ctx.fillStyle = m.d ? `rgba(${col},.45)` : `rgb(${col})`; ctx.beginPath(); ctx.arc(m.pt[0], m.pt[1], m.id === 'HEAD' ? 7 : 4, 0, 7); ctx.fill() })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    const key = (e) => { if (e.code === 'Space' && document.activeElement === c.parentElement) { e.preventDefault(); actRef.current() } }
    window.addEventListener('keydown', key)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', key) }
  }, [])

  const switchMode = (m) => { setMode(m); g.current.tripAt = Infinity; go('idle'); setLast(null) }
  const reset = () => { setRes({ single: [], dual: [] }); setMode('single'); g.current.tripAt = Infinity; go('idle'); setLast(null) }
  const done = res[mode].length >= TRIALS
  const sA = avg(res.single), dA = avg(res.dual)

  const msg = {
    idle: done ? 'Round complete.' : 'Tap here (or press Space) to start walking.',
    waiting: 'Watch the walker… tap the moment they trip!',
    tripped: 'NOW!',
    early: 'Too early! The trip hadn’t happened yet. Tap to retry.',
    missed: 'Missed it. Tap to try again.',
    result: done ? `${last} ms — round complete.` : `${last} ms. Tap for the next trial.`,
  }[state]

  return (
    <section id="play" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="kicker">06 · Try it yourself</div>
          <h2>Can you catch the trip?</h2>
          <p>A two-minute version of the experiments she runs. Do it once normally, then again while counting backwards — and see what happens to your reaction time.</p>
        </div>
        <div className="game reveal">
          <div className={'stage ' + state} tabIndex={0} onPointerDown={act} role="button" aria-label="Reaction game area">
            <canvas ref={canvasRef} />
            <div className="stage-top">
              <span className="pill">{mode === 'single' ? 'Round 1 · single task' : 'Round 2 · dual task'}</span>
              <span className="pill">Trial {Math.min(res[mode].length + (state === 'waiting' || state === 'tripped' ? 1 : 0), TRIALS)}/{TRIALS}</span>
            </div>
            {mode === 'dual' && (state === 'waiting' || state === 'tripped') && (
              <div className="dual-prompt">Count backwards by 7, out loud, from <b>{startNum}</b></div>
            )}
            <div className="stage-msg">{msg}</div>
          </div>

          <div className="game-side">
            <div className="modes">
              <button className={mode === 'single' ? 'on' : ''} onClick={() => switchMode('single')}>1 · Single task</button>
              <button className={mode === 'dual' ? 'on' : ''} onClick={() => switchMode('dual')} disabled={res.single.length < TRIALS}>2 · Dual task {res.single.length < TRIALS && '🔒'}</button>
            </div>
            <Bars label="Single task" values={res.single} a={sA} color="var(--teal)" />
            <Bars label="Dual task" values={res.dual} a={dA} color="var(--coral)" />
            {sA && dA ? (
              <div className="cost">
                <b>{dA - sA > 0 ? '+' : ''}{dA - sA} ms</b>
                <span>{dA > sA ? 'Your dual-task cost. Thinking slowed your reaction — the same effect she studies in people with stroke, MS and MCI.' : 'No cost this time — impressive! In people with neurological conditions, a second task usually slows balance responses.'}</span>
              </div>
            ) : (
              <p className="muted small">{res.single.length < TRIALS ? 'Finish 3 single-task trials to unlock round 2.' : 'Now do 3 trials while counting backwards out loud.'}</p>
            )}
            <button className="link-btn" onClick={reset}>Reset</button>
            <p className="muted small">Real trips need a recovery step that is automatic, not a button press. This game just shows how attention changes reaction — the idea behind her dual-task meta-analysis (Arch PM&R, 2024).</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Bars({ label, values, a, color }) {
  const max = 1000
  return (
    <div className="bars">
      <div className="bars-head"><span>{label}</span><b>{a ? `${a} ms avg` : '—'}</b></div>
      {Array.from({ length: TRIALS }, (_, i) => (
        <div key={i} className="bar-row"><div className="bar" style={{ width: values[i] ? `${Math.min(100, (values[i] / max) * 100)}%` : 0, background: color }} /><span>{values[i] ? `${values[i]}` : ''}</span></div>
      ))}
    </div>
  )
}

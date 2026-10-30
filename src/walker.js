// Procedural sagittal-plane gait on a treadmill, with an optional "trip" perturbation.
// Returns marker positions the way a motion-capture system would see them.

const seg = { thigh: 0.245, shank: 0.246, foot: 0.11, trunk: 0.30, neck: 0.075, upper: 0.18, fore: 0.15 }

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

// 0 → 1 → 0 envelope for a trip that started `t` seconds ago
export function tripEnvelope(t) {
  if (t < 0 || t > 1.8) return 0
  return smooth(0, 0.22, t) * (1 - smooth(0.7, 1.8, t))
}

function leg(hip, phase, H, extraHip, extraKnee) {
  const h = 0.38 * Math.sin(phase) + extraHip
  const k = 0.08 + 0.62 * Math.max(0, Math.cos(phase + 0.7)) ** 2 + extraKnee
  const knee = [hip[0] + Math.sin(h) * seg.thigh * H, hip[1] + Math.cos(h) * seg.thigh * H]
  const s = h - k
  const ankle = [knee[0] + Math.sin(s) * seg.shank * H, knee[1] + Math.cos(s) * seg.shank * H]
  const fa = Math.max(-0.5, Math.min(0.5, s * 0.6))
  const toe = [ankle[0] + Math.cos(fa) * seg.foot * H, ankle[1] + Math.sin(fa) * seg.foot * H * 0.6]
  const heel = [ankle[0] - 0.03 * H, ankle[1] + 0.02 * H]
  return { knee, ankle, toe, heel, hipAng: h, kneeAng: k }
}

// phase: gait phase (rad). p: trip intensity 0..1. (x, ground): where to stand. H: body height px.
export function pose(phase, p, x, ground, H) {
  const zero = [0, 0]
  const L = leg(zero, phase, H, -0.12 * p, 0.25 * p)            // trailing leg on a trip
  const R = leg(zero, phase + Math.PI, H, 0.4 * p, 0.05 * p)  // recovery step leg
  const lowest = Math.max(L.ankle[1], R.ankle[1], L.toe[1], R.toe[1])
  const hip = [x, ground - lowest - 0.012 * H]
  const sh = (pt) => [pt[0] + hip[0], pt[1] + hip[1]]
  const legs = [L, R].map((l) => ({ ...l, knee: sh(l.knee), ankle: sh(l.ankle), toe: sh(l.toe), heel: sh(l.heel) }))

  const lean = 0.06 + 0.32 * p
  const c7 = [hip[0] + Math.sin(lean) * seg.trunk * H, hip[1] - Math.cos(lean) * seg.trunk * H]
  const head = [c7[0] + Math.sin(lean) * (seg.neck + 0.05) * H, c7[1] - Math.cos(lean) * (seg.neck + 0.05) * H]
  const arm = (ph) => {
    const a = -0.32 * Math.sin(ph) + lean * 0.5 + 1.1 * p
    const e = 0.35 + 0.15 * Math.sin(ph) + 0.3 * p
    const elbow = [c7[0] + Math.sin(a) * seg.upper * H, c7[1] + 0.02 * H + Math.cos(a) * seg.upper * H]
    const wrist = [elbow[0] + Math.sin(a + e) * seg.fore * H, elbow[1] + Math.cos(a + e) * seg.fore * H]
    return { elbow, wrist }
  }
  const armL = arm(phase), armR = arm(phase + Math.PI)
  const shoulder = [c7[0], c7[1] + 0.02 * H]

  return {
    hip, c7, head, shoulder, legs, arms: [armL, armR], lean,
    // depth: 0 = near side, 1 = far side (drawn dimmer)
    markers: [
      { id: 'HEAD', pt: head, d: 0 }, { id: 'C7', pt: c7, d: 0 }, { id: 'SHO', pt: shoulder, d: 0 },
      { id: 'ASIS', pt: hip, d: 0 },
      { id: 'L_ELB', pt: armL.elbow, d: 0 }, { id: 'L_WRI', pt: armL.wrist, d: 0 },
      { id: 'R_ELB', pt: armR.elbow, d: 1 }, { id: 'R_WRI', pt: armR.wrist, d: 1 },
      { id: 'L_KNE', pt: legs[0].knee, d: 0 }, { id: 'L_ANK', pt: legs[0].ankle, d: 0 }, { id: 'L_HEE', pt: legs[0].heel, d: 0 }, { id: 'L_TOE', pt: legs[0].toe, d: 0 },
      { id: 'R_KNE', pt: legs[1].knee, d: 1 }, { id: 'R_ANK', pt: legs[1].ankle, d: 1 }, { id: 'R_HEE', pt: legs[1].heel, d: 1 }, { id: 'R_TOE', pt: legs[1].toe, d: 1 },
    ],
    bones: [
      [hip, c7], [c7, head], [shoulder, armL.elbow, 0], [armL.elbow, armL.wrist, 0], [shoulder, armR.elbow, 1], [armR.elbow, armR.wrist, 1],
      [hip, legs[0].knee, 0], [legs[0].knee, legs[0].ankle, 0], [legs[0].heel, legs[0].toe, 0],
      [hip, legs[1].knee, 1], [legs[1].knee, legs[1].ankle, 1], [legs[1].heel, legs[1].toe, 1],
    ],
    angles: { trunk: lean, knee: legs[1].kneeAng },
  }
}

export const fitCanvas = (canvas) => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const r = canvas.getBoundingClientRect()
  if (canvas.width !== Math.round(r.width * dpr) || canvas.height !== Math.round(r.height * dpr)) {
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr)
  }
  const ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { ctx, w: r.width, h: r.height }
}

export const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

import { useState } from 'react'
import { awards, awardKinds } from '../data'

export default function Awards() {
  const [tip, setTip] = useState(null)
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
  return (
    <section id="awards" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="kicker">04 · Awards</div>
          <h2>{awards.length} honors — and the pace keeps rising</h2>
          <p>Each medal is one award. Recognition has grown steadily through the PhD.</p>
        </div>
        <div className="card shelf-card reveal">
          <div className="shelf">
            {years.map((y) => {
              const list = awards.filter((a) => a.year === y)
              return (
                <div key={y} className={'shelf-col' + (list.length >= 4 ? ' peak' : '')}>
                  <div className="medals">
                    {list.map((a, i) => (
                      <button key={i} className="medal" style={{ background: awardKinds[a.kind].color, animationDelay: `${i * 120}ms` }}
                        onMouseEnter={() => setTip(a)} onMouseLeave={() => setTip(null)} onFocus={() => setTip(a)} onBlur={() => setTip(null)} aria-label={`${a.name}, ${a.year}`} />
                    ))}
                  </div>
                  <span className="shelf-year">{y}</span>
                  {list.length >= 4 && <span className="peak-label">{list.length} in one year</span>}
                </div>
              )
            })}
          </div>
          <div className="shelf-foot">
            {tip ? <p className="shelf-tip"><b>{tip.name}</b> · {tip.org} · {tip.year}</p> : <p className="shelf-tip muted">Hover a medal to see the award.</p>}
            <div className="legend">{Object.entries(awardKinds).map(([k, v]) => <span key={k}><i style={{ background: v.color }} />{v.label}</span>)}</div>
          </div>
        </div>
        <div className="award-hl reveal">
          <div><small>2025</small><b>Deiss Graduate Research Award</b><span>UIC Graduate College · for her work on muscle fatigue and reactive balance</span></div>
          <div><small>3 times</small><b>Lillian Torrance Award</b><span>Rehabilitation Sciences, UIC · 2023, 2024, 2025</span></div>
          <div><small>4 times</small><b>Board of Trustees Award</b><span>UIC · 2021, 2022, 2024, 2025</span></div>
        </div>
      </div>
    </section>
  )
}

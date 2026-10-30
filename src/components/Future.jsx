import { future } from '../data'

export default function Future() {
  return (
    <section id="future" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="kicker">05 · What's next</div>
          <h2>From the lab treadmill to people's homes</h2>
          <p>Where her work is heading after the PhD.</p>
        </div>
        <div className="road">
          <svg className="road-line" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
            <path id="roadPath" d="M0 20 C 250 0, 500 40, 1000 20" />
            <circle r="6"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#roadPath" /></animateMotion></circle>
          </svg>
          <div className="road-cards">
            {future.map((f, i) => (
              <div key={f.title} className="road-card reveal" style={{ '--i': i }}>
                <span className={'when ' + f.when.toLowerCase().replace(' ', '-')}>{f.when}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

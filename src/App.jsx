import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Sides from './components/Sides'
import Education from './components/Education'
import Research from './components/Research'
import Awards from './components/Awards'
import Future from './components/Future'
import Game from './components/Game'
import Contact from './components/Contact'

const links = [['sides', 'About'], ['education', 'Education'], ['research', 'Research'], ['awards', 'Awards'], ['future', 'Next'], ['play', 'Play']]

export default function App() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('home')
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement
      setProgress(d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight))
      const navOver = [...document.querySelectorAll('.hero, .section.dark')].some((s) => { const r = s.getBoundingClientRect(); return r.top <= 32 && r.bottom > 32 })
      setDark(navOver)
      let cur = 'home'
      document.querySelectorAll('section[id]').forEach((s) => { if (s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = s.id })
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 })
    const watch = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); mo.disconnect() }
  }, [])

  return (
    <>
      <nav className={dark ? 'on-dark' : ''}>
        <div className="wrap nav-in">
          <a href="#home" className="brand">Upasana<span>.</span></a>
          <div className="nav-links">
            {links.map(([id, l]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{l}</a>)}
          </div>
          <a className="btn small nav-cta" href="#contact">Contact</a>
        </div>
        <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      </nav>
      <main>
        <Hero />
        <Sides />
        <Education />
        <Research />
        <Awards />
        <Future />
        <Game />
        <Contact />
      </main>
    </>
  )
}

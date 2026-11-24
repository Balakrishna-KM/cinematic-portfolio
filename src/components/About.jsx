import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { portfolio as d } from '../data/portfolio'
import MaskText from './MaskText'
import { reduced } from '../App'
export default function About() {
  const ref = useRef()
  useLayoutEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-img img, .about-img .ph', { yPercent: -12, scale: 1.2 }, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.about-img', scrub: true } })
      gsap.from('.about-col', { clipPath: 'inset(0 0 100% 0)', y: 40, duration: 1.2, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.about-cols', start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])
  const a = d.about
  return (
    <section id="about" className="sec" ref={ref}>
      <MaskText lines={['THE CREATIVE MIND', 'BEHIND THE FRAME.']} className="h2" />
      <div className="about-grid">
        <div className="about-img">{d.profileImage ? <img src={d.profileImage} alt={d.name} loading="lazy" /> : <div className="ph">Portrait</div>}</div>
        <div>
          <p className="lead">{a.intro}</p>
          <div className="about-cols">
            <div className="about-col"><h4>Creative philosophy</h4><p>{a.philosophy}</p></div>
            <div className="about-col"><h4>Editing approach</h4><p>{a.approach}</p></div>
          </div>
          <h4 className="exp-h">Experience</h4>
          <ul className="exp">{a.experience.map((e, i) => <li key={i}><span>{e.period}</span><div><b>{e.role}</b>, {e.place}<p>{e.text}</p></div></li>)}</ul>
        </div>
      </div>
    </section>
  )
}

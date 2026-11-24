import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from './scrollState'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Showreel from './components/Showreel'
import Gallery from './components/Gallery'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
gsap.registerPlugin(ScrollTrigger)
const Scene = lazy(() => import('./components/Scene'))

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const lite = () => reduced() || window.matchMedia('(max-width: 768px)').matches

export default function App() {
  const [show3D, setShow3D] = useState(false)
  useEffect(() => {
    const lenis = new Lenis({ lerp: reduced() ? 1 : 0.09 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => (scrollState.p = s.progress) })
    window.__lenis = lenis
    // lazy-load 3D after first paint so it never blocks initial load
    const id = 'requestIdleCallback' in window ? requestIdleCallback(() => setShow3D(!lite())) : setTimeout(() => setShow3D(!lite()), 300)
    return () => { gsap.ticker.remove(tick); lenis.destroy(); ScrollTrigger.getAll().forEach((s) => s.kill()) }
  }, [])
  return (
    <>
      <div className="atmos" aria-hidden />
      {show3D && <Suspense fallback={null}><Scene /></Suspense>}
      <Cursor /><Nav />
      <main><Hero /><Showreel /><Gallery /><About /><Skills /><Contact /></main>
    </>
  )
}

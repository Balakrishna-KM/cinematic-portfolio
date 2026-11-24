import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { portfolio as d } from '../data/portfolio'
import MaskText from './MaskText'

const grad = (i) => `linear-gradient(${135 + i * 40}deg, #101014, ${i % 2 ? '#8B5CF6' : '#FF2D95'}55)`
function Card({ p, i, onOpen }) {
  const vid = useRef()
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 }), ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - 0.5) * 16); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16) }
  const leave = () => { rx.set(0); ry.set(0); vid.current?.pause() }
  return (
    <motion.button className="card" data-hover style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={move} onMouseLeave={leave} onMouseEnter={() => vid.current?.play()} onClick={() => onOpen(p)} whileTap={{ scale: 0.98 }}>
      <div className="card-media" style={{ background: p.thumbnail ? `url(${p.thumbnail}) center/cover` : grad(i) }}>
        {p.video && <video ref={vid} src={p.video} muted loop playsInline preload="none" />}
      </div>
      <div className="card-info"><small>{p.category}</small><h3>{p.title}</h3></div>
    </motion.button>
  )
}
export default function Gallery() {
  const sec = useRef(), track = useRef()
  const [open, setOpen] = useState(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth)
      gsap.to(track.current, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec.current, pin: true, scrub: 1, end: () => '+=' + dist(), invalidateOnRefresh: true } })
    }, sec)
    return () => ctx.revert()
  }, [])
  return (
    <section id="work" ref={sec} className="gallery">
      <MaskText lines={['SELECTED CREATIONS.']} className="h2 g-title" />
      <div ref={track} className="track">{d.projects.map((p, i) => <Card key={p.id} p={p} i={i} onOpen={setOpen} />)}</div>
      <AnimatePresence>{open && (
        <motion.div className="modal" role="dialog" aria-modal="true" aria-label={open.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
          <motion.div className="modal-body" initial={{ scale: 0.85, y: 60 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} transition={{ type: 'spring', stiffness: 220, damping: 26 }} onClick={(e) => e.stopPropagation()}>
            {open.video ? <video src={open.video} poster={open.thumbnail || undefined} controls autoPlay playsInline /> : <div className="ph" style={open.thumbnail ? { backgroundImage: `url(${open.thumbnail})` } : undefined}>Add a video URL for this project</div>}
            <small>{open.category}</small><h3>{open.title}</h3><p>{open.description}</p>
            <button className="btn" onClick={() => setOpen(null)}>Close</button>
          </motion.div>
        </motion.div>)}</AnimatePresence>
    </section>
  )
}

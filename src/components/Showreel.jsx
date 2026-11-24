import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { portfolio as d } from '../data/portfolio'
import MaskText from './MaskText'
export default function Showreel() {
  const v = useRef(), box = useRef()
  const [playing, setPlaying] = useState(false)
  const { url, thumbnail } = d.showreel
  const toggle = () => { if (!v.current) return; v.current.paused ? v.current.play() : v.current.pause() }
  const full = () => { const el = box.current; document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.() }
  return (
    <section id="showreel" className="sec">
      <MaskText lines={['VISUALS THAT', 'SPEAK LOUDER.']} className="h2" />
      <motion.div className="reel" initial={{ opacity: 0, rotateX: 18, y: 80 }} whileInView={{ opacity: 1, rotateX: 0, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
        <div ref={box} className="reel-frame">
          {url ? <video ref={v} src={url} poster={thumbnail || undefined} playsInline preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onClick={toggle} />
            : <div className="ph" style={thumbnail ? { backgroundImage: `url(${thumbnail})` } : undefined}>Add your showreel URL<br /><small>showreel.url in portfolio.js</small></div>}
          <div className="controls">
            <button onClick={toggle} disabled={!url}>{playing ? 'Pause' : 'Play'}</button>
            <button onClick={full} disabled={!url}>Fullscreen</button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

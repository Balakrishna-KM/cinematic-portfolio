import { motion } from 'framer-motion'
import { portfolio as d } from '../data/portfolio'
import MaskText from './MaskText'
export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <MaskText as="h1" lines={d.headline} className="mega" onLoad delay={0.3} />
        <p className="tagline">{d.tagline}</p>
        <motion.a href="#work" className="btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
          onClick={(e) => { e.preventDefault(); window.__lenis?.scrollTo('#work', { duration: 1.6 }) }}>Explore my work</motion.a>
      </div>
      <motion.figure className="portrait" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.4, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}>
        {d.profileImage ? <img src={d.profileImage} alt={d.name} fetchpriority="high" /> : <div className="ph">Add your portrait<br /><small>profileImage in portfolio.js</small></div>}
      </motion.figure>
      <div className="scroll-ind" aria-hidden><span />Scroll</div>
    </section>
  )
}

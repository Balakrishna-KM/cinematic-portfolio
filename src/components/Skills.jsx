import { motion } from 'framer-motion'
import { portfolio as d } from '../data/portfolio'
import MaskText from './MaskText'
export default function Skills() {
  return (
    <section id="skills" className="sec">
      <MaskText lines={['TOOLS OF THE CRAFT.']} className="h2" />
      <ul className="skills">
        {d.skills.map((s, i) => (
          <motion.li key={s} data-hover initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08, duration: 0.8 }} whileHover={{ rotateX: -10, rotateY: 12, scale: 1.04 }} style={{ transformPerspective: 800 }}>
            <div className="obj" aria-hidden><i style={{ animationDelay: `${-i * 0.7}s` }} /><i style={{ animationDelay: `${-i * 0.7 - 1}s` }} /></div>
            <span>{s}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

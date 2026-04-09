import { motion } from 'framer-motion'
import { LOGOS } from '../assets'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
}

const items = [
  { num: '01', text: 'Un lugar al que llegar.' },
  { num: '02', text: 'Una cancha para jugar.' },
  { num: '03', text: 'Una razón para quedarse.' },
  { num: '04', text: 'Una comunidad a la que pertenecer.' },
]

export default function Concept() {
  return (
    <section className="bg-cc-base py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Quote */}
        <div className="mb-24 md:mb-36 max-w-4xl">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8 }}
            className="text-cc-muted text-xs tracking-widest uppercase font-sans mb-8"
          >
            El concepto
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-display leading-tight"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            "El tennis es la excusa.
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 500 }}>La comunidad es la razón."</span>
          </motion.h2>
        </div>

        {/* Esto es — full width numbered list */}
        <div className="relative">
          <img
            src={LOGOS.emblem}
            alt=""
            className="absolute top-0 right-0 w-32 h-32 object-contain opacity-[0.04] pointer-events-none"
            aria-hidden="true"
          />

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-cc-muted text-xs tracking-widest uppercase font-sans mb-12"
          >
            Esto es
          </motion.p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-cc-text/8">
            {items.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                className="bg-cc-base px-6 py-10 md:py-12"
              >
                <span className="text-cc-accent font-sans text-xs font-light tracking-widest block mb-5">
                  {item.num}
                </span>
                <p
                  className="font-display text-cc-text leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 400 }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

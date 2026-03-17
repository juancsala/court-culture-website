import { motion } from 'framer-motion'
import { LOGOS } from '../assets'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
}

const pillarItems = [
  {
    label: 'Una comunidad abierta.',
    desc: 'Para todos los niveles, de principiantes a avanzados. No importa tu nivel, importa tu actitud.',
  },
  {
    label: 'Eventos y torneos recreativos.',
    desc: 'Competencia sin presión. El objetivo es pasarla bien, conocer gente y disfrutar el juego.',
  },
  {
    label: 'La convivencia es parte del plan.',
    desc: 'Después de cada partido viene lo mejor — el after, las conversaciones y los momentos que se quedan.',
  },
]

export default function Concept() {
  return (
    <section className="bg-cc-base py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top statement */}
        <div className="mb-24 md:mb-36">
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
            className="font-display leading-tight text-balance"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            "El tennis es la excusa.
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 500 }}>La comunidad es la razón."</span>
          </motion.h2>
        </div>

        {/* PILLARS / THIS IS grid */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left: pillars */}
          <div className="space-y-10">
            {pillarItems.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="border-t border-cc-text/10 pt-8"
              >
                <p
                  className="font-display text-cc-muted mb-2"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontStyle: 'italic', fontWeight: 300 }}
                >
                  {item.label}
                </p>
                <p className="text-cc-muted font-sans font-light text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: THIS IS */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 1, delay: 0.3 }}
            className="md:pt-0 pt-4"
          >
            {/* Emblem watermark */}
            <div className="relative">
              <img
                src={LOGOS.emblem}
                alt=""
                className="absolute -top-4 -right-4 w-24 h-24 object-contain opacity-5 pointer-events-none"
                aria-hidden="true"
              />
              <p className="text-cc-muted text-xs tracking-widest uppercase font-sans mb-8">
                Esto es —
              </p>
              <div className="space-y-6">
                {[
                  { num: '01', text: 'Un lugar al que llegar.' },
                  { num: '02', text: 'Una cancha para jugar.' },
                  { num: '03', text: 'Una razón para quedarse.' },
                  { num: '04', text: 'Una comunidad a la que pertenecer.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                    className="flex items-baseline gap-5"
                  >
                    <span className="text-cc-accent font-sans text-xs font-light">{item.num}</span>
                    <p
                      className="font-display text-cc-text"
                      style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', fontWeight: 400 }}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

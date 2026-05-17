import { motion } from 'framer-motion'
import { LOGOS } from '../assets'

const items = [
  { num: '01', text: 'Un lugar al que llegar.' },
  { num: '02', text: 'Una cancha para jugar.' },
  { num: '03', text: 'Una razón para quedarse.' },
  { num: '04', text: 'Una comunidad a la que pertenecer.' },
]

export default function Concept() {
  return (
    <section className="overflow-hidden">

      {/* Quote block — dark */}
      <div className="bg-cc-dark relative py-28 md:py-40 overflow-hidden">
        {/* Emblem watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none" aria-hidden="true">
          <img src={LOGOS.emblemWhite} alt="" className="w-72 md:w-[480px] h-auto object-contain opacity-[0.04]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white/25 text-xs tracking-[0.25em] uppercase font-sans mb-10"
          >
            El concepto
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-white leading-tight max-w-4xl"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            "El tenis es la excusa.
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 500 }} className="text-white/80">
              La comunidad es la razón."
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Items grid — cream */}
      <div className="bg-cc-base py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-cc-text/25 text-xs tracking-[0.25em] uppercase font-sans mb-12"
          >
            Esto es
          </motion.p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-0 border-t border-cc-text/10">
            {items.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
                className="pt-8 pb-10 md:pr-8 border-b md:border-b-0 md:border-r border-cc-text/10 last:border-0"
              >
                <span
                  className="font-display text-cc-text/8 block leading-none mb-4 select-none"
                  style={{ fontSize: 'clamp(4rem, 7vw, 7rem)', fontWeight: 300 }}
                >
                  {item.num}
                </span>
                <p
                  className="font-display text-cc-text leading-snug"
                  style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', fontWeight: 400 }}
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

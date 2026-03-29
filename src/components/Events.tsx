import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getEvents } from '../api'
import { PHOTOS } from '../assets'

export default function Events() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then(e => setCount(e.length))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="relative bg-cc-dark overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={PHOTOS[2]}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.15) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cc-dark via-cc-dark/85 to-cc-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-cc-dark/60 via-transparent to-cc-dark/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-40 md:py-56">
        <div className="max-w-2xl">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-10 h-px bg-white/25" />
            <span className="text-white/35 text-xs tracking-[0.25em] uppercase font-sans">
              Próximos eventos
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-white leading-[0.92] mb-10"
            style={{ fontSize: 'clamp(4rem, 9vw, 8rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Conoce lo
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 500 }}>que se viene.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans font-light text-white/40 text-base leading-relaxed mb-14 max-w-sm"
          >
            Cada evento es una experiencia diseñada para conectar a las personas correctas en la cancha correcta.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <Link
              to="/eventos"
              className="group inline-flex items-center gap-5 bg-white text-cc-dark px-9 py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-base transition-all duration-300"
            >
              Explorar eventos
              <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-base">→</span>
            </Link>

            {!loading && (
              <span className="font-sans text-white/25 text-xs tracking-widest uppercase">
                {count > 0 ? `${count} evento${count !== 1 ? 's' : ''} próximo${count !== 1 ? 's' : ''}` : 'Próximamente'}
              </span>
            )}
          </motion.div>

        </div>
      </div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cc-base to-transparent" />
    </section>
  )
}

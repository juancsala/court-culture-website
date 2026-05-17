import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { HERO_IMAGE_2 } from '../assets'

const TennisBall = lazy(() => import('./TennisBall'))

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">

      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE_2}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cc-dark via-cc-dark/50 to-cc-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cc-dark/40 to-transparent" />
      </div>

      {/* 3D Tennis Ball */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none">
        <Suspense fallback={null}>
          <TennisBall className="w-full h-full" />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-display text-white leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontStyle: 'italic', fontWeight: 300 }}
        >
          Tennis needed
          <br />
          <span style={{ fontStyle: 'normal', fontWeight: 500 }}>a culture.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
          className="text-white/70 font-sans font-light text-base md:text-lg max-w-md mb-6 leading-relaxed"
        >
          Court Culture es donde el tenis se convierte en la excusa para conectar, pertenecer y construir algo real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-px bg-white/30" />
          <span className="text-xs tracking-[0.2em] uppercase font-sans text-white/35">Monterrey, México</span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase font-sans" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div className="w-full bg-white/60 absolute top-0" style={{ height: '40%' }}
            animate={{ y: ['0%', '250%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

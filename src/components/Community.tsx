import { motion } from 'framer-motion'
import { COMMUNITY_IMAGES, FEATURE_IMAGE } from '../assets'

export default function Community() {
  return (
    <section className="bg-cc-base py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cc-muted text-xs tracking-widest uppercase font-sans mb-4">
              The culture
            </p>
            <h2
              className="font-display text-cc-text leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              People.
              <br />
              <span style={{ fontStyle: 'normal', fontWeight: 500 }}>Connection.</span>
              <br />
              <em>Atmosphere.</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cc-muted font-sans font-light text-sm leading-relaxed max-w-xs"
          >
            Every session ends the same way — with people who came as strangers and leave as something more.
          </motion.p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Row 1: two tall + one short */}
          {COMMUNITY_IMAGES.slice(0, 3).map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`overflow-hidden bg-cc-light ${i === 1 ? 'row-span-2' : ''}`}
              style={{ aspectRatio: i === 1 ? 'auto' : '3/4' }}
            >
              <img
                src={src}
                alt="Court Culture community"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                style={{ minHeight: i === 1 ? '100%' : 'auto' }}
              />
            </motion.div>
          ))}

          {/* Row 2: remaining images */}
          {COMMUNITY_IMAGES.slice(3, 6).map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-cc-light"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={src}
                alt="Court Culture community"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* Feature image with text overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 relative overflow-hidden"
          style={{ height: 'clamp(300px, 40vw, 560px)' }}
        >
          <img
            src={FEATURE_IMAGE}
            alt="Court Culture"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cc-dark/70 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 md:px-16">
            <blockquote
              className="font-display text-white max-w-xl"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontStyle: 'italic', fontWeight: 300 }}
            >
              "The best part of the game
              <br />
              <span style={{ fontStyle: 'normal', fontWeight: 500 }}>happens off the court."</span>
            </blockquote>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

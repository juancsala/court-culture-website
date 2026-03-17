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
              La cultura
            </p>
            <h2
              className="font-display text-cc-text leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              Personas.
              <br />
              <span style={{ fontStyle: 'normal', fontWeight: 500 }}>Conexión.</span>
              <br />
              <em>Ambiente.</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cc-muted font-sans font-light text-sm leading-relaxed max-w-xs"
          >
            Cada sesión termina igual: personas que llegaron sin conocerse y se van con ganas de volver.
          </motion.p>
        </div>

        {/* Image grid — clean 3-column */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {COMMUNITY_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-cc-light"
              style={{ aspectRatio: '3/4' }}
            >
              <motion.img
                src={src}
                alt="Court Culture comunidad"
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
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
              "Lo mejor del juego
              <br />
              <span style={{ fontStyle: 'normal', fontWeight: 500 }}>pasa fuera de la cancha."</span>
            </blockquote>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

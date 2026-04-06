import { motion } from 'framer-motion'
import { LOGOS, LINKS } from '../assets'

const channels = [
  {
    id: 'comunidad',
    label: 'Forma parte',
    platform: 'Comunidad',
    description: 'Regístrate como miembro para tener acceso anticipado a eventos y precios exclusivos.',
    cta: 'Únete como miembro',
    href: '/comunidad',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Sigue el estilo de vida',
    platform: 'Instagram',
    description: 'Detrás de cámaras, highlights de sesiones y la cultura del día a día.',
    cta: 'Seguir en Instagram',
    href: LINKS.instagram,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    label: 'Mira la cultura',
    platform: 'TikTok',
    description: 'Contenido corto desde las canchas. Momentos reales, personas reales.',
    cta: 'Seguir en TikTok',
    href: LINKS.tiktok,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
      </svg>
    ),
  },
]

export default function Join() {
  return (
    <section className="bg-cc-dark py-28 md:py-40 relative overflow-hidden">
      {/* Emblem watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <img
          src={LOGOS.emblemWhite}
          alt=""
          className="w-96 h-96 object-contain opacity-[0.03]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white/40 text-xs tracking-widest uppercase font-sans mb-6"
          >
            Únete a la comunidad
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-tight"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Sé parte
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 500 }}>de esto.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 font-sans font-light text-base mt-6 max-w-md mx-auto leading-relaxed"
          >
            Llega al evento, juega, quédate a convivir. La cancha es el pretexto, lo demás pasa solo.
          </motion.p>
        </div>

        {/* Channel cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {channels.map((channel, i) => (
            <motion.a
              key={channel.id}
              href={channel.href}
              target={channel.id === 'comunidad' ? '_self' : '_blank'}
              rel={channel.id === 'comunidad' ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="group block border border-white/10 p-8 hover:border-white/25 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="mb-8 text-white/60 group-hover:text-white transition-colors duration-300">
                  {channel.icon}
                </div>

                <p
                  className="font-display text-white mb-8"
                  style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', fontWeight: 400 }}
                >
                  {channel.platform}
                </p>

                <span className="inline-flex items-center gap-2 text-white/60 group-hover:text-white text-xs tracking-widest uppercase font-sans transition-colors duration-300">
                  {channel.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}

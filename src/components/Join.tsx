import { motion } from 'framer-motion'
import { LOGOS, LINKS } from '../assets'

const channels = [
  {
    id: 'whatsapp',
    label: 'Join the community',
    platform: 'WhatsApp',
    description: 'Get invites to sessions, meet the crew, and stay in the loop.',
    cta: 'Join WhatsApp Group',
    href: LINKS.whatsapp,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Follow the lifestyle',
    platform: 'Instagram',
    description: 'Behind the scenes, session highlights, and the daily culture.',
    cta: 'Follow on Instagram',
    href: LINKS.instagram,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    label: 'Watch the culture',
    platform: 'TikTok',
    description: 'Short form content from the courts. Real moments, real people.',
    cta: 'Follow on TikTok',
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
            Join the community
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-tight"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Become part
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 500 }}>of it.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 font-sans font-light text-base mt-6 max-w-md mx-auto leading-relaxed"
          >
            Court Culture is a feeling you can't describe until you're in it. Come find out.
          </motion.p>
        </div>

        {/* Channel cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {channels.map((channel, i) => (
            <motion.a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
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
                <div className="flex items-start justify-between mb-8">
                  <div className="text-white/60 group-hover:text-white transition-colors duration-300">
                    {channel.icon}
                  </div>
                  <span className="text-white/30 text-xs tracking-widest uppercase font-sans">
                    {channel.label}
                  </span>
                </div>

                <p
                  className="font-display text-white mb-3"
                  style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', fontWeight: 400 }}
                >
                  {channel.platform}
                </p>
                <p className="text-white/50 font-sans font-light text-sm leading-relaxed mb-8">
                  {channel.description}
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

import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { LINKS } from '../assets'

const CONTACTOS = [
  {
    label: 'Email',
    value: 'courtculture.mx@gmail.com',
    href: 'mailto:courtculture.mx@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@courtculture.mty',
    href: LINKS.instagram,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: 'Comunidad Court Culture',
    href: LINKS.whatsapp,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    value: '@courtculture.mty',
    href: LINKS.tiktok,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
      </svg>
    ),
  },
]

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-cc-base text-cc-text">
      <Navbar solid />
      <div className="h-16 md:h-20" />

      {/* Hero */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src="/web/hero-group.jpg" alt="Court Culture"
          className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-cc-dark/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.25em] uppercase font-sans text-white/50 mb-4">
            Court Culture · Monterrey
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic' }}>
            Contáctanos.
          </motion.h1>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 pt-16 pb-10">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="font-sans text-cc-text/55 text-sm md:text-base leading-relaxed">
          Para cualquier pregunta, colaboración o información sobre nuestros eventos, escríbenos y uno del equipo te responderá pronto.
        </motion.p>
      </div>

      {/* Contact cards */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 pb-24">
        <div className="flex flex-col divide-y divide-cc-text/8 border-t border-cc-text/8">
          {CONTACTOS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="flex items-center justify-between py-6 group hover:bg-cc-text/[0.02] -mx-6 md:-mx-12 px-6 md:px-12 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <span className="text-cc-text/30 group-hover:text-cc-text/60 transition-colors">{c.icon}</span>
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase font-sans text-cc-text/30 mb-0.5">{c.label}</p>
                  <p className="font-sans text-cc-text/70 text-sm group-hover:text-cc-text transition-colors">{c.value}</p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                className="text-cc-text/20 group-hover:text-cc-text/50 transition-colors shrink-0">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

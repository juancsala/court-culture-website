import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getEvents, Event } from '../api'
import { LOGOS, LINKS, COMMUNITY_IMAGES } from '../assets'

function formatFecha(fecha: string) {
  const d = new Date(fecha + 'T12:00:00')
  return {
    dia: d.toLocaleDateString('es-MX', { day: '2-digit' }),
    mes: d.toLocaleDateString('es-MX', { month: 'long' }),
    año: d.getFullYear(),
  }
}

const STRIP_PHOTOS = [COMMUNITY_IMAGES[0], COMMUNITY_IMAGES[3], COMMUNITY_IMAGES[5]]

export default function EventsPage() {
  const [eventos, setEventos] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then(setEventos)
      .catch(() => setEventos([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      {/* Navbar */}
      <nav className="bg-cc-dark px-4 md:px-12 py-3 flex items-center justify-between">
        <a href="/">
          <img src={LOGOS.mainWhite} alt="Court Culture" className="h-16 md:h-24 w-auto object-contain" />
        </a>
        <div className="flex items-center gap-3 md:gap-5">
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer"
            className="hidden md:block text-white/60 hover:text-white transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer"
            className="hidden md:block text-white/60 hover:text-white transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>
          </a>
          <a href="/comunidad"
            className="shrink-0 text-cc-dark bg-cc-base/95 hover:bg-white px-3 md:px-5 py-2 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200 whitespace-nowrap">
            Únete
          </a>
        </div>
      </nav>

      {/* Hero header */}
      <div className="px-6 md:px-12 pt-16 pb-12 border-b border-cc-text/8">
        <a href="/" className="inline-flex items-center gap-2 text-cc-text/30 hover:text-cc-text/60 text-xs tracking-widest uppercase font-sans transition-colors duration-200 mb-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          Inicio
        </a>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/30 mb-4"
        >
          Court Culture · Monterrey
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-cc-text leading-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 300, fontStyle: 'italic' }}
          >
            Eventos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-cc-text/40 text-sm leading-relaxed max-w-xs mb-2"
          >
            Entérate de los próximos eventos de la comunidad. Tenis, conexión y algo más.
          </motion.p>
        </div>
      </div>

      {/* Photo strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="grid grid-cols-3 gap-1 h-48 md:h-72"
      >
        {STRIP_PHOTOS.map((src, i) => (
          <div key={i} className="overflow-hidden">
            <img
              src={src}
              alt="Court Culture"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.88) saturate(0.85)' }}
            />
          </div>
        ))}
      </motion.div>

      {/* Events list */}
      <div className="px-6 md:px-12 py-16">
        {loading ? (
          <div className="py-32 text-center text-cc-text/25 text-xs font-sans tracking-widest uppercase">
            Cargando...
          </div>
        ) : eventos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-32 text-center"
          >
            <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-6">Próximamente</p>
            <h2
              className="font-display text-cc-text mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              Algo se viene.
            </h2>
            <p className="font-sans text-cc-text/40 text-sm max-w-sm mx-auto leading-relaxed mb-10">
              Regístrate como miembro para ser el primero en saber cuándo abren los cupos.
            </p>
            <a
              href="/comunidad"
              className="inline-block border border-cc-text/20 text-cc-text/50 hover:text-cc-text hover:border-cc-text/40 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300"
            >
              Únete a la comunidad →
            </a>
          </motion.div>
        ) : (
          <div className="divide-y divide-cc-text/8">
            {eventos.map((evento, i) => {
              const { dia, mes, año } = formatFecha(evento.fecha)
              return (
                <motion.a
                  key={evento.id}
                  href={`/eventos/${evento.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-center gap-6 py-10 md:py-12 transition-all duration-400 -mx-6 md:-mx-12 px-6 md:px-12 hover:bg-cc-dark"
                >
                  {/* Fecha */}
                  <div className="md:w-40 shrink-0">
                    <span
                      className="font-display text-cc-text/15 group-hover:text-white/20 transition-colors duration-300 leading-none block"
                      style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', fontWeight: 300 }}
                    >
                      {dia}
                    </span>
                    <p className="text-xs tracking-widest uppercase font-sans text-cc-text/30 group-hover:text-white/40 transition-colors duration-300 mt-1 capitalize">
                      {mes} {año}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2
                      className="font-display text-cc-text group-hover:text-white leading-tight mb-2 transition-colors duration-300"
                      style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, fontStyle: 'italic' }}
                    >
                      {evento.titulo}
                    </h2>
                    <p className="font-sans text-cc-text/35 group-hover:text-white/50 text-sm transition-colors duration-300">
                      {evento.lugar}
                    </p>
                  </div>

                  {/* Precio y cupos */}
                  <div className="md:text-right shrink-0">
                    <p className="font-sans text-cc-text group-hover:text-white text-sm mb-1 transition-colors duration-300">
                      desde ${Number(evento.precio_comunidad).toLocaleString('es-MX')} MXN
                    </p>
                    <p className="font-sans text-cc-text/30 group-hover:text-white/35 text-xs tracking-widest uppercase transition-colors duration-300">
                      {evento.capacidad_publica} cupos
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block text-cc-text/20 group-hover:text-white/60 transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </div>
                </motion.a>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div className="border-t border-cc-text/8 px-6 md:px-12 py-8 flex items-center justify-between">
        <p className="text-xs font-sans text-cc-text/20 tracking-widest uppercase">Court Culture · Monterrey</p>
        <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer"
          className="text-xs font-sans text-cc-text/25 hover:text-cc-text/50 transition-colors">
          @courtculture.mty
        </a>
      </div>
    </div>
  )
}

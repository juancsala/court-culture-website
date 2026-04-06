import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getEvents, Event } from '../api'
import { LOGOS, LINKS } from '../assets'

function formatFecha(fecha: string) {
  const d = new Date(fecha + 'T12:00:00')
  return {
    dia: d.toLocaleDateString('es-MX', { day: '2-digit' }),
    mes: d.toLocaleDateString('es-MX', { month: 'long' }),
    año: d.getFullYear(),
  }
}

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
      <nav className="border-b border-cc-text/8 px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="/">
          <img src={LOGOS.main} alt="Court Culture" className="h-16 w-auto" />
        </a>
        <div className="flex items-center gap-6">
          <a
            href="/comunidad"
            className="hidden md:block text-xs tracking-[0.2em] uppercase font-sans text-cc-text/40 hover:text-cc-text transition-colors duration-200"
          >
            Únete como miembro
          </a>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cc-text/40 hover:text-cc-text transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 md:px-12 pt-20 pb-16 border-b border-cc-text/8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/30 mb-4"
        >
          Court Culture · Monterrey
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-cc-text leading-none"
          style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 300, fontStyle: 'italic' }}
        >
          Eventos
        </motion.h1>
      </div>

      {/* Content */}
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
                  className="group flex flex-col md:flex-row md:items-center gap-6 py-12 hover:bg-cc-text/[0.02] transition-colors duration-300 -mx-6 md:-mx-12 px-6 md:px-12"
                >
                  {/* Fecha */}
                  <div className="md:w-40 shrink-0">
                    <span
                      className="font-display text-cc-text/15 group-hover:text-cc-text/30 transition-colors duration-300 leading-none block"
                      style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', fontWeight: 300 }}
                    >
                      {dia}
                    </span>
                    <p className="text-xs tracking-widest uppercase font-sans text-cc-text/30 mt-1 capitalize">{mes} {año}</p>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2
                      className="font-display text-cc-text leading-tight mb-2"
                      style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, fontStyle: 'italic' }}
                    >
                      {evento.titulo}
                    </h2>
                    <p className="font-sans text-cc-text/35 text-sm">{evento.lugar}</p>
                  </div>

                  {/* Precio y cupos */}
                  <div className="md:text-right shrink-0">
                    <p className="font-sans text-cc-text text-sm mb-1">
                      desde ${Number(evento.precio_comunidad).toLocaleString('es-MX')} MXN
                    </p>
                    <p className="font-sans text-cc-text/30 text-xs tracking-widest uppercase">
                      {evento.capacidad_publica} cupos
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block text-cc-text/20 group-hover:text-cc-text/50 transition-colors duration-300">
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

      {/* Footer */}
      <div className="border-t border-cc-text/8 px-6 md:px-12 py-8 flex items-center justify-between">
        <p className="text-xs font-sans text-cc-text/20 tracking-widest uppercase">Court Culture · Monterrey</p>
        <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-cc-text/25 hover:text-cc-text/50 transition-colors">@courtculture.mty</a>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getEvents, type Event } from '../api'
import { LOGOS, PHOTOS } from '../assets'

function formatDay(dateStr: string) {
  return dateStr.split('-')[2].replace(/^0/, '')
}

function formatMonth(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-MX', { month: 'long' })
}

function formatYear(dateStr: string) {
  return dateStr.split('-')[0]
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  return `${hour % 12 || 12}:${m} ${ampm}`
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => {})
      .finally(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-cc-base min-h-screen">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cc-base/95 backdrop-blur-sm border-b border-cc-text/6">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <img src={LOGOS.main} alt="Court Culture" className="h-7 w-auto" />
          </Link>
          <Link
            to="/"
            className="text-xs tracking-widest uppercase font-sans text-cc-muted hover:text-cc-text transition-colors duration-200"
          >
            ← Inicio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative pt-16 bg-cc-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={PHOTOS[5]}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.12) saturate(0.4)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cc-dark/50 via-cc-dark/70 to-cc-dark" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-white/30 text-xs tracking-[0.25em] uppercase font-sans mb-8"
          >
            Court Culture · Monterrey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(5rem, 12vw, 11rem)', fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.02em' }}
          >
            Eventos.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans font-light text-white/35 text-base mt-8 max-w-xs leading-relaxed"
          >
            Experiencias diseñadas para la comunidad que construye Court Culture.
          </motion.p>
        </div>
      </div>

      {/* Events list */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">

        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-cc-muted rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && events.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p className="font-display text-cc-muted mb-4" style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 300 }}>
              Próximamente.
            </p>
            <p className="font-sans text-cc-muted text-sm mb-10">
              Nuevos eventos en camino. Síguenos para ser el primero en enterarte.
            </p>
            <Link
              to="/"
              className="text-xs tracking-widest uppercase font-sans text-cc-text underline underline-offset-4"
            >
              Volver al inicio
            </Link>
          </motion.div>
        )}

        {!loading && events.length > 0 && (
          <div>
            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[160px_1fr_200px] gap-8 pb-6 border-b border-cc-text/10 mb-0">
              <span className="text-xs tracking-widest uppercase font-sans text-cc-muted">Fecha</span>
              <span className="text-xs tracking-widest uppercase font-sans text-cc-muted">Evento</span>
              <span className="text-xs tracking-widest uppercase font-sans text-cc-muted text-right">Precio</span>
            </div>

            {events.map((event, i) => {
              const isEarlyBird = event.precio_actual < parseFloat(event.precio_regular)
              const sold = event.cupos_disponibles === 0

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <Link
                    to={`/eventos/${event.id}`}
                    className={`group block border-b border-cc-text/8 py-10 md:py-14 transition-all duration-500 hover:bg-cc-light/60 -mx-6 px-6 ${sold ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <div className="md:grid md:grid-cols-[160px_1fr_200px] gap-8 items-center">

                      {/* Date */}
                      <div className="mb-6 md:mb-0">
                        <div className="flex items-baseline gap-2 md:flex-col md:gap-0">
                          <span
                            className="font-display text-cc-accent leading-none"
                            style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', fontWeight: 300 }}
                          >
                            {formatDay(event.fecha)}
                          </span>
                          <div className="md:mt-1">
                            <span className="font-sans text-cc-muted text-sm capitalize block">
                              {formatMonth(event.fecha)}
                            </span>
                            <span className="font-sans text-cc-muted/50 text-xs">
                              {formatYear(event.fecha)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {isEarlyBird && (
                            <span className="text-xs font-sans font-medium tracking-widest uppercase bg-cc-dark text-cc-base px-3 py-1">
                              Early Bird
                            </span>
                          )}
                          {sold ? (
                            <span className="text-xs font-sans tracking-widest uppercase border border-cc-text/15 text-cc-muted px-3 py-1">
                              Agotado
                            </span>
                          ) : (
                            <span className="text-xs font-sans text-cc-muted">
                              {event.cupos_disponibles} cupos disponibles
                            </span>
                          )}
                        </div>

                        <h2
                          className="font-display text-cc-text leading-tight mb-3 group-hover:text-cc-green transition-colors duration-300"
                          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontStyle: 'italic', fontWeight: 300 }}
                        >
                          {event.titulo}
                        </h2>

                        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-cc-muted font-sans">
                          <span>{formatTime(event.hora)}</span>
                          <span>·</span>
                          <span>{event.lugar}</span>
                        </div>
                      </div>

                      {/* Price + CTA */}
                      <div className="mt-6 md:mt-0 md:text-right">
                        <div className="mb-3">
                          <span
                            className="font-display text-cc-text"
                            style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)', fontWeight: 400 }}
                          >
                            ${Math.round(event.precio_actual).toLocaleString('es-MX')}
                          </span>
                          <span className="text-cc-muted font-sans text-sm ml-2">MXN</span>
                        </div>
                        {isEarlyBird && (
                          <p className="text-xs font-sans text-cc-muted mb-4 md:mb-0">
                            Regular ${parseFloat(event.precio_regular).toLocaleString('es-MX')}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-cc-text group-hover:gap-3 transition-all duration-300 mt-3">
                          Ver evento
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7v10"/>
                          </svg>
                        </span>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div className="border-t border-cc-text/8 py-10 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img src={LOGOS.main} alt="Court Culture" className="h-6 w-auto opacity-40" />
          <span className="text-xs font-sans text-cc-muted tracking-widest uppercase">Monterrey, México</span>
        </div>
      </div>

    </div>
  )
}

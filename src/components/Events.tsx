import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getEvents, type Event } from '../api'

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour % 12 || 12
  return `${display}:${m} ${ampm}`
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null
  if (events.length === 0) return null

  return (
    <section id="eventos" className="bg-cc-base py-28 md:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-cc-muted text-xs tracking-widest uppercase font-sans mb-6"
          >
            Próximos eventos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-cc-text leading-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            En cancha.
          </motion.h2>
        </div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, i) => {
            const isEarlyBird = event.precio_actual < parseFloat(event.precio_regular)
            const cuposLeft = event.cupos_disponibles
            const sold = cuposLeft === 0

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <Link
                  to={`/eventos/${event.id}`}
                  className={`group block border border-cc-text/10 hover:border-cc-text/30 transition-all duration-300 overflow-hidden ${sold ? 'opacity-60 pointer-events-none' : ''}`}
                >
                  {/* Image */}
                  {event.imagen ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={event.imagen}
                        alt={event.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-cc-dark relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cc-green/40 to-cc-dark" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-white/10 text-8xl font-light italic">CC</span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8">
                    {/* Tags */}
                    <div className="flex items-center gap-3 mb-5">
                      {isEarlyBird && (
                        <span className="text-xs font-sans font-medium tracking-widest uppercase bg-cc-dark text-cc-base px-3 py-1">
                          Early Bird
                        </span>
                      )}
                      {sold ? (
                        <span className="text-xs font-sans font-medium tracking-widest uppercase border border-cc-text/20 text-cc-muted px-3 py-1">
                          Agotado
                        </span>
                      ) : (
                        <span className="text-xs font-sans text-cc-muted tracking-wide">
                          {cuposLeft} cupo{cuposLeft !== 1 ? 's' : ''} disponible{cuposLeft !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display text-cc-text mb-4 leading-tight"
                      style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400 }}
                    >
                      {event.titulo}
                    </h3>

                    {/* Details */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm text-cc-muted font-sans font-light">
                      <span>{formatDate(event.fecha)}</span>
                      <span>·</span>
                      <span>{formatTime(event.hora)}</span>
                      <span>·</span>
                      <span>{event.lugar}</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-cc-text/10">
                      <div>
                        <span className="font-display text-cc-text" style={{ fontSize: '2rem', fontWeight: 400 }}>
                          ${Math.round(event.precio_actual).toLocaleString('es-MX')}
                        </span>
                        <span className="text-cc-muted font-sans text-sm ml-2">MXN</span>
                        {isEarlyBird && (
                          <div className="text-cc-muted font-sans text-xs mt-1">
                            Regular ${parseFloat(event.precio_regular).toLocaleString('es-MX')} MXN
                          </div>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-2 text-cc-text text-xs tracking-widest uppercase font-sans group-hover:gap-3 transition-all duration-300">
                        Ver más
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      </div>
    </section>
  )
}

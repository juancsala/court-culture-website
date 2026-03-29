import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getEvent, createCheckout, type Event } from '../api'
import { LOGOS } from '../assets'

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour % 12 || 12
  return `${display}:${m} ${ampm}`
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    nivel_tenis: '',
  })

  useEffect(() => {
    if (!id) return
    getEvent(Number(id))
      .then(setEvent)
      .catch(() => setError('Evento no encontrado'))
      .finally(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return
    setSubmitting(true)
    setError('')
    try {
      const { checkout_url } = await createCheckout(event.id, form)
      window.location.href = checkout_url
    } catch (err: any) {
      setError(err.message || 'Error al procesar el registro')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cc-base flex items-center justify-center">
        <div className="w-px h-16 bg-cc-text/20 animate-pulse" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-cc-base flex flex-col items-center justify-center gap-6">
        <p className="font-sans text-cc-muted">Evento no encontrado.</p>
        <Link to="/" className="text-xs tracking-widest uppercase font-sans text-cc-text underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const isEarlyBird = event.precio_actual < parseFloat(event.precio_regular)
  const sold = event.cupos_disponibles === 0

  return (
    <div className="bg-cc-base min-h-screen">

      {/* Navbar minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cc-base/95 backdrop-blur-sm border-b border-cc-text/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <img src={LOGOS.main} alt="Court Culture" className="h-7 w-auto" />
          </Link>
          <Link
            to="/#eventos"
            className="text-xs tracking-widest uppercase font-sans text-cc-muted hover:text-cc-text transition-colors duration-200"
          >
            ← Eventos
          </Link>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero image */}
        <div className="aspect-[21/9] max-h-[520px] overflow-hidden relative">
          {event.imagen ? (
            <img src={event.imagen} alt={event.titulo} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-cc-dark relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cc-green/30 to-cc-dark" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-white/5 text-[20vw] font-light italic leading-none">CC</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cc-base via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-[1fr_420px] gap-16">

          {/* Left — Event info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {isEarlyBird && (
                  <span className="text-xs font-sans font-medium tracking-widest uppercase bg-cc-dark text-cc-base px-3 py-1">
                    Early Bird
                  </span>
                )}
                {sold && (
                  <span className="text-xs font-sans font-medium tracking-widest uppercase border border-cc-text/20 text-cc-muted px-3 py-1">
                    Agotado
                  </span>
                )}
              </div>

              {/* Title */}
              <h1
                className="font-display text-cc-text leading-none mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontStyle: 'italic', fontWeight: 300 }}
              >
                {event.titulo}
              </h1>

              {/* Meta */}
              <div className="grid sm:grid-cols-3 gap-6 mb-12 border-t border-b border-cc-text/10 py-8">
                <div>
                  <p className="text-xs tracking-widest uppercase font-sans text-cc-muted mb-2">Fecha</p>
                  <p className="font-sans text-cc-text capitalize">{formatDate(event.fecha)}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase font-sans text-cc-muted mb-2">Hora</p>
                  <p className="font-sans text-cc-text">{formatTime(event.hora)}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase font-sans text-cc-muted mb-2">Lugar</p>
                  <p className="font-sans text-cc-text">{event.lugar}</p>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-cc-muted leading-relaxed text-base max-w-prose">
                {event.descripcion}
              </p>

              {/* Cupos */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex-1 bg-cc-light rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-cc-dark transition-all duration-500"
                    style={{ width: `${((event.capacidad - event.cupos_disponibles) / event.capacidad) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-sans text-cc-muted whitespace-nowrap">
                  {event.cupos_disponibles} de {event.capacidad} cupos
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right — Registration form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:sticky md:top-24 self-start"
          >
            <div className="border border-cc-text/10 p-8">
              {/* Price */}
              <div className="mb-8 pb-8 border-b border-cc-text/10">
                <p className="text-xs tracking-widest uppercase font-sans text-cc-muted mb-3">Precio</p>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-cc-text" style={{ fontSize: '2.5rem', fontWeight: 400 }}>
                    ${Math.round(event.precio_actual).toLocaleString('es-MX')}
                  </span>
                  <span className="font-sans text-cc-muted">MXN</span>
                </div>
                {isEarlyBird && (
                  <p className="text-xs font-sans text-cc-muted mt-2">
                    Precio regular ${parseFloat(event.precio_regular).toLocaleString('es-MX')} MXN · Early bird activo
                  </p>
                )}
              </div>

              {sold ? (
                <div className="text-center py-8">
                  <p className="font-sans text-cc-muted text-sm mb-4">Este evento está agotado.</p>
                  <a
                    href="https://tinyurl.com/courtculturemty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-cc-text underline"
                  >
                    Únete a la lista de espera →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-cc-muted mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                      className="w-full border border-cc-text/15 bg-transparent px-4 py-3 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-muted/40"
                      placeholder="Juan Sala"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-cc-muted mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border border-cc-text/15 bg-transparent px-4 py-3 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-muted/40"
                      placeholder="juan@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-cc-muted mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.telefono}
                      onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                      className="w-full border border-cc-text/15 bg-transparent px-4 py-3 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-muted/40"
                      placeholder="+52 81 1234 5678"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-cc-muted mb-2">
                      Nivel de tenis
                    </label>
                    <select
                      required
                      value={form.nivel_tenis}
                      onChange={e => setForm(f => ({ ...f, nivel_tenis: e.target.value }))}
                      className="w-full border border-cc-text/15 bg-cc-base px-4 py-3 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors appearance-none"
                    >
                      <option value="">Selecciona tu nivel</option>
                      <option value="principiante">Principiante</option>
                      <option value="intermedio">Intermedio</option>
                      <option value="avanzado">Avanzado</option>
                    </select>
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs font-sans">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 bg-cc-dark text-cc-base px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-cc-green transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Redirigiendo...' : 'Reservar lugar →'}
                  </button>

                  <p className="text-xs font-sans text-cc-muted text-center leading-relaxed">
                    Pago seguro vía Stripe. Reembolso disponible hasta {event.refund_deadline ? new Date(event.refund_deadline).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' }) : 'fecha límite'}.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

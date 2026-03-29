import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getEvent, createCheckout, type Event } from '../api'
import { LOGOS, PHOTOS } from '../assets'

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  return `${hour % 12 || 12}:${m} ${ampm}`
}

function formatDay(dateStr: string) {
  return dateStr.split('-')[2].replace(/^0/, '')
}

function formatMonth(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-MX', { month: 'long' })
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
      <div className="min-h-screen bg-cc-dark flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-white/30 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-cc-base flex flex-col items-center justify-center gap-6">
        <p className="font-sans text-cc-muted">Evento no encontrado.</p>
        <Link to="/eventos" className="text-xs tracking-widest uppercase font-sans text-cc-text underline">
          Ver todos los eventos
        </Link>
      </div>
    )
  }

  const isEarlyBird = event.precio_actual < parseFloat(event.precio_regular)
  const sold = event.cupos_disponibles === 0
  const capacityPct = ((event.capacidad - event.cupos_disponibles) / event.capacidad) * 100
  const refundDate = event.refund_deadline
    ? new Date(event.refund_deadline).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })
    : null

  return (
    <div className="bg-cc-base min-h-screen">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cc-base/96 backdrop-blur-md border-b border-cc-text/6">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <img src={LOGOS.main} alt="Court Culture" className="h-7 w-auto" />
          </Link>
          <Link
            to="/eventos"
            className="text-xs tracking-widest uppercase font-sans text-cc-muted hover:text-cc-text transition-colors duration-200"
          >
            ← Eventos
          </Link>
        </div>
      </nav>

      {/* Full-bleed hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {event.imagen ? (
          <img src={event.imagen} alt={event.titulo} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-cc-dark relative">
            <img
              src={PHOTOS[0]}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.25) saturate(0.5)' }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cc-dark via-cc-dark/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-cc-dark/50 to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:px-16 md:pb-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {isEarlyBird && (
                <span className="text-xs font-sans font-medium tracking-widest uppercase bg-white text-cc-dark px-3 py-1">
                  Early Bird
                </span>
              )}
              {sold && (
                <span className="text-xs font-sans tracking-widest uppercase border border-white/30 text-white/60 px-3 py-1">
                  Agotado
                </span>
              )}
            </div>
            <h1
              className="font-display text-white leading-none mb-4"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.02em' }}
            >
              {event.titulo}
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/45 font-sans font-light capitalize">
              <span>{formatDate(event.fecha)}</span>
              <span>·</span>
              <span>{formatTime(event.hora)}</span>
              <span>·</span>
              <span>{event.lugar}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-[1fr_400px] gap-16 lg:gap-24">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Date display */}
          <div className="flex items-baseline gap-4 mb-16 pb-16 border-b border-cc-text/8">
            <span
              className="font-display text-cc-accent leading-none"
              style={{ fontSize: 'clamp(5rem, 10vw, 9rem)', fontWeight: 300 }}
            >
              {formatDay(event.fecha)}
            </span>
            <div>
              <p className="font-sans text-cc-muted text-lg capitalize">{formatMonth(event.fecha)}</p>
              <p className="font-sans text-cc-muted/40 text-sm">{event.fecha.split('-')[0]}</p>
            </div>
          </div>

          {/* Description */}
          <p className="font-sans text-cc-muted leading-[1.85] text-base max-w-prose mb-16">
            {event.descripcion}
          </p>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 border border-cc-text/8">
            {[
              { label: 'Hora de inicio', value: formatTime(event.hora) },
              { label: 'Ubicación', value: event.lugar },
              { label: 'Capacidad total', value: `${event.capacidad} personas` },
              { label: 'Cupos disponibles', value: sold ? 'Agotado' : `${event.cupos_disponibles} cupos` },
            ].map((item, i) => (
              <div key={i} className="p-6 border-b border-r border-cc-text/8">
                <p className="text-xs tracking-widest uppercase font-sans text-cc-muted mb-2">{item.label}</p>
                <p className="font-sans text-cc-text text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Capacity bar */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 bg-cc-light h-0.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cc-dark rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${capacityPct}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="text-xs font-sans text-cc-muted whitespace-nowrap">
              {Math.round(capacityPct)}% ocupado
            </span>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:sticky md:top-24 self-start"
        >
          <div className="bg-cc-dark p-8 md:p-10">

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-white/8">
              <p className="text-xs tracking-[0.2em] uppercase font-sans text-white/30 mb-4">
                {isEarlyBird ? 'Precio Early Bird' : 'Precio'}
              </p>
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display text-white"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 300 }}
                >
                  ${Math.round(event.precio_actual).toLocaleString('es-MX')}
                </span>
                <span className="font-sans text-white/40 text-sm">MXN</span>
              </div>
              {isEarlyBird && (
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-white/25 font-sans text-sm line-through">
                    ${parseFloat(event.precio_regular).toLocaleString('es-MX')}
                  </span>
                  <span className="text-xs font-sans text-white/25">precio regular</span>
                </div>
              )}
            </div>

            {sold ? (
              <div className="text-center py-10">
                <p className="font-display text-white/40 mb-8" style={{ fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 300 }}>
                  Evento agotado.
                </p>
                <a
                  href="https://tinyurl.com/courtculturemty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-white/40 hover:text-white transition-colors duration-200 underline underline-offset-4"
                >
                  Lista de espera →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { label: 'Nombre completo', key: 'nombre', type: 'text', placeholder: 'Tu nombre' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'tu@email.com' },
                  { label: 'Teléfono', key: 'telefono', type: 'tel', placeholder: '+52 81 1234 5678' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs tracking-widest uppercase font-sans text-white/30 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full border border-white/10 bg-white/5 px-4 py-3.5 font-sans text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/15"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans text-white/30 mb-2">
                    Nivel de tenis
                  </label>
                  <select
                    required
                    value={form.nivel_tenis}
                    onChange={e => setForm(f => ({ ...f, nivel_tenis: e.target.value }))}
                    className="w-full border border-white/10 bg-cc-dark px-4 py-3.5 font-sans text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none"
                  >
                    <option value="">Selecciona tu nivel</option>
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-sans">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 bg-white text-cc-dark px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-base transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Procesando...' : 'Reservar lugar →'}
                </button>

                <p className="text-xs font-sans text-white/18 text-center leading-relaxed">
                  Pago seguro vía Stripe.
                  {refundDate && ` Reembolso disponible hasta el ${refundDate}.`}
                </p>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  )
}

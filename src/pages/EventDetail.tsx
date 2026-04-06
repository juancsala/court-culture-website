import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getEvent, verificarMiembro, createCheckout, Event } from '../api'
import { LOGOS } from '../assets'

function formatFecha(fecha: string) {
  const d = new Date(fecha + 'T12:00:00')
  return d.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

type Step = 'email' | 'form' | 'bloqueado'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const [evento, setEvento] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<Step>('email')
  const [esMiembro, setEsMiembro] = useState(false)
  const [soloMiembros, setSoloMiembros] = useState(false)
  const [email, setEmail] = useState('')
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', nivel_tenis: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    getEvent(Number(id))
      .then(setEvento)
      .catch(() => setEvento(null))
      .finally(() => setLoading(false))
  }, [id])

  async function handleVerificarEmail(e: React.FormEvent) {
    e.preventDefault()
    setCheckingEmail(true)
    setError('')
    try {
      const { es_miembro } = await verificarMiembro(email)
      setEsMiembro(es_miembro)
      setForm(f => ({ ...f, email }))

      if (!evento) return

      if (!evento.acceso_publico && !evento.acceso_comunidad) {
        setSoloMiembros(false)
        setStep('bloqueado')
      } else if (!evento.acceso_publico && !es_miembro) {
        setSoloMiembros(true)
        setStep('bloqueado')
      } else {
        setStep('form')
      }
    } catch {
      setError('Error al verificar. Intenta de nuevo.')
    } finally {
      setCheckingEmail(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!evento) return
    setSubmitting(true)
    setError('')
    try {
      const { checkout_url } = await createCheckout(evento.id, form)
      window.location.href = checkout_url
    } catch (err: any) {
      setError(err.message || 'Error al procesar el pago')
      setSubmitting(false)
    }
  }

  const labelClass = 'text-xs tracking-[0.18em] uppercase font-sans text-cc-text/40 block mb-2'
  const inputClass = 'w-full bg-cc-text/[0.04] border border-cc-text/10 text-cc-text placeholder-cc-text/20 px-4 py-3.5 font-sans text-sm focus:outline-none focus:border-cc-text/30 transition-colors duration-200'

  if (loading) {
    return (
      <div className="min-h-screen bg-cc-base flex items-center justify-center">
        <p className="text-cc-text/20 text-xs tracking-widest uppercase font-sans">Cargando...</p>
      </div>
    )
  }

  if (!evento) {
    return (
      <div className="min-h-screen bg-cc-base flex items-center justify-center">
        <div className="text-center">
          <p className="text-cc-text/30 text-xs tracking-widest uppercase font-sans mb-4">Evento no encontrado</p>
          <a href="/eventos" className="text-cc-text/50 text-sm font-sans hover:text-cc-text transition-colors">← Volver a eventos</a>
        </div>
      </div>
    )
  }

  const precio = esMiembro ? Number(evento.precio_comunidad) : Number(evento.precio_general)

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      {/* Navbar */}
      <nav className="border-b border-cc-text/5 px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="/eventos">
          <img src={LOGOS.main} alt="Court Culture" className="h-10 w-auto" />
        </a>
        <a href="/eventos" className="text-xs tracking-widest uppercase font-sans text-cc-text/30 hover:text-cc-text transition-colors duration-200">
          ← Eventos
        </a>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — Detalles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {evento.imagen && (
              <div className="aspect-[4/3] overflow-hidden mb-10">
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-5">
              Court Culture · Monterrey
            </p>
            <h1
              className="font-display text-cc-text leading-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              {evento.titulo}
            </h1>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <span className="text-cc-text/20 text-xs tracking-widest uppercase font-sans pt-0.5 w-16 shrink-0">Fecha</span>
                <span className="font-sans text-cc-text/70 text-sm capitalize">{formatFecha(evento.fecha)}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-cc-text/20 text-xs tracking-widest uppercase font-sans pt-0.5 w-16 shrink-0">Lugar</span>
                <span className="font-sans text-cc-text/70 text-sm">{evento.lugar}{evento.direccion ? ` · ${evento.direccion}` : ''}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-cc-text/20 text-xs tracking-widest uppercase font-sans pt-0.5 w-16 shrink-0">Cupos</span>
                <span className="font-sans text-cc-text/70 text-sm">{evento.cupos_disponibles} disponibles</span>
              </div>
            </div>

            <div className="h-px bg-cc-text/5 mb-8" />

            <p className="font-sans text-cc-text/50 text-sm leading-relaxed">
              {evento.descripcion}
            </p>
          </motion.div>

          {/* Right — Registro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border border-cc-text/8 p-8 md:p-10">

              {step === 'email' && (
                <>
                  <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30 mb-6">Registro</p>
                  <h2
                    className="font-display text-cc-text mb-2 leading-tight"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                  >
                    Reserva tu lugar
                  </h2>
                  <p className="font-sans text-cc-text/40 text-sm leading-relaxed mb-8">
                    Ingresa tu correo para verificar si tienes acceso preferencial como miembro de la comunidad.
                  </p>

                  {/* Precios */}
                  <div className="bg-cc-text/[0.03] border border-cc-text/5 p-5 mb-8 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-xs tracking-widest uppercase text-cc-text/30">Miembros</span>
                      <span className="font-sans text-cc-text text-sm">${Number(evento.precio_comunidad).toLocaleString('es-MX')} MXN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-xs tracking-widest uppercase text-cc-text/30">General</span>
                      <span className="font-sans text-cc-text/60 text-sm">${Number(evento.precio_general).toLocaleString('es-MX')} MXN</span>
                    </div>
                  </div>

                  <form onSubmit={handleVerificarEmail} className="flex flex-col gap-4">
                    <div>
                      <label className={labelClass}>Correo electrónico</label>
                      <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    {error && <p className="text-red-400 text-xs font-sans">{error}</p>}
                    <button
                      type="submit"
                      disabled={checkingEmail}
                      className="w-full bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/90 transition-colors duration-300 disabled:opacity-40"
                    >
                      {checkingEmail ? 'Verificando...' : 'Continuar →'}
                    </button>
                  </form>

                  <p className="font-sans text-cc-text/25 text-xs leading-relaxed mt-6">
                    Los miembros de la comunidad tienen acceso anticipado y precio preferencial.{' '}
                    <a href="/comunidad" className="text-cc-text/40 underline hover:text-cc-text/60 transition-colors">
                      Únete gratis aquí.
                    </a>
                  </p>
                </>
              )}

              {step === 'bloqueado' && (
                <>
                  <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30 mb-6">Acceso</p>
                  {soloMiembros ? (
                    <>
                      <h2
                        className="font-display text-cc-text mb-4 leading-tight"
                        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                      >
                        Solo miembros por ahora.
                      </h2>
                      <p className="font-sans text-cc-text/40 text-sm leading-relaxed mb-8">
                        La venta está abierta únicamente para miembros de la comunidad. Regístrate gratis para acceder al precio preferencial y comprar tu lugar.
                      </p>
                      <a
                        href="/comunidad"
                        className="block w-full text-center bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/90 transition-colors duration-300 mb-4"
                      >
                        Unirme a la comunidad →
                      </a>
                      <button
                        onClick={() => setStep('email')}
                        className="w-full text-cc-text/30 text-xs font-sans hover:text-cc-text/50 transition-colors"
                      >
                        ← Volver
                      </button>
                    </>
                  ) : (
                    <>
                      <h2
                        className="font-display text-cc-text mb-4 leading-tight"
                        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                      >
                        Próximamente.
                      </h2>
                      <p className="font-sans text-cc-text/40 text-sm leading-relaxed mb-8">
                        La venta aún no está disponible. Regístrate en la comunidad para ser el primero en saber cuándo abren los cupos.
                      </p>
                      <a
                        href="/comunidad"
                        className="block w-full text-center border border-cc-text/20 text-cc-text/60 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:border-cc-text/40 hover:text-cc-text transition-colors duration-300"
                      >
                        Unirme a la comunidad →
                      </a>
                    </>
                  )}
                </>
              )}

              {step === 'form' && (
                <>
                  <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30 mb-6">
                    {esMiembro ? '✓ Miembro · Precio preferencial' : 'Registro · Precio general'}
                  </p>
                  <div className="flex justify-between items-baseline mb-8">
                    <h2
                      className="font-display text-cc-text leading-tight"
                      style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                    >
                      Tus datos
                    </h2>
                    <span className="font-sans text-cc-text text-lg">${precio.toLocaleString('es-MX')} MXN</span>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className={labelClass}>Nombre completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Juan García"
                        value={form.nombre}
                        onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        readOnly
                        className={inputClass + ' opacity-50 cursor-not-allowed'}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Teléfono</label>
                      <input
                        type="tel"
                        required
                        placeholder="+52 81 1234 5678"
                        value={form.telefono}
                        onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Nivel de tenis</label>
                      <select
                        required
                        value={form.nivel_tenis}
                        onChange={e => setForm(f => ({ ...f, nivel_tenis: e.target.value }))}
                        className={inputClass + ' cursor-pointer'}
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="">Selecciona tu nivel</option>
                        <option value="principiante">Principiante</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                      </select>
                    </div>

                    {error && <p className="text-red-400 text-xs font-sans">{error}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/90 transition-colors duration-300 disabled:opacity-40 mt-2"
                    >
                      {submitting ? 'Redirigiendo...' : `Pagar $${precio.toLocaleString('es-MX')} MXN →`}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="text-cc-text/25 text-xs font-sans hover:text-cc-text/40 transition-colors"
                    >
                      ← Cambiar email
                    </button>
                  </form>
                </>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

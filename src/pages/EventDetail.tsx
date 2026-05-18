import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getEvent, verificarMiembro, createCheckout, unirseWaitlist, Event } from '../api'
import Navbar from '../components/Navbar'

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
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistDone, setWaitlistDone] = useState(false)
  const [waitlistLoading, setWaitlistLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', categoria: '' })
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
    setError('')
    setCheckingEmail(true)
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

  const labelClass = 'text-xs tracking-[0.18em] uppercase font-sans text-cc-text/35 block mb-2'
  const inputClass = 'w-full bg-transparent border border-cc-text/15 text-cc-text placeholder-cc-text/25 px-4 py-3.5 font-sans text-sm focus:outline-none focus:border-cc-text/40 transition-colors duration-200'

  if (loading) {
    return (
      <div className="min-h-screen bg-cc-base flex items-center justify-center">
        <p className="text-cc-text/25 text-xs tracking-widest uppercase font-sans">Cargando...</p>
      </div>
    )
  }

  if (!evento) {
    return (
      <div className="min-h-screen bg-cc-base flex items-center justify-center">
        <div className="text-center">
          <p className="text-cc-text/30 text-xs tracking-widest uppercase font-sans mb-4">Evento no encontrado</p>
          <a href="/eventos" className="text-cc-text/40 text-sm font-sans hover:text-cc-text transition-colors">← Volver a eventos</a>
        </div>
      </div>
    )
  }

  const precio = esMiembro ? Number(evento.precio_comunidad) : Number(evento.precio_general)

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      <Navbar solid />
      <div className="h-16 md:h-20" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

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
                  style={{ filter: 'brightness(0.95) saturate(0.9)' }}
                />
              </div>
            )}

            <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-5">
              Court Culture · Monterrey
            </p>
            <h1
              className="font-display text-cc-text leading-tight mb-10"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              {evento.titulo}
            </h1>

            <div className="mb-10">
              {(() => {
                const clean = evento.descripcion.replace(/\r/g, '')
                const lines = clean.split('\n')
                const qIdx = lines.findIndex(l => l.startsWith('¿Qué esperar?'))
                const parrafo = qIdx > 0 ? lines.slice(0, qIdx).filter(l => l.trim()).join(' ') : clean
                const items = qIdx > 0 ? lines.slice(qIdx + 1).filter(l => l.trim()) : []
                return (
                  <>
                    <p className="font-sans text-cc-text/50 text-sm leading-relaxed mb-6">{parrafo}</p>
                    {items.length > 0 && (
                      <div>
                        <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30 mb-3">¿Qué esperar?</p>
                        <ul className="space-y-1.5">
                          {items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 font-sans text-cc-text/50 text-sm">
                              <span className="text-cc-text/25 mt-0.5">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-6">
                <span className="text-cc-text/25 text-xs tracking-widest uppercase font-sans pt-0.5 w-16 shrink-0">Fecha</span>
                <span className="font-sans text-cc-text/60 text-sm capitalize">{formatFecha(evento.fecha)}</span>
              </div>
              <div className="flex items-start gap-6">
                <span className="text-cc-text/25 text-xs tracking-widest uppercase font-sans pt-0.5 w-16 shrink-0">Lugar</span>
                <span className="font-sans text-cc-text/60 text-sm">{evento.lugar}{evento.direccion ? ` · ${evento.direccion}` : ''}</span>
              </div>
              <div className="flex items-start gap-6">
                <span className="text-cc-text/25 text-xs tracking-widest uppercase font-sans pt-0.5 w-16 shrink-0">Cupos</span>
                <span className="font-sans text-cc-text/60 text-sm">{evento.capacidad_publica} lugares</span>
              </div>
              <div className="flex items-start gap-6">
                <span className="text-cc-text/25 text-xs tracking-widest uppercase font-sans pt-0.5 w-16 shrink-0">Precio</span>
                <div>
                  <span className="font-sans text-cc-text/60 text-sm">Desde ${Number(evento.precio_comunidad).toLocaleString('es-MX')} MXN</span>
                  <span className="font-sans text-cc-text/30 text-xs ml-2">(miembros)</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-cc-text/8 mb-8" />

            {/* Incluye — solo Court Sessions */}
            {evento.tipo === 'court_session' && <>
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-6"
              >
                Incluye
              </motion.p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Hidratación' },
                  { label: 'Snacks' },
                  { label: 'Cold Plunge' },
                  { label: 'DJ en vivo' },
                  { label: 'Convivencia' },
                  { label: 'Premios' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.12, delay: i * 0.02, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(10,10,10,0.04)', transition: { duration: 0.1 } }}
                    whileTap={{ scale: 0.97, transition: { duration: 0.08 } }}
                    className="flex items-center gap-3 border border-cc-text/8 px-4 py-3 cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full bg-cc-text/20 shrink-0" />
                    <span className="font-sans text-cc-text/55 text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            </>}
          </motion.div>

          {/* Right — Registro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:sticky md:top-8"
          >
            <div className="border border-cc-text/10 p-8 md:p-10 bg-cc-text/[0.02]">

              {evento.cupos_disponibles <= 0 ? (
                <>
                  <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30 mb-6">Registro</p>
                  <h2 className="font-display text-cc-text mb-3 leading-tight"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}>
                    Sold out.
                  </h2>
                  <p className="font-sans text-cc-text/40 text-sm leading-relaxed mb-6">
                    Todos los lugares han sido reservados. Déjanos tu correo y te avisamos si se libera un lugar.
                  </p>
                  {waitlistDone ? (
                    <div className="border border-cc-text/10 p-4 text-center">
                      <p className="font-sans text-cc-text/60 text-sm">✓ Te avisaremos si se libera un lugar.</p>
                    </div>
                  ) : (
                    <form onSubmit={async e => {
                      e.preventDefault()
                      setWaitlistLoading(true)
                      await unirseWaitlist(evento.id, waitlistEmail)
                      setWaitlistDone(true)
                      setWaitlistLoading(false)
                    }} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        value={waitlistEmail}
                        onChange={e => setWaitlistEmail(e.target.value)}
                        className="flex-1 border border-cc-text/15 bg-transparent px-4 py-3 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-text/20"
                      />
                      <button type="submit" disabled={waitlistLoading}
                        className="bg-cc-text text-cc-base px-4 py-3 text-xs tracking-widest uppercase font-sans hover:bg-cc-text/85 transition-colors disabled:opacity-40">
                        {waitlistLoading ? '...' : 'Avisar'}
                      </button>
                    </form>
                  )}
                </>
              ) : null}

              {evento.cupos_disponibles > 0 && step === 'email' && (
                <>
                  <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30 mb-6">Registro</p>
                  <h2
                    className="font-display text-cc-text mb-3 leading-tight"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                  >
                    Reserva tu lugar
                  </h2>
                  <p className="font-sans text-cc-text/40 text-sm leading-relaxed mb-8">
                    Ingresa tu correo para verificar si tienes precio preferencial como miembro.
                  </p>

                  {/* Precios */}
                  <div className="bg-cc-text/[0.03] border border-cc-text/8 p-5 mb-8 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-xs tracking-widest uppercase text-cc-text/30">Miembros</span>
                      <span className="font-sans text-cc-text text-sm">${Number(evento.precio_comunidad).toLocaleString('es-MX')} MXN</span>
                    </div>
                    <div className="h-px bg-cc-text/8" />
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-xs tracking-widest uppercase text-cc-text/30">General</span>
                      <span className="font-sans text-cc-text/50 text-sm">${Number(evento.precio_general).toLocaleString('es-MX')} MXN</span>
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
                    {error && <p className="text-red-500 text-xs font-sans">{error}</p>}
                    <button
                      type="submit"
                      disabled={checkingEmail}
                      className="w-full bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 disabled:opacity-40"
                    >
                      {checkingEmail ? 'Verificando...' : 'Continuar →'}
                    </button>
                  </form>

                  <p className="font-sans text-cc-text/25 text-xs leading-relaxed mt-6">
                    Los miembros tienen precio preferencial y acceso anticipado.{' '}
                    <a href="/comunidad" className="text-cc-text/40 underline hover:text-cc-text/60 transition-colors">
                      Únete gratis aquí.
                    </a>
                  </p>
                </>
              )}

              {evento.cupos_disponibles > 0 && step === 'bloqueado' && (
                <>
                  <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/30 mb-6">Acceso</p>
                  {soloMiembros ? (
                    // Community open but user is not a member
                    <>
                      <h2
                        className="font-display text-cc-text mb-4 leading-tight"
                        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                      >
                        Solo miembros<br />por ahora.
                      </h2>
                      <p className="font-sans text-cc-text/40 text-sm leading-relaxed mb-4">
                        La venta está abierta únicamente para miembros de la comunidad.
                      </p>
                      {evento.fecha_apertura_publica && (
                        <div className="bg-cc-text/[0.04] border border-cc-text/8 px-4 py-3 mb-6">
                          <p className="font-sans text-cc-text/35 text-xs tracking-widest uppercase mb-1">Venta general abre</p>
                          <p className="font-sans text-cc-text/70 text-sm capitalize">
                            {new Date(evento.fecha_apertura_publica).toLocaleDateString('es-MX', {
                              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                            })}
                          </p>
                        </div>
                      )}
                      <a
                        href="/comunidad"
                        className="block w-full text-center bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 mb-4"
                      >
                        Registrarme como miembro →
                      </a>
                      <button
                        onClick={() => setStep('email')}
                        className="w-full text-cc-text/25 text-xs font-sans hover:text-cc-text/45 transition-colors py-2"
                      >
                        ← Volver
                      </button>
                    </>
                  ) : (
                    // Neither access is open yet
                    <>
                      <h2
                        className="font-display text-cc-text mb-4 leading-tight"
                        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                      >
                        Próximamente.
                      </h2>
                      <p className="font-sans text-cc-text/40 text-sm leading-relaxed mb-5">
                        {esMiembro
                          ? 'Tu acceso como miembro estará disponible pronto.'
                          : 'La venta aún no está disponible. Los miembros tienen acceso anticipado.'}
                      </p>

                      <div className="space-y-3 mb-8">
                        {evento.fecha_apertura_comunidad && (
                          <div className="bg-cc-text/[0.04] border border-cc-text/8 px-4 py-3">
                            <p className="font-sans text-cc-text/35 text-xs tracking-widest uppercase mb-1">
                              {esMiembro ? 'Tu acceso abre' : 'Venta para miembros'}
                            </p>
                            <p className="font-sans text-cc-text/70 text-sm capitalize">
                              {new Date(evento.fecha_apertura_comunidad).toLocaleDateString('es-MX', {
                                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                              })}{' '}
                              a las {new Date(evento.fecha_apertura_comunidad).toLocaleTimeString('es-MX', {
                                hour: '2-digit', minute: '2-digit', hour12: true
                              })}
                            </p>
                          </div>
                        )}
                        {evento.fecha_apertura_publica && !esMiembro && (
                          <div className="bg-cc-text/[0.02] border border-cc-text/6 px-4 py-3">
                            <p className="font-sans text-cc-text/25 text-xs tracking-widest uppercase mb-1">Venta general</p>
                            <p className="font-sans text-cc-text/45 text-sm capitalize">
                              {new Date(evento.fecha_apertura_publica).toLocaleDateString('es-MX', {
                                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                              })}{' '}
                              a las {new Date(evento.fecha_apertura_publica).toLocaleTimeString('es-MX', {
                                hour: '2-digit', minute: '2-digit', hour12: true
                              })}
                            </p>
                          </div>
                        )}
                      </div>

                      {!esMiembro && (
                        <a
                          href="/comunidad"
                          className="block w-full text-center bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 mb-3"
                        >
                          Registrarme como miembro →
                        </a>
                      )}
                      <button
                        onClick={() => setStep('email')}
                        className="w-full text-cc-text/25 text-xs font-sans hover:text-cc-text/45 transition-colors py-2"
                      >
                        ← Volver
                      </button>
                    </>
                  )}
                </>
              )}

              {evento.cupos_disponibles > 0 && step === 'form' && (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-cc-text/40" />
                    <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/40">
                      {esMiembro ? 'Miembro · Precio preferencial' : 'Precio general'}
                    </p>
                  </div>
                  <div className="flex justify-between items-baseline mb-8">
                    <h2
                      className="font-display text-cc-text leading-tight"
                      style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                    >
                      Tus datos
                    </h2>
                    <span className="font-display text-cc-text text-2xl" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                      ${precio.toLocaleString('es-MX')}
                    </span>
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
                        value={form.email}
                        readOnly
                        className={inputClass + ' opacity-40 cursor-not-allowed'}
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
                      <label className={labelClass}>Categoría</label>
                      <select
                        required
                        value={form.categoria}
                        onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
                        className={inputClass + ' cursor-pointer bg-cc-base'}
                      >
                        <option value="">Selecciona tu categoría</option>
                        <option value="A">A — Avanzado</option>
                        <option value="B">B — Avanzado</option>
                        <option value="C">C — Intermedio</option>
                        <option value="D">D — Básico</option>
                      </select>
                    </div>

                    {error && <p className="text-red-500 text-xs font-sans">{error}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 disabled:opacity-40 mt-2"
                    >
                      {submitting ? 'Redirigiendo...' : `Pagar $${precio.toLocaleString('es-MX')} MXN →`}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="text-cc-text/25 text-xs font-sans hover:text-cc-text/45 transition-colors py-1"
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

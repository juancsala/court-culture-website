import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LOGOS } from '../assets'

const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

const inputClass = 'w-full border border-cc-text/15 bg-transparent px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-text/20'
const labelClass = 'block text-xs tracking-[0.18em] uppercase font-sans text-cc-text/35 mb-2'

const RAZONES = [
  'Aumentar la visibilidad de mi marca',
  'Conectar con una comunidad activa y deportiva',
  'Vender productos o servicios en un entorno afín',
  'Asociarme con una propuesta joven y auténtica',
  'Otro',
]

const COMO_PARTICIPAR = [
  'Expositor con stand',
  'Sponsor del evento',
  'Colaborador con productos o premios',
  'Patrocinio de contenido / redes sociales',
  'Otro',
]

export default function SponsorsPage() {
  const [form, setForm] = useState({
    nombre_marca: '',
    tipo_producto: '',
    instagram_web: '',
    nombre_contacto: '',
    email: '',
    telefono: '',
    como_participar: '',
    mensaje: '',
  })
  const [razones, setRazones] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  function toggleRazon(r: string) {
    setRazones(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
  }

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (razones.length === 0) { setError('Selecciona al menos una razón'); return }
    if (!form.como_participar) { setError('Selecciona cómo te gustaría participar'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/sponsors/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, por_que_sumarse: razones.join(', ') }),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setEnviado(true)
    } catch {
      setError('Error al enviar. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      {/* Navbar */}
      <nav className="bg-cc-dark px-6 md:px-12 py-3 flex items-center justify-between">
        <a href="/"><img src={LOGOS.mainWhite} alt="Court Culture" className="h-16 md:h-24 w-auto object-contain" /></a>
        <a href="/" className="text-xs tracking-[0.2em] uppercase font-sans text-white/50 hover:text-white transition-colors duration-200">← Inicio</a>
      </nav>

      {/* Hero imagen */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src="/web/sponsors-hero.jpg"
          alt="Court Culture comunidad"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-cc-dark/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.25em] uppercase font-sans text-white/50 mb-4"
          >
            Court Culture · Monterrey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic' }}
          >
            Tu marca en<br />nuestros eventos.
          </motion.h1>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-sans text-cc-text/60 text-sm md:text-base leading-relaxed mb-4">
            Si tienes una marca y te gustaría sumarte a nuestros eventos, este formulario es para ti. En cada evento contamos con espacios para marcas que quieran visibilizarse, conectar con la comunidad y formar parte de una experiencia deportiva y social única.
          </p>
          <p className="font-sans text-cc-text/40 text-sm leading-relaxed">
            Llena tus datos y te contactamos con toda la información.
          </p>
        </motion.div>
      </div>

      {/* Formulario o confirmación */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 pb-24">
        <AnimatePresence mode="wait">
          {enviado ? (
            <motion.div
              key="gracias"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 border border-cc-text/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cc-text">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2
                className="font-display text-cc-text leading-none mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, fontStyle: 'italic' }}
              >
                ¡Gracias por tu interés!
              </h2>
              <p className="font-sans text-cc-text/45 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                Recibimos tu solicitud. Pronto nos pondremos en contacto contigo para platicar sobre cómo podemos trabajar juntos.
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center border border-cc-text/20 text-cc-text/60 px-8 py-4 text-xs tracking-widest uppercase font-sans hover:border-cc-text/40 hover:text-cc-text transition-colors duration-300"
              >
                Volver al inicio
              </a>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >

              {/* Datos de la marca */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/50 mb-5">Datos de la marca</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>Nombre de la marca</label>
                    <input type="text" required value={form.nombre_marca} onChange={e => set('nombre_marca', e.target.value)} className={inputClass} placeholder="Court Culture Apparel" />
                  </div>
                  <div>
                    <label className={labelClass}>¿Qué tipo de producto o servicio ofrecen?</label>
                    <textarea rows={2} required value={form.tipo_producto} onChange={e => set('tipo_producto', e.target.value)} className={inputClass + ' resize-none'} placeholder="Ropa deportiva, bebidas, suplementos..." />
                  </div>
                  <div>
                    <label className={labelClass}>Instagram o sitio web <span className="normal-case tracking-normal text-cc-text/20">(opcional)</span></label>
                    <input type="text" value={form.instagram_web} onChange={e => set('instagram_web', e.target.value)} className={inputClass} placeholder="@tumarca o www.tumarca.com" />
                  </div>
                </div>
              </div>

              <div className="h-px bg-cc-text/8" />

              {/* Datos de contacto */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/50 mb-5">Datos de contacto</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>Nombre de contacto</label>
                    <input type="text" required value={form.nombre_contacto} onChange={e => set('nombre_contacto', e.target.value)} className={inputClass} placeholder="Tu nombre" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Email</label>
                      <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} className={inputClass} placeholder="tu@marca.com" />
                    </div>
                    <div>
                      <label className={labelClass}>Teléfono / WhatsApp</label>
                      <input type="tel" required value={form.telefono} onChange={e => set('telefono', e.target.value)} className={inputClass} placeholder="81 1234 5678" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-cc-text/8" />

              {/* ¿Por qué sumarse? */}
              <div>
                <label className={labelClass}>¿Por qué les interesa sumarse? <span className="normal-case tracking-normal text-cc-text/20">(puedes elegir varias)</span></label>
                <div className="flex flex-col gap-2 mt-1">
                  {RAZONES.map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => toggleRazon(r)}
                      className={`text-left px-4 py-3 border text-sm font-sans transition-colors duration-200 ${
                        razones.includes(r)
                          ? 'bg-cc-text text-cc-base border-cc-text'
                          : 'border-cc-text/15 text-cc-text/50 hover:border-cc-text/30 hover:text-cc-text/70'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-cc-text/8" />

              {/* Cómo participar */}
              <div>
                <label className={labelClass}>¿Cómo les gustaría participar?</label>
                <div className="flex flex-col gap-2 mt-1">
                  {COMO_PARTICIPAR.map(op => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => set('como_participar', op)}
                      className={`text-left px-4 py-3 border text-sm font-sans transition-colors duration-200 ${
                        form.como_participar === op
                          ? 'bg-cc-text text-cc-base border-cc-text'
                          : 'border-cc-text/15 text-cc-text/50 hover:border-cc-text/30 hover:text-cc-text/70'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mensaje adicional */}
              <div>
                <label className={labelClass}>Cuéntanos más sobre tu marca <span className="normal-case tracking-normal text-cc-text/20">(opcional)</span></label>
                <textarea rows={3} value={form.mensaje} onChange={e => set('mensaje', e.target.value)} className={inputClass + ' resize-none'} placeholder="Comparte lo que quieras que sepamos..." />
              </div>

              {error && <p className="text-red-500 text-xs font-sans">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 disabled:opacity-40"
              >
                {submitting ? 'Enviando...' : 'Enviar solicitud →'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

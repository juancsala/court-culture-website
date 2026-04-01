import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPreRegistro } from '../api'
import { LOGOS, PHOTOS } from '../assets'
import { LINKS } from '../assets'

const ZONAS = [
  { value: 'monterrey', label: 'Monterrey' },
  { value: 'san_pedro', label: 'San Pedro' },
  { value: 'santa_catarina', label: 'Santa Catarina' },
  { value: 'san_jeronimo', label: 'San Jerónimo' },
  { value: 'cumbres', label: 'Cumbres' },
  { value: 'san_nicolas', label: 'San Nicolás' },
  { value: 'carretera_nacional', label: 'Carretera Nacional' },
  { value: 'otro', label: 'Otro' },
]

const NIVELES = [
  { value: 'nunca', label: 'No he jugado' },
  { value: 'principiante', label: 'Principiante' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'avanzado', label: 'Avanzado' },
]

const REFERIDOS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'amigo', label: 'Un amigo' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'otro', label: 'Otro' },
]

const inputClass =
  'w-full border border-white/10 bg-white/5 px-4 py-3.5 font-sans text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20'
const selectClass =
  'w-full border border-white/10 bg-cc-dark px-4 py-3.5 font-sans text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none'
const labelClass = 'block text-xs tracking-[0.18em] uppercase font-sans text-white/35 mb-2'

export default function PreRegistro() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    email: '',
    telefono: '',
    zona: '',
    nivel: '',
    como_se_entero: '',
    tiene_raqueta: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, value: string | boolean) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await createPreRegistro(form)
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      setError(err.message || 'Error al enviar el formulario')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cc-dark relative overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={PHOTOS[3]}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.18) saturate(0.4)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cc-dark/80 via-transparent to-cc-dark/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <header className="px-6 md:px-12 pt-10 pb-6 flex justify-between items-start">
          <img src={LOGOS.mainWhite} alt="Court Culture" className="h-16 w-auto opacity-90" />
          <span className="text-xs tracking-[0.2em] uppercase font-sans text-white/20 pt-1">
            Vol. I · 2026
          </span>
        </header>

        {/* Main */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg">

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-16"
                >
                  <p className="text-xs tracking-[0.25em] uppercase font-sans text-white/30 mb-8">
                    Pre-registro recibido
                  </p>
                  <h1
                    className="font-display text-white mb-6 leading-none"
                    style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 300, fontStyle: 'italic' }}
                  >
                    Nos vemos<br />en la cancha.
                  </h1>
                  <p className="font-sans text-white/40 text-sm leading-relaxed mb-12 max-w-sm mx-auto">
                    Te avisaremos por correo cuando los cupos estén disponibles. Los pre-registrados tienen acceso prioritario.
                  </p>
                  <a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-white/20 text-white/60 hover:text-white hover:border-white/40 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300"
                  >
                    Unirse a la comunidad →
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Heading */}
                  <div className="mb-10">
                    <p className="text-xs tracking-[0.25em] uppercase font-sans text-white/25 mb-5">
                      Court Culture · Vol. I
                    </p>
                    <h1
                      className="font-display text-white leading-none mb-4"
                      style={{ fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                    >
                      Pre-registro
                    </h1>
                    <p className="font-sans text-white/35 text-sm leading-relaxed">
                      Cupo limitado. Regístrate para recibir acceso prioritario al primer evento presencial de Court Culture en Monterrey.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/8 mb-10" />

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Nombre + Apellido */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Nombre</label>
                        <input
                          type="text"
                          required
                          placeholder="Juan"
                          value={form.nombre}
                          onChange={e => set('nombre', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Apellido</label>
                        <input
                          type="text"
                          required
                          placeholder="García"
                          value={form.apellido}
                          onChange={e => set('apellido', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Fecha de nacimiento */}
                    <div>
                      <label className={labelClass}>Fecha de nacimiento</label>
                      <input
                        type="date"
                        required
                        value={form.fecha_nacimiento}
                        onChange={e => set('fecha_nacimiento', e.target.value)}
                        className={inputClass}
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className={labelClass}>Teléfono</label>
                      <input
                        type="tel"
                        required
                        placeholder="+52 81 1234 5678"
                        value={form.telefono}
                        onChange={e => set('telefono', e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    {/* Zona */}
                    <div>
                      <label className={labelClass}>Zona de Monterrey</label>
                      <select
                        required
                        value={form.zona}
                        onChange={e => set('zona', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Selecciona tu zona</option>
                        {ZONAS.map(z => (
                          <option key={z.value} value={z.value}>{z.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Nivel */}
                    <div>
                      <label className={labelClass}>Nivel de tenis</label>
                      <select
                        required
                        value={form.nivel}
                        onChange={e => set('nivel', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Selecciona tu nivel</option>
                        {NIVELES.map(n => (
                          <option key={n.value} value={n.value}>{n.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Cómo se enteró */}
                    <div>
                      <label className={labelClass}>¿Cómo te enteraste?</label>
                      <select
                        required
                        value={form.como_se_entero}
                        onChange={e => set('como_se_entero', e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Selecciona una opción</option>
                        {REFERIDOS.map(r => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Raqueta */}
                    <div
                      className="flex items-center justify-between border border-white/10 px-4 py-3.5 cursor-pointer select-none"
                      onClick={() => set('tiene_raqueta', !form.tiene_raqueta)}
                    >
                      <span className="text-xs tracking-[0.18em] uppercase font-sans text-white/35">
                        ¿Tienes raqueta propia?
                      </span>
                      <div
                        className={`w-10 h-5 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
                          form.tiene_raqueta ? 'bg-white' : 'bg-white/15'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-cc-dark transition-all duration-300 ${
                            form.tiene_raqueta ? 'left-5' : 'left-0.5'
                          }`}
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-400/80 text-xs font-sans">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 bg-white text-cc-dark px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-base transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Enviando...' : 'Quiero mi lugar →'}
                    </button>

                    <p className="text-xs font-sans text-white/18 text-center leading-relaxed">
                      Tu información es privada y no será compartida con terceros.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 md:px-12 py-6 border-t border-white/6 flex justify-between items-center">
          <span className="text-xs tracking-[0.15em] font-sans text-white/18">
            Court Culture · Monterrey
          </span>
          <span className="text-xs tracking-[0.15em] font-sans text-white/18">
            @courtculture.mty
          </span>
        </footer>

      </div>
    </div>
  )
}

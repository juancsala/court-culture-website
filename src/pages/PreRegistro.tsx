import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createMiembro } from '../api'
import { LINKS } from '../assets'
import Navbar from '../components/Navbar'

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

const inputClass = 'w-full border border-cc-text/15 bg-transparent px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-text/20'
const selectClass = 'w-full border border-cc-text/15 bg-cc-base px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors appearance-none'
const labelClass = 'block text-xs tracking-[0.18em] uppercase font-sans text-cc-text/35 mb-2'

export default function PreRegistro() {
  const [form, setForm] = useState({
    nombre: '', apellido: '', fecha_nacimiento: '', email: '',
    telefono: '', zona: '', nivel: '', como_se_entero: '',
    instagram: '', tiene_raqueta: false, acepto_terminos: false,
  })
  const [zonaCustom, setZonaCustom] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, value: string | boolean) => setForm(f => ({ ...f, [key]: value }))
  const sanitize = (s: string) => s.trim().toLowerCase().replace(/[^a-záéíóúüñ\s]/gi, '').replace(/\s+/g, ' ')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const zonaFinal = form.zona === 'otro' ? sanitize(zonaCustom) || 'otro' : form.zona
    try {
      await createMiembro({ ...form, zona: zonaFinal })
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      setError(err.message || 'Error al enviar el formulario')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">
      <Navbar solid />
      <div className="h-16 md:h-20" />

      {/* Hero */}
      <div className="relative h-[35vh] md:h-[45vh] overflow-hidden">
        <img src="/web/hero-group.jpg" alt="Court Culture comunidad"
          className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-cc-dark/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.25em] uppercase font-sans text-white/50 mb-4">
            Court Culture · Monterrey
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic' }}>
            Únete a la comunidad.
          </motion.h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 md:px-12 pt-16 pb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-sans text-cc-text/60 text-sm md:text-base leading-relaxed mb-4">
            Forma parte de la comunidad de tenis más grande de Monterrey. Como miembro tendrás acceso anticipado a los eventos, precio preferencial en tickets y beneficios exclusivos.
          </p>
          <p className="font-sans text-cc-text/40 text-sm leading-relaxed">
            Llena tus datos y te contactamos con toda la información.
          </p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 md:px-12 pb-24">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} className="text-center py-16">
              <div className="w-16 h-16 border border-cc-text/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cc-text">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-display text-cc-text leading-none mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, fontStyle: 'italic' }}>
                ¡Bienvenido a la comunidad!
              </h2>
              <p className="font-sans text-cc-text/45 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                Ya eres parte de Court Culture. Te avisaremos de próximos eventos con acceso y precios exclusivos para miembros.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-cc-text text-cc-base px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300">
                  Unirse a la comunidad →
                </a>
                <a href="/eventos"
                  className="inline-flex items-center justify-center border border-cc-text/20 text-cc-text/60 px-8 py-4 text-xs tracking-widest uppercase font-sans hover:border-cc-text/40 hover:text-cc-text transition-colors duration-300">
                  Ver eventos
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onSubmit={handleSubmit} className="flex flex-col gap-5">

              <h3 className="font-display text-cc-text mb-2 mt-4"
                style={{ fontSize: '1.6rem', fontWeight: 300, fontStyle: 'italic' }}>
                Datos personales
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nombre</label>
                  <input type="text" required placeholder="Juan" value={form.nombre}
                    onChange={e => set('nombre', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Apellido</label>
                  <input type="text" required placeholder="García" value={form.apellido}
                    onChange={e => set('apellido', e.target.value)} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Fecha de nacimiento</label>
                <div className="border border-cc-text/15 overflow-hidden">
                  <input type="date" required value={form.fecha_nacimiento}
                    onChange={e => set('fecha_nacimiento', e.target.value)}
                    className="w-full bg-transparent px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none"
                    style={{ colorScheme: 'light', minWidth: 0 }} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" required placeholder="tu@email.com" value={form.email}
                    onChange={e => set('email', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Teléfono / WhatsApp</label>
                  <input type="tel" required placeholder="81 1234 5678" value={form.telefono}
                    onChange={e => set('telefono', e.target.value)} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Instagram <span className="normal-case tracking-normal text-cc-text/20">(opcional)</span></label>
                <input type="text" placeholder="@tu_usuario" value={form.instagram}
                  onChange={e => set('instagram', e.target.value)} className={inputClass} />
              </div>

              <div className="h-px bg-cc-text/8 my-2" />
              <h3 className="font-display text-cc-text mb-2"
                style={{ fontSize: '1.6rem', fontWeight: 300, fontStyle: 'italic' }}>
                Sobre ti
              </h3>

              <div>
                <label className={labelClass}>Zona de Monterrey</label>
                <select required value={form.zona} onChange={e => set('zona', e.target.value)} className={selectClass}>
                  <option value="">Selecciona tu zona</option>
                  {ZONAS.map(z => <option key={z.value} value={z.value}>{z.label}</option>)}
                </select>
                {form.zona === 'otro' && (
                  <input type="text" required placeholder="¿De qué ciudad o estado?" value={zonaCustom}
                    onChange={e => setZonaCustom(e.target.value)} className={inputClass + ' mt-2'} maxLength={80} />
                )}
              </div>

              <div>
                <label className={labelClass}>Nivel de tenis</label>
                <select required value={form.nivel} onChange={e => set('nivel', e.target.value)} className={selectClass}>
                  <option value="">Selecciona tu nivel</option>
                  {NIVELES.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>¿Cómo te enteraste?</label>
                <select required value={form.como_se_entero} onChange={e => set('como_se_entero', e.target.value)} className={selectClass}>
                  <option value="">Selecciona una opción</option>
                  {REFERIDOS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>

              <div className="flex items-center justify-between border border-cc-text/15 px-4 py-3.5 cursor-pointer select-none"
                onClick={() => set('tiene_raqueta', !form.tiene_raqueta)}>
                <span className="text-xs tracking-[0.18em] uppercase font-sans text-cc-text/35">¿Tienes raqueta propia?</span>
                <div className={`w-10 h-5 rounded-full transition-colors duration-300 relative flex-shrink-0 ${form.tiene_raqueta ? 'bg-cc-text' : 'bg-cc-text/15'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-cc-base transition-all duration-300 ${form.tiene_raqueta ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>

              <div className="flex items-start gap-3 border border-cc-text/15 px-4 py-4 cursor-pointer select-none"
                onClick={() => set('acepto_terminos', !form.acepto_terminos)}>
                <div className={`mt-0.5 w-4 h-4 flex-shrink-0 border transition-colors duration-200 flex items-center justify-center ${form.acepto_terminos ? 'bg-cc-text border-cc-text' : 'border-cc-text/30'}`}>
                  {form.acepto_terminos && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#F9F8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <p className="text-xs font-sans text-cc-text/40 leading-relaxed">
                  He leído y acepto el tratamiento de mis datos personales conforme a la{' '}
                  <span className="text-cc-text/60">Ley Federal de Protección de Datos Personales (LFPDPPP)</span>.
                  Mis datos serán utilizados exclusivamente para eventos de Court Culture.
                </p>
              </div>

              {error && <p className="text-red-500 text-xs font-sans">{error}</p>}

              <button type="submit" disabled={submitting || !form.acepto_terminos}
                className="mt-2 bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                {submitting ? 'Enviando...' : 'Registrarme →'}
              </button>

              <p className="text-xs font-sans text-cc-text/20 text-center">Tu información es privada y no será compartida con terceros.</p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { crearDisfrazParticipante } from '../api'
import { LOGOS } from '../assets'

const EVENTO_ID = 8
const LIME = '#DCE42F'

export default function HalloweenRegistro() {
  const [nombre, setNombre] = useState('')
  const [disfraz, setDisfraz] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [listo, setListo] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await crearDisfrazParticipante(EVENTO_ID, { nombre: nombre.trim(), disfraz: disfraz.trim() })
      setListo(true)
    } catch (err: any) {
      setError(err.message || 'Algo salió mal. Intenta de nuevo.')
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full bg-transparent border border-white/15 text-white placeholder-white/25 px-4 py-3.5 font-sans text-sm focus:outline-none transition-colors duration-200'
  const labelClass = 'text-xs tracking-[0.18em] uppercase font-sans text-white/40 block mb-2'

  return (
    <div className="min-h-screen bg-cc-dark flex flex-col items-center px-6 py-14 md:py-20">
      <a href="/" className="mb-12 md:mb-16">
        <img src={LOGOS.mainWhite} alt="Court Culture" className="h-10 md:h-12 w-auto object-contain opacity-90" />
      </a>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!listo ? (
            <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-xs tracking-[0.25em] uppercase font-sans mb-5 text-center" style={{ color: LIME }}>
                Court Culture · Halloween
              </p>
              <h1
                className="font-display text-white text-center leading-tight mb-4"
                style={{ fontSize: 'clamp(2.2rem, 7vw, 3.2rem)', fontStyle: 'italic', fontWeight: 300 }}
              >
                Únete al concurso<br />de disfraces.
              </h1>
              <p className="text-white/50 font-sans font-light text-sm text-center leading-relaxed mb-10 max-w-sm mx-auto">
                Escribe tu nombre y cómo vienes disfrazado. Al rato todos van a poder votar por su favorito.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className={labelClass}>Tu nombre</label>
                  <input
                    type="text"
                    required
                    placeholder="Juan García"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className={inputClass}
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = LIME)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>
                <div>
                  <label className={labelClass}>Tu disfraz</label>
                  <input
                    type="text"
                    required
                    placeholder="Fantasma del tenis"
                    value={disfraz}
                    onChange={e => setDisfraz(e.target.value)}
                    className={inputClass}
                    onFocus={e => (e.currentTarget.style.borderColor = LIME)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>

                {error && <p className="text-red-400 text-xs font-sans">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 text-xs tracking-[0.2em] uppercase font-sans font-bold transition-opacity duration-300 disabled:opacity-40 mt-2"
                  style={{ backgroundColor: LIME, color: '#0D1A0D' }}
                >
                  {submitting ? 'Enviando...' : 'Unirme al concurso →'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="listo"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ border: `1px solid ${LIME}` }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
              <h2
                className="font-display text-white leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontStyle: 'italic', fontWeight: 300 }}
              >
                ¡Listo, {nombre.split(' ')[0]}!
              </h2>
              <p className="text-white/50 font-sans font-light text-sm leading-relaxed max-w-sm mx-auto">
                Ya estás en la competencia de disfraces. Cuando empiece la votación, pide a los demás que te voten.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

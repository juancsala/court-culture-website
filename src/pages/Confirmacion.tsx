import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LINKS } from '../assets'
import Navbar from '../components/Navbar'

const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

export default function Confirmacion() {
  const [whatsappUrl, setWhatsappUrl] = useState(LINKS.whatsapp)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return
    fetch(`${API_BASE}/api/events/registro/session/${sessionId}/`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.whatsapp_evento) setWhatsappUrl(data.whatsapp_evento)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-cc-base flex flex-col">

      <Navbar solid />
      <div className="h-16 md:h-20" />

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 border border-cc-text/20 rounded-full flex items-center justify-center mx-auto mb-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cc-text">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/30 mb-6">Lugar confirmado</p>

          <h1
            className="font-display text-cc-text leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Nos vemos<br />en la cancha.
          </h1>

          <p className="font-sans text-cc-text/40 leading-relaxed mb-1 text-sm">
            Tu lugar está confirmado. Recibirás tu ticket por correo con todos los detalles del evento.
          </p>
          <p className="font-sans text-cc-text/30 text-sm leading-relaxed mb-1">
            Muestra tu correo de confirmación al llegar a la entrada para el check-in.
          </p>
          <p className="font-sans text-cc-text/30 text-sm leading-relaxed mb-12">
            Cualquier pregunta escríbenos a{' '}
            <a href="https://www.instagram.com/courtculture.mty" target="_blank" rel="noopener noreferrer" className="text-cc-text/50 underline hover:text-cc-text transition-colors">
              @courtculture.mty
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-cc-text text-cc-base px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-cc-text/90 transition-colors duration-300"
            >
              Unirse a WhatsApp
            </a>
            <a
              href="/eventos"
              className="inline-flex items-center justify-center border border-cc-text/20 text-cc-text/60 px-8 py-4 text-xs tracking-widest uppercase font-sans font-light hover:border-cc-text/40 hover:text-cc-text transition-colors duration-300"
            >
              Ver eventos
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

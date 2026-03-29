import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LOGOS, LINKS } from '../assets'

export default function Confirmacion() {
  return (
    <div className="min-h-screen bg-cc-base flex flex-col">

      {/* Navbar */}
      <nav className="border-b border-cc-text/5 px-6 h-16 flex items-center">
        <Link to="/">
          <img src={LOGOS.main} alt="Court Culture" className="h-7 w-auto" />
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full text-center"
        >
          {/* Check */}
          <div className="w-16 h-16 border border-cc-text/20 rounded-full flex items-center justify-center mx-auto mb-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cc-text">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1
            className="font-display text-cc-text leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            ¡Listo!
          </h1>

          <p className="font-sans text-cc-muted leading-relaxed mb-4">
            Tu lugar está confirmado. Recibirás un correo con los detalles del evento.
          </p>
          <p className="font-sans text-cc-muted text-sm leading-relaxed mb-12">
            Cualquier pregunta escríbenos a{' '}
            <a href="https://www.instagram.com/courtculture.mty" target="_blank" rel="noopener noreferrer" className="text-cc-text underline">
              @courtculture.mty
            </a>{' '}
            o únete a la comunidad de WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-cc-dark text-cc-base px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-cc-green transition-colors duration-300"
            >
              Unirse a WhatsApp
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center border border-cc-text/20 text-cc-text px-8 py-4 text-xs tracking-widest uppercase font-sans font-light hover:bg-cc-light transition-colors duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

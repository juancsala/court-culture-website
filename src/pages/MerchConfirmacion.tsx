import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LOGOS } from '../assets'
import { getOrdenBySession } from '../api/merch'

export default function MerchConfirmacion() {
  const [orden, setOrden] = useState<any>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return
    getOrdenBySession(sessionId).then(data => { if (data) setOrden(data) })
  }, [])

  return (
    <div className="min-h-screen bg-cc-base flex flex-col">
      <nav className="bg-cc-dark px-6 md:px-12 py-3 flex items-center justify-between">
        <a href="/"><img src={LOGOS.mainWhite} alt="Court Culture" className="h-24 w-auto object-contain" /></a>
        <a href="/merch" className="text-xs tracking-[0.2em] uppercase font-sans text-white/50 hover:text-white transition-colors">Ver merch</a>
      </nav>

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

          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/30 mb-6">Pedido confirmado</p>

          <h1
            className="font-display text-cc-text leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Gracias por<br />tu compra.
          </h1>

          {orden && (
            <div className="border border-cc-text/10 p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-cc-text/35 text-xs tracking-widest uppercase">Pedido</span>
                <span className="text-cc-text font-medium">{orden.codigo}</span>
              </div>
              <div className="flex justify-between text-sm font-sans">
                <span className="text-cc-text/35 text-xs tracking-widest uppercase">Talla</span>
                <span className="text-cc-text">{orden.genero.charAt(0).toUpperCase() + orden.genero.slice(1)} · {orden.talla}</span>
              </div>
              <div className="flex justify-between text-sm font-sans">
                <span className="text-cc-text/35 text-xs tracking-widest uppercase">Total</span>
                <span className="text-cc-text">${orden.precio.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>
          )}

          <p className="font-sans text-cc-text/40 text-sm leading-relaxed mb-2">
            Recibirás un correo de confirmación con los detalles de tu pedido.
          </p>
          <p className="font-sans text-cc-text/30 text-sm leading-relaxed mb-12">
            Te contactaremos por WhatsApp para coordinar la entrega. Cualquier pregunta a{' '}
            <a href="https://www.instagram.com/courtculture.mty" target="_blank" rel="noopener noreferrer" className="text-cc-text/50 underline hover:text-cc-text transition-colors">
              @courtculture.mty
            </a>
          </p>

          <a
            href="/merch"
            className="inline-flex items-center justify-center border border-cc-text/20 text-cc-text/60 px-8 py-4 text-xs tracking-widest uppercase font-sans font-light hover:border-cc-text/40 hover:text-cc-text transition-colors duration-300"
          >
            Ver merch
          </a>
        </motion.div>
      </div>
    </div>
  )
}

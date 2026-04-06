import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getEvents, Event } from '../api'
import { LOGOS } from '../assets'

function formatFecha(fecha: string) {
  const d = new Date(fecha + 'T12:00:00')
  return {
    dia: d.toLocaleDateString('es-MX', { day: '2-digit' }),
    mes: d.toLocaleDateString('es-MX', { month: 'long' }),
    año: d.getFullYear(),
  }
}

export default function EventsPage() {
  const [eventos, setEventos] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then(setEventos)
      .catch(() => setEventos([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      {/* Navbar */}
      <nav className="border-b border-cc-text/5 px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="/">
          <img src={LOGOS.main} alt="Court Culture" className="h-10 w-auto" />
        </a>
        <a
          href="/comunidad"
          className="text-xs tracking-widest uppercase font-sans text-cc-text/50 hover:text-cc-text transition-colors duration-200"
        >
          Únete como miembro →
        </a>
      </nav>

      {/* Header */}
      <div className="px-6 md:px-12 pt-20 pb-16 border-b border-cc-text/5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/30 mb-4"
        >
          Court Culture · Monterrey
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-none"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 300, fontStyle: 'italic' }}
        >
          Eventos
        </motion.h1>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-16">
        {loading ? (
          <div className="py-32 text-center text-cc-text/20 text-sm font-sans tracking-widest uppercase">
            Cargando...
          </div>
        ) : eventos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-32 text-center"
          >
            <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/20 mb-6">Próximamente</p>
            <h2
              className="font-display text-cc-text mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              Algo se viene.
            </h2>
            <p className="font-sans text-cc-text/40 text-sm max-w-sm mx-auto leading-relaxed mb-10">
              Regístrate como miembro para ser el primero en saber cuándo abren los cupos.
            </p>
            <a
              href="/comunidad"
              className="inline-block border border-cc-text/20 text-cc-text/60 hover:text-cc-text hover:border-cc-text/40 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300"
            >
              Únete a la comunidad →
            </a>
          </motion.div>
        ) : (
          <div className="divide-y divide-cc-text/5">
            {eventos.map((evento, i) => {
              const { dia, mes, año } = formatFecha(evento.fecha)
              return (
                <motion.a
                  key={evento.id}
                  href={`/eventos/${evento.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-center gap-6 py-10 hover:bg-cc-text/[0.02] transition-colors duration-300 -mx-6 md:-mx-12 px-6 md:px-12"
                >
                  {/* Fecha */}
                  <div className="md:w-32 shrink-0">
                    <span
                      className="font-display text-cc-text/20 group-hover:text-cc-text/40 transition-colors duration-300 leading-none"
                      style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 300 }}
                    >
                      {dia}
                    </span>
                    <p className="text-xs tracking-widest uppercase font-sans text-cc-text/30 mt-1">{mes} {año}</p>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2
                      className="font-display text-cc-text leading-tight mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                    >
                      {evento.titulo}
                    </h2>
                    <p className="font-sans text-cc-text/40 text-sm">{evento.lugar}</p>
                  </div>

                  {/* Precio y cupos */}
                  <div className="md:text-right shrink-0">
                    <p className="font-sans text-cc-text text-sm mb-1">
                      ${Number(evento.precio_general).toLocaleString('es-MX')} MXN
                    </p>
                    <p className="font-sans text-cc-text/30 text-xs tracking-widest uppercase">
                      {evento.cupos_disponibles > 0 ? `${evento.cupos_disponibles} cupos` : 'Agotado'}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block text-cc-text/20 group-hover:text-cc-text/60 transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </div>
                </motion.a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

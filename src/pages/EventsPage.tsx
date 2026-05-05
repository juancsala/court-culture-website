import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getEvents, Event } from '../api'
import { LOGOS, LINKS, COMMUNITY_IMAGES } from '../assets'

function formatFecha(fecha: string) {
  const d = new Date(fecha + 'T12:00:00')
  return {
    dia: d.toLocaleDateString('es-MX', { day: '2-digit' }),
    mes: d.toLocaleDateString('es-MX', { month: 'long' }),
    año: d.getFullYear(),
    mesNum: d.getMonth(),
  }
}

function formatHora(hora: string) {
  const [h, m] = hora.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'pm' : 'am'
  const h12 = hour > 12 ? hour - 12 : hour
  return `${h12}:${m} ${ampm}`
}

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const STRIP_PHOTOS = [COMMUNITY_IMAGES[0], COMMUNITY_IMAGES[3], COMMUNITY_IMAGES[5]]

type TipoFiltro = 'todos' | 'court_session' | 'warm_up_session'

export default function EventsPage() {
  const [eventos, setEventos] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [tipoFiltro, setTipoFiltro] = useState<TipoFiltro>('todos')
  const [mesFiltro, setMesFiltro] = useState(4) // Mayo = index 4

  useEffect(() => {
    getEvents()
      .then(setEventos)
      .catch(() => setEventos([]))
      .finally(() => setLoading(false))
  }, [])

  // Meses que tienen eventos
  const mesesConEventos = [...new Set(eventos.map(e => new Date(e.fecha + 'T12:00:00').getMonth()))].sort()

  const filtrados = eventos.filter(e => {
    const mes = new Date(e.fecha + 'T12:00:00').getMonth()
    const tipoOk = tipoFiltro === 'todos' || e.tipo === tipoFiltro
    const mesOk = mes === mesFiltro
    return tipoOk && mesOk
  })

  function mapsUrl(direccion: string) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`
  }

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      {/* Navbar */}
      <nav className="bg-cc-dark px-4 md:px-12 py-3 flex items-center justify-between">
        <a href="/"><img src={LOGOS.mainWhite} alt="Court Culture" className="h-16 md:h-24 w-auto object-contain" /></a>
        <div className="flex items-center gap-3 md:gap-5">
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hidden md:block text-white/60 hover:text-white transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="/comunidad" className="shrink-0 text-cc-dark bg-cc-base/95 hover:bg-white px-3 md:px-5 py-2 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200 whitespace-nowrap">
            Únete
          </a>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 md:px-12 pt-16 pb-12 border-b border-cc-text/8">
        <a href="/" className="inline-flex items-center gap-2 text-cc-text/30 hover:text-cc-text/60 text-xs tracking-widest uppercase font-sans transition-colors duration-200 mb-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
          Inicio
        </a>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/30 mb-4">
          Court Culture · Monterrey
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-cc-text leading-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, fontStyle: 'italic' }}
          >
            Agenda
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-cc-text/40 text-sm leading-relaxed max-w-xs mb-2"
          >
            Tenis, conexión y algo más. Dos formatos, una sola comunidad.
          </motion.p>
        </div>
      </div>

      {/* Photo strip */}
      <div className="grid grid-cols-3 gap-1 h-48 md:h-72">
        {STRIP_PHOTOS.map((src, i) => (
          <div key={i} className="overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(0.88) saturate(0.85)' }} />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="px-6 md:px-12 pt-8 pb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-cc-text/8">
        <div className="flex gap-2 flex-wrap">
          {([
            ['todos', 'Todos'],
            ['court_session', 'Court Sessions'],
            ['warm_up_session', 'Warm Up Sessions'],
          ] as [TipoFiltro, string][]).map(([val, label]) => (
            <button key={val} onClick={() => setTipoFiltro(val)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase font-sans transition-colors duration-200 ${
                tipoFiltro === val
                  ? 'bg-cc-text text-cc-base'
                  : 'text-cc-text/40 hover:text-cc-text/70 border border-cc-text/12 hover:border-cc-text/25'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <select
          value={mesFiltro}
          onChange={e => setMesFiltro(Number(e.target.value))}
          className="border border-cc-text/15 bg-cc-base text-cc-text/60 text-xs tracking-[0.15em] uppercase font-sans px-4 py-2 focus:outline-none focus:border-cc-text/30 transition-colors appearance-none pr-8 cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230A0A0A' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
        >
          {mesesConEventos.map(m => (
            <option key={m} value={m}>{MESES[m]}</option>
          ))}
        </select>
      </div>

      {/* Sobre Court Culture */}
      <div className="px-6 md:px-12 py-12 md:py-16 border-b border-cc-text/8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-4">Sobre nosotros</p>
          <h2 className="font-display text-cc-text mb-5 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, fontStyle: 'italic' }}>
            Somos Court Culture.
          </h2>
          <p className="font-sans text-cc-text/50 text-sm leading-relaxed mb-3">
            Court Culture nace en marzo de 2026 con una idea clara: crear un espacio donde el tenis sea el punto de encuentro para conectar personas. Lo que empezó con 50 personas hoy se ha convertido en una comunidad de más de 1,200 miembros, posicionándose como la comunidad de tenis más grande de México.
          </p>
          <p className="font-sans text-cc-text/40 text-sm leading-relaxed">
            Aquí no importa si juegas desde hace años o si apenas estás empezando. Court Culture es más que tenis: es comunidad, ambiente y experiencias que se quedan contigo dentro y fuera de la cancha.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:mt-16">
          <div className="border border-cc-text/10 p-5">
            <p className="text-xs tracking-[0.18em] uppercase font-sans text-cc-text/30 mb-2">Court Sessions</p>
            <p className="font-sans text-cc-text/50 text-sm leading-relaxed">
              Nuestros eventos grandes. Drills, partidos, juegos, marcas invitadas, DJ en vivo, cold plunge y convivencia. Una experiencia completa de tenis y comunidad.
            </p>
          </div>
          <div className="border border-cc-text/10 p-5">
            <p className="text-xs tracking-[0.18em] uppercase font-sans text-cc-text/30 mb-2">Warm Up Sessions</p>
            <p className="font-sans text-cc-text/50 text-sm leading-relaxed">
              Sesiones íntimas solo para la comunidad. Retas, juegos en equipo y dinámicas en cancha. Puro tenis y conexión real.
            </p>
          </div>
        </div>
      </div>

      {/* Events list */}
      <div className="px-6 md:px-12 py-10 min-h-[40vh]">
        {loading ? (
          <div className="py-32 text-center text-cc-text/25 text-xs font-sans tracking-widest uppercase">Cargando...</div>
        ) : (
          <AnimatePresence mode="wait">
            {filtrados.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 text-center">
                <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-4">Sin eventos</p>
                <h2 className="font-display text-cc-text mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, fontStyle: 'italic' }}>
                  {tipoFiltro === 'court_session' ? 'No hay Court Sessions' : tipoFiltro === 'warm_up_session' ? 'No hay Warm Up Sessions' : 'No hay eventos'} en {MESES[mesFiltro]}.
                </h2>
                <p className="font-sans text-cc-text/35 text-sm">Prueba otro mes o sigue en redes para no perderte ninguno.</p>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="divide-y divide-cc-text/8">
                {filtrados.map((evento, i) => {
                  const { dia, mes } = formatFecha(evento.fecha)
                  const soldOut = evento.cupos_disponibles <= 0
                  return (
                    <motion.a
                      key={evento.id}
                      href={`/eventos/${evento.id}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="group flex flex-col md:flex-row md:items-center gap-6 py-10 md:py-12 -mx-6 md:-mx-12 px-6 md:px-12 hover:bg-cc-text/[0.04] transition-all duration-300"
                    >
                      {/* Fecha */}
                      <div className="md:w-36 shrink-0">
                        <span className="font-display text-cc-text/15 group-hover:text-cc-text/25 transition-colors leading-none block"
                          style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 300 }}>
                          {dia}
                        </span>
                        <p className="text-xs tracking-widest uppercase font-sans text-cc-text/30 group-hover:text-cc-text/45 transition-colors mt-1 capitalize">{mes}</p>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        {soldOut && (
                          <span className="text-[10px] tracking-[0.12em] uppercase font-sans text-red-400/70 block mb-1">Sold out</span>
                        )}
                        <h2 className="font-display text-cc-text group-hover:text-cc-text leading-tight mb-1.5 transition-colors"
                          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}>
                          {evento.titulo}
                        </h2>
                        <p className="font-sans text-cc-text/35 group-hover:text-cc-text/60 text-sm transition-colors">{evento.lugar} · {formatHora(evento.hora)}</p>
                        {(evento.maps_url || evento.direccion) && (
                          <button
                            onClick={e => { e.preventDefault(); window.open(evento.maps_url || mapsUrl(evento.direccion), '_blank') }}
                            className="mt-1 text-xs font-sans text-cc-text/25 group-hover:text-cc-text/40 underline transition-colors"
                          >
                            Ver en Google Maps →
                          </button>
                        )}
                      </div>

                      {/* Precio */}
                      <div className="md:text-right shrink-0">
                        <p className="font-sans text-cc-text group-hover:text-cc-texttext-sm mb-1 transition-colors">
                          desde ${Number(evento.precio_comunidad).toLocaleString('es-MX')} MXN
                        </p>
                        <p className="font-sans text-cc-text/30 group-hover:text-cc-text/40 text-xs tracking-widest uppercase transition-colors">
                          {soldOut ? 'Lista de espera' : `${evento.cupos_disponibles} cupos`}
                        </p>
                      </div>

                      <div className="hidden md:block text-cc-text/20 group-hover:text-cc-text/50 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                      </div>
                    </motion.a>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="bg-cc-dark px-6 md:px-12 py-8 flex items-center justify-between">
        <p className="text-xs font-sans text-white/40 tracking-widest uppercase">Court Culture · Monterrey</p>
        <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-white/40 hover:text-white/70 transition-colors">
          @courtculture.mty
        </a>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getDisfraces, getMiVoto, votarDisfraz, DisfrazParticipante } from '../api'
import { LOGOS } from '../assets'

const EVENTO_ID = 8
const LIME = '#DCE42F'
const VOTER_KEY = 'cc_halloween_voter_id'

function getVoterId(): string {
  let id = localStorage.getItem(VOTER_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(VOTER_KEY, id)
  }
  return id
}

export default function HalloweenVotacion() {
  const [disfraces, setDisfraces] = useState<DisfrazParticipante[]>([])
  const [miVoto, setMiVoto] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [votando, setVotando] = useState<number | null>(null)
  const voterId = useRef(getVoterId())

  async function cargar() {
    try {
      const [lista, voto] = await Promise.all([
        getDisfraces(EVENTO_ID),
        getMiVoto(voterId.current),
      ])
      setDisfraces(lista)
      setMiVoto(voto.participante_id)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargar()
    const interval = setInterval(cargar, 8000)
    return () => clearInterval(interval)
  }, [])

  async function handleVotar(id: number) {
    if (id === miVoto) return
    const anterior = miVoto
    setMiVoto(id)
    setVotando(id)
    try {
      await votarDisfraz(id, voterId.current)
      await cargar()
    } catch {
      setMiVoto(anterior)
    } finally {
      setVotando(null)
    }
  }

  return (
    <div className="min-h-screen bg-cc-dark px-6 py-14 md:py-20">
      <div className="flex flex-col items-center">
        <a href="/" className="mb-10 md:mb-14">
          <img src={LOGOS.mainWhite} alt="Court Culture" className="h-10 md:h-12 w-auto object-contain opacity-90" />
        </a>

        <p className="text-xs tracking-[0.25em] uppercase font-sans mb-5 text-center" style={{ color: LIME }}>
          Court Culture · Halloween
        </p>
        <h1
          className="font-display text-white text-center leading-tight mb-4"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 3.2rem)', fontStyle: 'italic', fontWeight: 300 }}
        >
          Vota por el mejor<br />disfraz.
        </h1>
        <p className="text-white/50 font-sans font-light text-sm text-center leading-relaxed mb-12 max-w-sm">
          Un voto por persona. Puedes cambiar de opinión cuantas veces quieras antes de que termine la fiesta.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        {loading ? (
          <p className="text-white/25 text-xs tracking-widest uppercase font-sans text-center py-16">Cargando...</p>
        ) : disfraces.length === 0 ? (
          <p className="text-white/30 text-sm font-sans text-center py-16">Aún no hay disfraces registrados.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {disfraces.map((d, i) => {
              const seleccionado = d.id === miVoto
              return (
                <motion.button
                  key={d.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  onClick={() => handleVotar(d.id)}
                  disabled={votando === d.id}
                  className="text-left p-5 border transition-colors duration-300 disabled:opacity-60"
                  style={{
                    borderColor: seleccionado ? LIME : 'rgba(255,255,255,0.1)',
                    backgroundColor: seleccionado ? 'rgba(220,228,47,0.06)' : 'transparent',
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display text-white leading-snug" style={{ fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 400 }}>
                      {d.disfraz}
                    </h3>
                    <span
                      className="shrink-0 text-xs font-sans font-bold px-2 py-1 rounded-full"
                      style={{ backgroundColor: seleccionado ? LIME : 'rgba(255,255,255,0.08)', color: seleccionado ? '#0D1A0D' : 'rgba(255,255,255,0.5)' }}
                    >
                      {d.votos}
                    </span>
                  </div>
                  <p className="text-white/40 font-sans text-xs tracking-widest uppercase">{d.nombre}</p>
                  {seleccionado && (
                    <p className="text-xs font-sans mt-3" style={{ color: LIME }}>✓ Tu voto</p>
                  )}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'

const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

interface Registro {
  id: number
  evento: string
  fecha: string
  precio: number
  codigo: string
  puede_reembolsar: boolean
  deadline: string | null
  finalizado: boolean
}

const inputClass = 'w-full border border-cc-text/15 bg-transparent px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-text/20'

export default function ReembolsoPage() {
  const [email, setEmail] = useState('')
  const [buscando, setBuscando] = useState(false)
  const [registros, setRegistros] = useState<Registro[] | null>(null)
  const [error, setError] = useState('')
  const [procesando, setProcesando] = useState<number | null>(null)
  const [reembolsado, setReembolsado] = useState<number[]>([])

  async function handleBuscar(e: React.FormEvent) {
    e.preventDefault()
    setBuscando(true)
    setError('')
    setRegistros(null)
    try {
      const res = await fetch(`${API_BASE}/api/events/reembolso/buscar/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setRegistros(data)
    } catch (err: any) {
      setError(err.message || 'Error al buscar. Intenta de nuevo.')
    } finally {
      setBuscando(false)
    }
  }

  async function handleReembolso(id: number) {
    if (!confirm('¿Confirmas que deseas solicitar el reembolso de este boleto?')) return
    setProcesando(id)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/events/reembolso/${id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setReembolsado(prev => [...prev, id])
    } catch (err: any) {
      setError(err.message || 'Error al procesar el reembolso.')
    } finally {
      setProcesando(null)
    }
  }

  const registrosActivos = registros?.filter(r => !reembolsado.includes(r.id)) ?? []

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">
      <Navbar solid />
      <div className="h-16 md:h-20" />

      <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-4">Court Culture</p>
          <h1 className="font-display text-cc-text leading-none mb-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic' }}>
            Solicitar reembolso.
          </h1>
          <p className="font-sans text-cc-text/45 text-sm leading-relaxed mb-10">
            Ingresa el correo con el que compraste tu boleto. Los reembolsos aplican antes del plazo establecido por evento y pueden tardar 5–10 días hábiles en reflejarse.
          </p>

          {/* Buscar */}
          <form onSubmit={handleBuscar} className="flex gap-3 mb-10">
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass + ' flex-1'}
            />
            <button type="submit" disabled={buscando}
              className="bg-cc-text text-cc-base px-6 py-3.5 text-xs tracking-[0.15em] uppercase font-sans hover:bg-cc-text/85 transition-colors disabled:opacity-40 shrink-0">
              {buscando ? '...' : 'Buscar'}
            </button>
          </form>

          {error && <p className="text-red-500 text-xs font-sans mb-6">{error}</p>}

          {/* Resultados */}
          <AnimatePresence>
            {registros !== null && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {registrosActivos.length === 0 ? (
                  <div className="border border-cc-text/10 p-6 text-center">
                    <p className="font-sans text-cc-text/40 text-sm">
                      {registros.length === 0
                        ? 'No encontramos registros confirmados con ese correo.'
                        : 'Todos tus reembolsos han sido procesados.'}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {registrosActivos.map(r => (
                      <div key={r.id} className="border border-cc-text/10 p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <p className="font-display text-cc-text leading-tight mb-1"
                              style={{ fontSize: '1.3rem', fontWeight: 400, fontStyle: 'italic' }}>
                              {r.evento}
                            </p>
                            <p className="text-xs font-sans text-cc-text/35 capitalize">{r.fecha}</p>
                            <p className="text-xs font-sans text-cc-text/30 mt-0.5">{r.codigo} · ${r.precio.toLocaleString('es-MX')} MXN</p>
                          </div>
                        </div>

                        {r.puede_reembolsar ? (
                          <>
                            <p className="text-xs font-sans text-cc-text/35 mb-4">
                              Plazo límite: <span className="text-cc-text/55">{r.deadline}</span>
                            </p>
                            <button
                              onClick={() => handleReembolso(r.id)}
                              disabled={procesando === r.id}
                              className="w-full border border-cc-text/20 text-cc-text/60 py-3 text-xs tracking-[0.15em] uppercase font-sans hover:border-cc-text/40 hover:text-cc-text transition-colors disabled:opacity-40"
                            >
                              {procesando === r.id ? 'Procesando...' : 'Solicitar reembolso'}
                            </button>
                          </>
                        ) : (
                          <p className="text-xs font-sans text-cc-text/30 border-t border-cc-text/8 pt-4">
                            {r.finalizado
                              ? 'Este evento ya finalizó. No aplica reembolso.'
                              : 'El plazo para solicitar reembolso ya venció.'}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {reembolsado.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 border border-cc-text/10 p-6 text-center">
                    <p className="font-sans text-cc-text/60 text-sm">
                      ✓ Reembolso procesado. Recibirás un correo de confirmación. El monto puede tardar 5–10 días hábiles en llegar.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Política */}
          <div className="mt-16 border-t border-cc-text/8 pt-10">
            <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/25 mb-6">Política de reembolso</p>
            <div className="flex flex-col gap-5 font-sans text-sm text-cc-text/45 leading-relaxed">
              <p><span className="text-cc-text/60 font-medium">Elegibilidad.</span> Los reembolsos aplican únicamente si se solicitan antes del plazo límite de cada evento.</p>
              <p><span className="text-cc-text/60 font-medium">Monto.</span> Se reembolsa el precio del boleto menos comisiones de procesamiento.</p>
              <p><span className="text-cc-text/60 font-medium">Tiempo.</span> El reembolso puede tardar 5–10 días hábiles en reflejarse en tu cuenta.</p>
              <p><span className="text-cc-text/60 font-medium">Cancelación por Court Culture.</span> Si cancelamos el evento, todos los inscritos recibirán reembolso completo automáticamente.</p>
              <p><span className="text-cc-text/60 font-medium">¿Dudas?</span> Escríbenos a <a href="https://www.instagram.com/courtculture.mx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-cc-text/60 underline hover:text-cc-text transition-colors">@courtculture.mty</a></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

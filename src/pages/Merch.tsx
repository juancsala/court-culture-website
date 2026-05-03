import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LOGOS } from '../assets'
import { getProductos, crearOrden, Producto } from '../api/merch'

const MODELO_PHOTOS = [
  '/merch/modelo1.jpg',
  '/merch/modelo2.jpg',
  '/merch/modelo3.jpg',
  '/merch/modelo4.jpg',
]

const inputClass = 'w-full border border-cc-text/15 bg-transparent px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-text/20'
const labelClass = 'block text-xs tracking-[0.18em] uppercase font-sans text-cc-text/35 mb-2'

export default function MerchPage() {
  const [producto, setProducto] = useState<Producto | null>(null)
  const [vista, setVista] = useState<'front' | 'back'>('front')
  const [genero, setGenero] = useState<'hombre' | 'mujer'>('hombre')
  const [talla, setTalla] = useState('')
  const [step, setStep] = useState<'producto' | 'form'>('producto')
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', ciudad: '', notas: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getProductos().then(data => {
      if (data.length > 0) setProducto(data[0])
    })
  }, [])

  function tallasDeGenero(g: string) {
    if (!producto) return []
    return producto.tallas.filter(t => t.genero === g)
  }

  const totalStock = producto?.tallas.filter(t => t.genero === genero).reduce((s, t) => s + t.stock, 0) ?? 0

  async function handleComprar() {
    if (!talla) { setError('Selecciona una talla'); return }
    setStep('form')
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!producto || !talla) return
    setSubmitting(true)
    setError('')
    try {
      const { checkout_url } = await crearOrden(producto.id, {
        talla,
        genero,
        ...form,
      })
      window.location.href = checkout_url
    } catch (err: any) {
      setError(err.message || 'Error al procesar el pedido')
      setSubmitting(false)
    }
  }

  const frontImg = producto?.imagen_front_url || '/merch/front.png'
  const backImg = producto?.imagen_back_url || '/merch/back.png'

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      {/* Navbar */}
      <nav className="bg-cc-dark px-6 md:px-12 py-3 flex items-center justify-between">
        <a href="/"><img src={LOGOS.mainWhite} alt="Court Culture" className="h-16 md:h-24 w-auto object-contain" /></a>
        <a href="/" className="text-xs tracking-[0.2em] uppercase font-sans text-white/50 hover:text-white transition-colors duration-200">← Inicio</a>
      </nav>

      {/* Hero — lookbook strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-[35vh] md:h-[45vh] overflow-hidden">
        {MODELO_PHOTOS.map((src, i) => (
          <div key={i} className="overflow-hidden relative">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-3">Court Culture · Merch</p>
          <h1 className="font-display text-cc-text leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic' }}>
            Drop 01
          </h1>
          <p className="font-sans text-cc-text/40 text-sm mt-3 max-w-md leading-relaxed">
            Playera Court Culture — Diseño exclusivo Vol. I. Edición limitada.
          </p>
        </motion.div>
      </div>

      {/* Product section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left — imagen */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <div className="relative bg-[#f0ede8] aspect-square overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={vista}
                  src={vista === 'front' ? frontImg : backImg}
                  alt={vista === 'front' ? 'Frente' : 'Espalda'}
                  className="w-full h-full object-contain p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            {/* Toggle frente/espalda */}
            <div className="flex gap-2 mt-3">
              {(['front', 'back'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setVista(v)}
                  className={`flex-1 py-2.5 text-xs tracking-[0.15em] uppercase font-sans border transition-colors duration-200 ${
                    vista === v ? 'bg-cc-text text-cc-base border-cc-text' : 'border-cc-text/15 text-cc-text/35 hover:text-cc-text/60'
                  }`}
                >
                  {v === 'front' ? 'Frente' : 'Espalda'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — info + compra */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="md:sticky md:top-8"
          >
            <AnimatePresence mode="wait">
              {step === 'producto' && (
                <motion.div key="producto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-baseline justify-between mb-8">
                    <h2 className="font-display text-cc-text" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, fontStyle: 'italic' }}>
                      Playera CC Vol. I
                    </h2>
                    <span className="font-sans text-cc-text text-lg">$500 MXN</span>
                  </div>

                  {/* Género */}
                  <div className="mb-6">
                    <p className={labelClass}>Género</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(['hombre', 'mujer'] as const).map(g => (
                        <button
                          key={g}
                          onClick={() => { setGenero(g); setTalla('') }}
                          className={`py-3 text-xs tracking-[0.15em] uppercase font-sans border transition-colors duration-200 ${
                            genero === g ? 'bg-cc-text text-cc-base border-cc-text' : 'border-cc-text/15 text-cc-text/40 hover:text-cc-text/60'
                          }`}
                        >
                          {g === 'hombre' ? 'Hombre' : 'Mujer'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tallas */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <p className={labelClass + ' mb-0'}>Talla</p>
                      {totalStock <= 5 && totalStock > 0 && (
                        <p className="text-xs font-sans text-cc-text/30">Quedan {totalStock}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {tallasDeGenero(genero).map(({ talla: t, stock }) => (
                        <button
                          key={t}
                          disabled={stock === 0}
                          onClick={() => setTalla(t)}
                          className={`py-3 text-xs tracking-wider uppercase font-sans border transition-colors duration-200 relative ${
                            stock === 0
                              ? 'border-cc-text/8 text-cc-text/20 cursor-not-allowed line-through'
                              : talla === t
                              ? 'bg-cc-text text-cc-base border-cc-text'
                              : 'border-cc-text/15 text-cc-text/50 hover:border-cc-text/30 hover:text-cc-text/70'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Entrega info */}
                  <div className="border border-cc-text/8 p-4 mb-8 bg-cc-text/[0.02]">
                    <p className="text-xs font-sans text-cc-text/40 leading-relaxed">
                      📦 Entrega en punto de recolección o en nuestros próximos eventos. Te contactaremos por WhatsApp para coordinar.
                    </p>
                  </div>

                  {error && <p className="text-red-500 text-xs font-sans mb-4">{error}</p>}

                  <button
                    onClick={handleComprar}
                    disabled={totalStock === 0}
                    className="w-full bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {totalStock === 0 ? 'Agotado' : 'Comprar ahora →'}
                  </button>
                </motion.div>
              )}

              {step === 'form' && (
                <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  <button
                    onClick={() => setStep('producto')}
                    className="text-xs tracking-[0.15em] uppercase font-sans text-cc-text/35 hover:text-cc-text/60 transition-colors mb-6"
                  >
                    ← Volver
                  </button>

                  <div className="border border-cc-text/8 p-4 bg-cc-text/[0.02] mb-6">
                    <p className="text-xs font-sans text-cc-text/50">
                      Playera CC Vol. I · {genero.charAt(0).toUpperCase() + genero.slice(1)} {talla} · <strong>$500 MXN</strong>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className={labelClass}>Nombre completo</label>
                      <input type="text" required value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className={inputClass} placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} placeholder="tu@email.com" />
                    </div>
                    <div>
                      <label className={labelClass}>Teléfono / WhatsApp</label>
                      <input type="tel" required value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} className={inputClass} placeholder="81 1234 5678" />
                    </div>
                    <div>
                      <label className={labelClass}>Ciudad</label>
                      <input type="text" required value={form.ciudad} onChange={e => setForm(f => ({ ...f, ciudad: e.target.value }))} className={inputClass} placeholder="Monterrey" />
                    </div>
                    <div>
                      <label className={labelClass}>Notas <span className="normal-case tracking-normal text-cc-text/20">(opcional)</span></label>
                      <textarea rows={2} value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} className={inputClass + ' resize-none'} placeholder="Instrucciones para la entrega..." />
                    </div>

                    {error && <p className="text-red-500 text-xs font-sans">{error}</p>}

                    <button type="submit" disabled={submitting} className="mt-2 bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 disabled:opacity-40">
                      {submitting ? 'Procesando...' : 'Ir a pagar →'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { crearTransaccion } from '../../api/finanzas'
import { LOGOS } from '../../assets'

const CATEGORIAS_INGRESO = [
  'Venta de boletos',
  'Patrocinios',
  'Otro ingreso',
]

const CATEGORIAS_GASTO = [
  'Venue / Cancha',
  'Equipo deportivo',
  'Marketing / Publicidad',
  'Comida y bebidas',
  'Logística',
  'Nómina',
  'Stripe / Comisiones',
  'Página web',
  'Otro gasto',
]

const labelClass = 'block text-xs tracking-[0.18em] uppercase font-sans text-cc-text/35 mb-2'
const inputClass = 'w-full border border-cc-text/15 bg-transparent px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors placeholder:text-cc-text/20'
const selectClass = 'w-full border border-cc-text/15 bg-cc-base px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none focus:border-cc-text/40 transition-colors appearance-none'

export default function FinanzasNuevo() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    tipo: 'gasto' as 'ingreso' | 'gasto',
    categoria: '',
    categoriaCustom: '',
    monto: '',
    descripcion: '',
    quien: '',
    fecha: new Date().toISOString().split('T')[0],
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const categorias = form.tipo === 'ingreso' ? CATEGORIAS_INGRESO : CATEGORIAS_GASTO
  const esOtro = form.categoria === 'Otro ingreso' || form.categoria === 'Otro gasto'

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const categoriaFinal = esOtro && form.categoriaCustom.trim()
      ? form.categoriaCustom.trim()
      : form.categoria
    try {
      await crearTransaccion({
        tipo: form.tipo,
        categoria: categoriaFinal,
        monto: Number(form.monto),
        descripcion: form.descripcion,
        quien: form.quien,
        fecha: form.fecha,
      })
      navigate('/finanzas/dashboard')
    } catch (err: any) {
      setError(err.message || 'Error al guardar')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      {/* Navbar */}
      <nav className="bg-cc-dark px-6 md:px-12 py-3 flex items-center justify-between">
        <img src={LOGOS.mainWhite} alt="Court Culture" className="h-16 w-auto object-contain" />
        <button
          onClick={() => navigate('/finanzas/dashboard')}
          className="text-xs tracking-[0.2em] uppercase font-sans text-white/50 hover:text-white transition-colors duration-200"
        >
          ← Dashboard
        </button>
      </nav>

      <div className="max-w-lg mx-auto px-6 md:px-12 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-3">Finanzas</p>
          <h1
            className="font-display text-cc-text leading-none mb-10"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 300, fontStyle: 'italic' }}
          >
            Nueva transacción
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Tipo */}
            <div>
              <label className={labelClass}>Tipo</label>
              <div className="grid grid-cols-2 gap-3">
                {(['gasto', 'ingreso'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { set('tipo', t); set('categoria', '') }}
                    className={`py-3.5 text-xs tracking-[0.18em] uppercase font-sans border transition-colors duration-200 ${
                      form.tipo === t
                        ? 'bg-cc-text text-cc-base border-cc-text'
                        : 'border-cc-text/15 text-cc-text/40 hover:text-cc-text/60'
                    }`}
                  >
                    {t === 'gasto' ? 'Gasto' : 'Ingreso'}
                  </button>
                ))}
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className={labelClass}>Categoría</label>
              <select
                required
                value={form.categoria}
                onChange={e => set('categoria', e.target.value)}
                className={selectClass}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <AnimatePresence>
                {esOtro && (
                  <motion.input
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    type="text"
                    placeholder="Describe la categoría"
                    value={form.categoriaCustom}
                    onChange={e => set('categoriaCustom', e.target.value)}
                    className={inputClass + ' mt-2'}
                    maxLength={100}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Monto */}
            <div>
              <label className={labelClass}>Monto (MXN)</label>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={form.monto}
                onChange={e => set('monto', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Fecha */}
            <div>
              <label className={labelClass}>Fecha</label>
              <div className="border border-cc-text/15 overflow-hidden">
                <input
                  type="date"
                  required
                  value={form.fecha}
                  onChange={e => set('fecha', e.target.value)}
                  className="w-full bg-transparent px-4 py-3.5 font-sans text-cc-text text-sm focus:outline-none border-none"
                  style={{ colorScheme: 'light', minWidth: 0 }}
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className={labelClass}>
                Descripción <span className="normal-case tracking-normal text-cc-text/20">(opcional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Notas adicionales..."
                value={form.descripcion}
                onChange={e => set('descripcion', e.target.value)}
                className={inputClass + ' resize-none'}
              />
            </div>

            {/* Quién */}
            <div>
              <label className={labelClass}>
                Quién realizó el gasto <span className="normal-case tracking-normal text-cc-text/20">(opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Nombre"
                value={form.quien}
                onChange={e => set('quien', e.target.value)}
                className={inputClass}
                maxLength={100}
              />
            </div>

            {error && <p className="text-red-500 text-xs font-sans">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-cc-text text-cc-base py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-text/85 transition-colors duration-300 disabled:opacity-40"
            >
              {submitting ? 'Guardando...' : 'Guardar transacción →'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getDashboardStats, getTransacciones, eliminarTransaccion, DashboardStats, Transaccion } from '../../api/finanzas'
import { LOGOS } from '../../assets'

function formatMonto(n: number) {
  return `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatFecha(f: string) {
  const d = new Date(f + 'T12:00:00')
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatMes(m: string) {
  const [y, mo] = m.split('-')
  const d = new Date(Number(y), Number(mo) - 1, 1)
  return d.toLocaleDateString('es-MX', { month: 'short', year: 'numeric' })
}

export default function FinanzasDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [transacciones, setTransacciones] = useState<Transaccion[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState<'todos' | 'ingreso' | 'gasto'>('todos')
  const username = localStorage.getItem('finanzas_user') || ''

  async function cargar() {
    try {
      const [s, t] = await Promise.all([getDashboardStats(), getTransacciones()])
      setStats(s)
      setTransacciones(t)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  async function handleEliminar(id: number) {
    if (!confirm('¿Eliminar esta transacción?')) return
    await eliminarTransaccion(id)
    cargar()
  }

  async function handleLogout() {
    const { logoutFinanzas } = await import('../../api/finanzas')
    await logoutFinanzas()
    navigate('/finanzas/login')
  }

  const filtradas = filtro === 'todos' ? transacciones : transacciones.filter(t => t.tipo === filtro)

  if (loading) {
    return (
      <div className="min-h-screen bg-cc-base flex items-center justify-center">
        <p className="text-cc-text/25 text-xs tracking-widest uppercase font-sans">Cargando...</p>
      </div>
    )
  }

  const balance = stats?.balance ?? 0

  return (
    <div className="min-h-screen bg-cc-base text-cc-text">

      {/* Navbar */}
      <nav className="bg-cc-dark px-6 md:px-12 py-3 flex items-center justify-between">
        <img src={LOGOS.mainWhite} alt="Court Culture" className="h-16 w-auto object-contain" />
        <div className="flex items-center gap-6">
          <span className="text-white/30 text-xs font-sans tracking-widest uppercase hidden md:block">{username}</span>
          <button
            onClick={() => navigate('/finanzas/nuevo')}
            className="bg-white text-cc-dark px-4 py-2 text-xs tracking-[0.15em] uppercase font-sans font-medium hover:bg-cc-base transition-colors duration-200"
          >
            + Nueva
          </button>
          <button
            onClick={handleLogout}
            className="text-white/30 text-xs font-sans tracking-widest uppercase hover:text-white/60 transition-colors"
          >
            Salir
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-3">Court Culture · Finanzas</p>
          <h1
            className="font-display text-cc-text leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic' }}
          >
            Dashboard
          </h1>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Ingresos totales', value: stats?.total_ingresos ?? 0, color: 'text-cc-text' },
            { label: 'Gastos totales', value: stats?.total_gastos ?? 0, color: 'text-cc-text/60' },
            { label: 'Balance', value: balance, color: balance >= 0 ? 'text-cc-text' : 'text-red-600' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border border-cc-text/10 p-6 bg-cc-text/[0.02]"
            >
              <p className="text-xs tracking-[0.18em] uppercase font-sans text-cc-text/30 mb-3">{card.label}</p>
              <p className={`font-display text-3xl ${card.color}`} style={{ fontWeight: 300, fontStyle: 'italic' }}>
                {formatMonto(card.value)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Gráfica */}
        {stats && stats.por_mes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="border border-cc-text/10 p-6 mb-6"
          >
            <p className="text-xs tracking-[0.18em] uppercase font-sans text-cc-text/30 mb-6">Últimos 6 meses</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={stats.por_mes.map(r => ({
                mes: formatMes(r.mes),
                Ingresos: r.ingresos || 0,
                Gastos: r.gastos || 0,
                Balance: (r.ingresos || 0) - (r.gastos || 0),
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(10,10,10,0.06)" />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fontFamily: 'Arial', fill: 'rgba(10,10,10,0.35)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Arial', fill: 'rgba(10,10,10,0.35)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v.toLocaleString('es-MX')}`} />
                <Tooltip
                  contentStyle={{ background: '#F9F8F5', border: '1px solid rgba(10,10,10,0.1)', borderRadius: 0, fontFamily: 'Arial', fontSize: 12 }}
                  formatter={(value) => [`$${Number(value).toLocaleString('es-MX')}`, '']}
                />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Arial', paddingTop: 16 }} />
                <Line type="monotone" dataKey="Ingresos" stroke="#2c3b28" strokeWidth={1.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="Gastos" stroke="rgba(10,10,10,0.3)" strokeWidth={1.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="Balance" stroke="#7a8c6e" strokeWidth={1.5} strokeDasharray="4 3" dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Por mes tabla */}
        {stats && stats.por_mes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="border border-cc-text/10 p-6 mb-12"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr className="border-b border-cc-text/8">
                    <th className="text-left text-xs tracking-widest uppercase font-sans text-cc-text/25 pb-3 font-normal">Mes</th>
                    <th className="text-right text-xs tracking-widest uppercase font-sans text-cc-text/25 pb-3 font-normal">Ingresos</th>
                    <th className="text-right text-xs tracking-widest uppercase font-sans text-cc-text/25 pb-3 font-normal">Gastos</th>
                    <th className="text-right text-xs tracking-widest uppercase font-sans text-cc-text/25 pb-3 font-normal">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.por_mes.map(row => {
                    const bal = (row.ingresos || 0) - (row.gastos || 0)
                    return (
                      <tr key={row.mes} className="border-b border-cc-text/5">
                        <td className="py-3 font-sans text-sm text-cc-text/60 capitalize">{formatMes(row.mes)}</td>
                        <td className="py-3 text-right font-sans text-sm text-cc-text/70">{formatMonto(row.ingresos || 0)}</td>
                        <td className="py-3 text-right font-sans text-sm text-cc-text/50">{formatMonto(row.gastos || 0)}</td>
                        <td className={`py-3 text-right font-sans text-sm ${bal >= 0 ? 'text-cc-text/70' : 'text-red-500'}`}>{formatMonto(bal)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Transacciones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs tracking-[0.18em] uppercase font-sans text-cc-text/30">Transacciones</p>
            <div className="flex gap-2">
              {(['todos', 'ingreso', 'gasto'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  className={`text-xs tracking-widest uppercase font-sans px-3 py-1.5 border transition-colors duration-200 ${
                    filtro === f
                      ? 'bg-cc-text text-cc-base border-cc-text'
                      : 'border-cc-text/15 text-cc-text/35 hover:text-cc-text/60'
                  }`}
                >
                  {f === 'todos' ? 'Todos' : f === 'ingreso' ? 'Ingresos' : 'Gastos'}
                </button>
              ))}
            </div>
          </div>

          {filtradas.length === 0 ? (
            <div className="border border-cc-text/8 p-12 text-center">
              <p className="text-cc-text/25 text-sm font-sans">No hay transacciones</p>
            </div>
          ) : (
            <div className="border border-cc-text/10 divide-y divide-cc-text/6">
              {filtradas.map(t => (
                <div key={t.id} className="flex items-start justify-between px-5 py-4 hover:bg-cc-text/[0.02] transition-colors">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${t.tipo === 'ingreso' ? 'bg-cc-text/50' : 'bg-cc-text/20'}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-sans text-sm text-cc-text/70">{t.categoria}</span>
                        {t.quien && (
                          <span className="text-xs font-sans text-cc-text/30">· {t.quien}</span>
                        )}
                      </div>
                      {t.descripcion && (
                        <p className="text-xs font-sans text-cc-text/30 leading-relaxed">{t.descripcion}</p>
                      )}
                      <p className="text-xs font-sans text-cc-text/25 mt-0.5">{formatFecha(t.fecha)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className={`font-sans text-sm ${t.tipo === 'ingreso' ? 'text-cc-text' : 'text-cc-text/55'}`}>
                      {t.tipo === 'gasto' ? '−' : '+'}{formatMonto(Number(t.monto))}
                    </span>
                    <button
                      onClick={() => handleEliminar(t.id)}
                      className="text-cc-text/15 hover:text-red-400 transition-colors text-xs font-sans"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  )
}

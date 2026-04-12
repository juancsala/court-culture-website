import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginFinanzas } from '../../api/finanzas'
import { LOGOS } from '../../assets'

export default function FinanzasLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { token, username } = await loginFinanzas(form.username, form.password)
      localStorage.setItem('finanzas_token', token)
      localStorage.setItem('finanzas_user', username)
      navigate('/finanzas/dashboard')
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cc-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-12">
          <img src={LOGOS.mainWhite} alt="Court Culture" className="h-16 w-auto opacity-80" />
        </div>

        <p className="text-xs tracking-[0.25em] uppercase font-sans text-white/25 mb-3 text-center">
          Finanzas
        </p>
        <h1
          className="font-display text-white text-center mb-10 leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 300, fontStyle: 'italic' }}
        >
          Acceso privado
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs tracking-[0.18em] uppercase font-sans text-white/30 mb-2">
              Usuario
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              className="w-full border border-white/10 bg-white/5 px-4 py-3.5 font-sans text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.18em] uppercase font-sans text-white/30 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full border border-white/10 bg-white/5 px-4 py-3.5 font-sans text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
            />
          </div>

          {error && (
            <p className="text-red-400/80 text-xs font-sans">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-white text-cc-dark px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cc-base transition-colors duration-300 disabled:opacity-40"
          >
            {loading ? 'Entrando...' : 'Entrar →'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

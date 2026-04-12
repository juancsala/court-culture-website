const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

export interface Transaccion {
  id: number
  tipo: 'ingreso' | 'gasto'
  categoria: string
  monto: string
  descripcion: string
  quien: string
  fecha: string
  creado: string
  creado_por_nombre: string
}

export interface DashboardStats {
  total_ingresos: number
  total_gastos: number
  balance: number
  por_mes: { mes: string; ingresos: number; gastos: number }[]
  por_categoria: { categoria: string; tipo: string; total: number }[]
}

function getToken() {
  return localStorage.getItem('finanzas_token')
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Token ${getToken()}`,
  }
}

export async function loginFinanzas(username: string, password: string): Promise<{ token: string; username: string }> {
  const res = await fetch(`${API_BASE}/api/finanzas/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Credenciales incorrectas')
  }
  return res.json()
}

export async function logoutFinanzas(): Promise<void> {
  await fetch(`${API_BASE}/api/finanzas/logout/`, {
    method: 'POST',
    headers: authHeaders(),
  })
  localStorage.removeItem('finanzas_token')
  localStorage.removeItem('finanzas_user')
}

export async function getTransacciones(tipo?: string): Promise<Transaccion[]> {
  const url = tipo
    ? `${API_BASE}/api/finanzas/transacciones/?tipo=${tipo}`
    : `${API_BASE}/api/finanzas/transacciones/`
  const res = await fetch(url, { headers: authHeaders() })
  if (res.status === 401) {
    localStorage.removeItem('finanzas_token')
    window.location.href = '/finanzas/login'
    throw new Error('No autenticado')
  }
  return res.json()
}

export async function crearTransaccion(data: {
  tipo: string
  categoria: string
  monto: number
  descripcion: string
  quien: string
  fecha: string
}): Promise<Transaccion> {
  const res = await fetch(`${API_BASE}/api/finanzas/transacciones/nueva/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })
  if (res.status === 401) {
    localStorage.removeItem('finanzas_token')
    window.location.href = '/finanzas/login'
    throw new Error('No autenticado')
  }
  if (!res.ok) {
    const err = await res.json()
    throw new Error(Object.values(err).flat().join(', ') || 'Error al guardar')
  }
  return res.json()
}

export async function eliminarTransaccion(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/finanzas/transacciones/${id}/eliminar/`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (res.status === 401) {
    localStorage.removeItem('finanzas_token')
    window.location.href = '/finanzas/login'
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/api/finanzas/dashboard/`, { headers: authHeaders() })
  if (res.status === 401) {
    localStorage.removeItem('finanzas_token')
    window.location.href = '/finanzas/login'
    throw new Error('No autenticado')
  }
  return res.json()
}

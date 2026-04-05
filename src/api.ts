const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

export async function createMiembro(data: {
  nombre: string
  apellido: string
  fecha_nacimiento: string
  email: string
  telefono: string
  zona: string
  nivel: string
  como_se_entero: string
  tiene_raqueta: boolean
}): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/events/miembros/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    const firstError = Object.values(err)[0]
    throw new Error(Array.isArray(firstError) ? firstError[0] : 'Error al enviar el formulario')
  }
  return res.json()
}

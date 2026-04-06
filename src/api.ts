const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

export interface Event {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  lugar: string
  direccion: string
  capacidad_publica: number
  cupos_disponibles: number
  imagen: string | null
  precio_comunidad: string
  precio_general: string
  precio_actual: number
  fecha_apertura_comunidad: string | null
  fecha_apertura_publica: string | null
  acceso_comunidad: boolean
  acceso_publico: boolean
  refund_deadline: string | null
}

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${API_BASE}/api/events/`)
  if (!res.ok) throw new Error('Error al cargar eventos')
  return res.json()
}

export async function getEvent(id: number): Promise<Event> {
  const res = await fetch(`${API_BASE}/api/events/${id}/`)
  if (!res.ok) throw new Error('Evento no encontrado')
  return res.json()
}

export async function verificarMiembro(email: string): Promise<{ es_miembro: boolean }> {
  const res = await fetch(`${API_BASE}/api/events/verificar-miembro/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) return { es_miembro: false }
  return res.json()
}

export async function createCheckout(eventoId: number, data: {
  nombre: string
  email: string
  telefono: string
  nivel_tenis: string
}): Promise<{ checkout_url: string }> {
  const res = await fetch(`${API_BASE}/api/events/${eventoId}/checkout/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Error al procesar el pago')
  }
  return res.json()
}

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

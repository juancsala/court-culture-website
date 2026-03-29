const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

export interface Event {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  lugar: string
  capacidad: number
  cupos_disponibles: number
  imagen: string | null
  precio_early_bird: string
  precio_regular: string
  precio_actual: number
  early_bird_deadline: string | null
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

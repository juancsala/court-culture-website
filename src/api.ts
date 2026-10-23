const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

export interface Event {
  id: number
  titulo: string
  tipo: 'court_session' | 'warm_up_session'
  descripcion: string
  fecha: string
  hora: string
  lugar: string
  direccion: string
  capacidad_publica: number
  cupos_disponibles: number
  imagen: string | null
  whatsapp_evento: string
  maps_url: string
  precio_comunidad: string
  precio_general: string
  precio_actual: number
  fecha_apertura_comunidad: string | null
  fecha_apertura_publica: string | null
  acceso_comunidad: boolean
  acceso_publico: boolean
  finalizado: boolean
  refund_deadline: string | null
}

export async function unirseWaitlist(eventoId: number, email: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/events/${eventoId}/waitlist/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  const data = await res.json()
  return data
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

export async function validarCodigoDescuento(eventoId: number, codigo: string): Promise<{ valido: boolean; porcentaje?: number }> {
  const res = await fetch(`${API_BASE}/api/events/${eventoId}/validar-codigo/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo }),
  })
  if (!res.ok) return { valido: false }
  return res.json()
}

export async function createCheckout(eventoId: number, data: {
  nombre: string
  email: string
  telefono: string
  categoria: string
  codigo_descuento?: string
}): Promise<{ checkout_url: string }> {
  const res = await fetch(`${API_BASE}/api/events/${eventoId}/checkout/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    try {
      const err = await res.json()
      throw new Error(err.error || 'Error al procesar el pago')
    } catch {
      throw new Error('Error al procesar el pago. Intenta de nuevo.')
    }
  }
  return res.json()
}

export interface DisfrazParticipante {
  id: number
  nombre: string
  disfraz: string
  votos: number
}

export async function crearDisfrazParticipante(eventoId: number, data: { nombre: string; disfraz: string }): Promise<DisfrazParticipante> {
  const res = await fetch(`${API_BASE}/api/events/${eventoId}/disfraces/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Error al registrar tu disfraz')
  }
  return res.json()
}

export async function getDisfraces(eventoId: number): Promise<DisfrazParticipante[]> {
  const res = await fetch(`${API_BASE}/api/events/${eventoId}/disfraces/`)
  if (!res.ok) throw new Error('Error al cargar los disfraces')
  return res.json()
}

export async function votarDisfraz(participanteId: number, voterId: string): Promise<{ ok: boolean }> {
  const res = await fetch(`${API_BASE}/api/events/disfraces/${participanteId}/votar/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voter_id: voterId }),
  })
  if (!res.ok) throw new Error('Error al votar')
  return res.json()
}

export async function getMiVoto(voterId: string): Promise<{ participante_id: number | null }> {
  const res = await fetch(`${API_BASE}/api/events/disfraces/mi-voto/?voter_id=${encodeURIComponent(voterId)}`)
  if (!res.ok) return { participante_id: null }
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

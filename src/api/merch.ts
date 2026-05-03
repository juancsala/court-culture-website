const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

export interface TallaItem {
  genero: string
  talla: string
  stock: number
}

export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: string
  imagen_front_url: string
  imagen_back_url: string
  tallas: TallaItem[]
}

export async function getProductos(): Promise<Producto[]> {
  const res = await fetch(`${API_BASE}/api/merch/`)
  if (!res.ok) throw new Error('Error al cargar productos')
  return res.json()
}

export async function crearOrden(productoId: number, data: {
  talla: string
  genero: string
  nombre: string
  email: string
  telefono: string
  ciudad: string
  notas: string
}): Promise<{ checkout_url: string }> {
  const res = await fetch(`${API_BASE}/api/merch/${productoId}/orden/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    try {
      const err = await res.json()
      throw new Error(err.error || 'Error al procesar el pedido')
    } catch {
      throw new Error('Error al procesar el pedido. Intenta de nuevo.')
    }
  }
  return res.json()
}

export async function getOrdenBySession(sessionId: string) {
  const res = await fetch(`${API_BASE}/api/merch/orden/session/${sessionId}/`)
  if (!res.ok) return null
  return res.json()
}

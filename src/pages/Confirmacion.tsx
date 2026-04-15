import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LOGOS, LINKS } from '../assets'

const API_BASE = import.meta.env.VITE_API_URL || 'https://web-production-05964f.up.railway.app'

interface RegistroData {
  nombre: string
  email: string
  evento: string
  fecha: string
  hora: string
  lugar: string
  direccion: string
  precio: number
  codigo: string
  status: string
}

async function generarPDF(data: RegistroData) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const cream = [249, 248, 245] as [number, number, number]
  const dark = [44, 59, 40] as [number, number, number]
  const muted = [122, 140, 110] as [number, number, number]
  const light = [216, 212, 203] as [number, number, number]

  // Background
  doc.setFillColor(...cream)
  doc.rect(0, 0, 210, 297, 'F')

  // Top accent line
  doc.setDrawColor(...muted)
  doc.setLineWidth(0.3)
  doc.line(20, 18, 190, 18)

  // Label
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...muted)
  doc.setCharSpace(2)
  doc.text('LUGAR CONFIRMADO', 105, 28, { align: 'center' })
  doc.setCharSpace(0)

  // Title
  doc.setFont('times', 'italic')
  doc.setFontSize(36)
  doc.setTextColor(...dark)
  doc.text('Nos vemos', 105, 52, { align: 'center' })
  doc.text('en la cancha.', 105, 64, { align: 'center' })

  // Divider
  doc.setDrawColor(...light)
  doc.setLineWidth(0.3)
  doc.line(20, 74, 190, 74)

  // Details table
  const rows = [
    ['EVENTO', data.evento],
    ['FECHA', data.fecha],
    ['HORA', data.hora],
    ['LUGAR', `${data.lugar}${data.direccion ? ` · ${data.direccion}` : ''}`],
    ['PAGO', `$${data.precio.toLocaleString('es-MX')} MXN`],
    ['CÓDIGO', data.codigo],
  ]

  const labelX = 20
  const valueX = 80
  const maxValueWidth = 110

  let y = 84
  rows.forEach(([label, value], i) => {
    const isLast = i === rows.length - 1

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...muted)
    doc.setCharSpace(1.5)
    doc.text(label, labelX, y)
    doc.setCharSpace(0)

    doc.setFont('helvetica', isLast ? 'bold' : 'normal')
    doc.setFontSize(isLast ? 13 : 10)
    doc.setTextColor(...dark)
    const lines = doc.splitTextToSize(value, maxValueWidth)
    doc.text(lines, valueX, y)

    const lineH = Math.max(10, lines.length * 5 + 4)
    y += lineH

    doc.setDrawColor(...light)
    doc.setLineWidth(0.2)
    doc.line(labelX, y - 2, 190, y - 2)
  })

  // QR
  y += 8
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.codigo)}&color=2C3B28&bgcolor=F9F8F5&margin=10`
  try {
    const img = await fetch(qrUrl)
    const blob = await img.blob()
    const reader = new FileReader()
    await new Promise<void>(resolve => {
      reader.onload = () => {
        doc.addImage(reader.result as string, 'PNG', 80, y, 50, 50)
        resolve()
      }
      reader.readAsDataURL(blob)
    })
  } catch {}

  y += 55
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...muted)
  doc.setCharSpace(1)
  doc.text('PRESENTA ESTE CÓDIGO EN LA ENTRADA', 105, y, { align: 'center' })
  doc.setCharSpace(0)

  // Footer
  doc.setDrawColor(...muted)
  doc.setLineWidth(0.3)
  doc.line(20, 272, 190, 272)
  doc.setFontSize(8)
  doc.setTextColor(...muted)
  doc.text('Court Culture  ·  @courtculture.mty  ·  Monterrey, México', 105, 280, { align: 'center' })

  doc.save(`ticket-${data.codigo}.pdf`)
}

export default function Confirmacion() {
  const [registro, setRegistro] = useState<RegistroData | null>(null)
  const [generando, setGenerando] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return
    fetch(`${API_BASE}/api/events/registro/session/${sessionId}/`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data && !data.error) setRegistro(data) })
      .catch(() => {})
  }, [])

  async function handleDescargar() {
    if (!registro) return
    setGenerando(true)
    try {
      await generarPDF(registro)
    } finally {
      setGenerando(false)
    }
  }

  return (
    <div className="min-h-screen bg-cc-base flex flex-col">

      {/* Navbar */}
      <nav className="bg-cc-dark px-6 md:px-12 py-3 flex items-center justify-between">
        <a href="/">
          <img src={LOGOS.mainWhite} alt="Court Culture" className="h-24 w-auto object-contain" />
        </a>
        <a href="/eventos" className="text-xs tracking-[0.2em] uppercase font-sans text-white/50 hover:text-white transition-colors duration-200">
          Ver eventos
        </a>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 border border-cc-text/20 rounded-full flex items-center justify-center mx-auto mb-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cc-text">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/30 mb-6">Lugar confirmado</p>

          <h1
            className="font-display text-cc-text leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Nos vemos<br />en la cancha.
          </h1>

          {registro && (
            <p className="font-sans text-cc-text/50 text-sm mb-1">
              {registro.nombre.split(' ')[0]} · {registro.codigo}
            </p>
          )}

          <p className="font-sans text-cc-text/40 leading-relaxed mb-1 text-sm">
            Tu lugar está confirmado. Recibirás tu ticket por correo con todos los detalles del evento.
          </p>
          <p className="font-sans text-cc-text/30 text-sm leading-relaxed mb-10">
            Cualquier pregunta escríbenos a{' '}
            <a href="https://www.instagram.com/courtculture.mty" target="_blank" rel="noopener noreferrer" className="text-cc-text/50 underline hover:text-cc-text transition-colors">
              @courtculture.mty
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-cc-text text-cc-base px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-cc-text/90 transition-colors duration-300"
            >
              Unirse a WhatsApp
            </a>
            {registro && (
              <button
                onClick={handleDescargar}
                disabled={generando}
                className="inline-flex items-center justify-center border border-cc-text/20 text-cc-text/60 px-8 py-4 text-xs tracking-widest uppercase font-sans font-light hover:border-cc-text/40 hover:text-cc-text transition-colors duration-300 disabled:opacity-40"
              >
                {generando ? 'Generando...' : 'Descargar ticket'}
              </button>
            )}
            <a
              href="/eventos"
              className="inline-flex items-center justify-center border border-cc-text/10 text-cc-text/35 px-8 py-4 text-xs tracking-widest uppercase font-sans font-light hover:border-cc-text/20 hover:text-cc-text/55 transition-colors duration-300"
            >
              Ver eventos
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

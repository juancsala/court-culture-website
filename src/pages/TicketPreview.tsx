import { useEffect } from 'react'

const dataPrueba = {
  nombre: 'Juan García',
  email: 'juan@ejemplo.com',
  evento: 'Court Sessions Vol. I',
  fecha: 'Sábado 25 de abril de 2026',
  hora: '4:00 pm – 7:00 pm',
  lugar: 'Fer Peña Tennis Club',
  direccion: 'Prolongacion Padre Mier S/N, Misión del Valle, 66237 San Pedro Garza García, N.L.',
  precio: 350,
  codigo: 'CC-0001',
  status: 'confirmado',
}

async function generarPDF(data: typeof dataPrueba) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const cream = [249, 248, 245] as [number, number, number]
  const dark = [44, 59, 40] as [number, number, number]
  const muted = [122, 140, 110] as [number, number, number]
  const light = [216, 212, 203] as [number, number, number]

  doc.setFillColor(...cream)
  doc.rect(0, 0, 210, 297, 'F')

  doc.setDrawColor(...muted)
  doc.setLineWidth(0.3)
  doc.line(20, 18, 190, 18)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...muted)
  doc.setCharSpace(2)
  doc.text('LUGAR CONFIRMADO', 105, 28, { align: 'center' })
  doc.setCharSpace(0)

  doc.setFont('times', 'italic')
  doc.setFontSize(36)
  doc.setTextColor(...dark)
  doc.text('Nos vemos', 105, 52, { align: 'center' })
  doc.text('en la cancha.', 105, 64, { align: 'center' })

  doc.setDrawColor(...light)
  doc.setLineWidth(0.3)
  doc.line(20, 74, 190, 74)

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

  doc.setDrawColor(...muted)
  doc.setLineWidth(0.3)
  doc.line(20, 272, 190, 272)
  doc.setFontSize(8)
  doc.setTextColor(...muted)
  doc.text('Court Culture  ·  @courtculture.mty  ·  Monterrey, México', 105, 280, { align: 'center' })

  doc.save(`ticket-preview-${data.codigo}.pdf`)
}

export default function TicketPreview() {
  useEffect(() => {
    generarPDF(dataPrueba)
  }, [])

  return (
    <div className="min-h-screen bg-cc-base flex items-center justify-center">
      <p className="text-cc-text/30 text-xs tracking-widest uppercase font-sans">Generando PDF de prueba...</p>
    </div>
  )
}

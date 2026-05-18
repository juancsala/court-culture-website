import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const LOCACIONES = [
  {
    num: '01',
    nombre: 'Fer Peña Tennis Club',
    tag: 'San Pedro Garza García',
    descripcion: 'Cuatro canchas con vista directa a la montaña y un ambiente que lo dice todo. Íntimo, exclusivo y con el nivel justo. Nuestro spot favorito para los Court Sessions.',
    detalle: '4 canchas · Vista a la montaña',
    direccion: 'Prolongación Padre Mier S/N, Misión del Valle, 66237 San Pedro Garza García, N.L.',
    maps: 'https://maps.app.goo.gl/ZY1gBjnRCe2Rtu3EA',
    imagen: '/web/ferpeña.jpg',
  },
  {
    num: '02',
    nombre: 'Centro Tenístico',
    tag: 'Monterrey Centro',
    descripcion: 'La instalación de tenis más grande de Monterrey, justo al lado del Estadio Tigres. 29 canchas, cafetería, ambiente social y competitivo. El corazón del tenis en la ciudad.',
    detalle: '29 canchas · Cafetería · Estadio Tigres',
    direccion: 'Av. Manuel L. Barragán s/n, Parque Niños Héroes, 64290 Monterrey, N.L.',
    maps: 'https://maps.app.goo.gl/dCfZFK3ivjoxw61E9',
    imagen: '/web/centro-tenistico.jpg',
  },
]

export default function LocacionesPage() {
  return (
    <div className="min-h-screen bg-cc-base text-cc-text">
      <Navbar solid />
      <div className="h-16 md:h-20" />

      {/* Hero */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src="/web/locaciones-hero.jpg" alt="Court Culture canchas"
          className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
        <div className="absolute inset-0 bg-cc-dark/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.25em] uppercase font-sans text-white/50 mb-4">
            Court Culture · Monterrey
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic' }}>
            Donde jugamos.
          </motion.h1>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-16 pb-6">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="font-sans text-cc-text/50 text-sm md:text-base leading-relaxed">
          Cada evento de Court Culture tiene lugar en una cancha con personalidad. Estos son los espacios donde la comunidad se reúne a jugar, conectar y vivir el tenis de otra forma.
        </motion.p>
      </div>

      {/* Locaciones */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24 pt-8">
        {LOCACIONES.map((loc, i) => (
          <motion.div
            key={loc.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
            className={`grid grid-cols-1 md:grid-cols-2 gap-0 mb-0 border-t border-cc-text/10 ${i === LOCACIONES.length - 1 ? 'border-b' : ''}`}
          >
            {/* Imagen — alterna izquierda/derecha */}
            <div className={`relative overflow-hidden h-72 md:h-[440px] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <img src={loc.imagen} alt={loc.nombre}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: 'center center' }} />
              <div className="absolute inset-0 bg-cc-dark/10" />
              <div className="absolute top-6 left-6">
                <span className="font-display text-white/30 text-6xl" style={{ fontWeight: 300 }}>{loc.num}</span>
              </div>
            </div>

            {/* Info */}
            <div className={`flex flex-col justify-center px-8 md:px-12 py-12 md:py-16 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <p className="text-xs tracking-[0.2em] uppercase font-sans text-cc-text/25 mb-3">{loc.tag}</p>
              <h2
                className="font-display text-cc-text leading-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, fontStyle: 'italic' }}
              >
                {loc.nombre}
              </h2>
              <p className="font-sans text-cc-text/50 text-sm leading-relaxed mb-6">{loc.descripcion}</p>

              <div className="border-t border-cc-text/8 pt-5 space-y-3">
                <p className="text-xs tracking-widest uppercase font-sans text-cc-text/30">{loc.detalle}</p>
                <p className="font-sans text-cc-text/35 text-xs leading-relaxed">{loc.direccion}</p>
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-sans text-cc-text/45 hover:text-cc-text transition-colors duration-200 mt-1"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="border-t border-cc-text/8 px-6 md:px-12 py-16 text-center">
        <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-5">Court Culture · Monterrey</p>
        <h2 className="font-display text-cc-text mb-8 leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, fontStyle: 'italic' }}>
          ¿Listo para jugar?
        </h2>
        <a href="/eventos"
          className="inline-flex items-center gap-3 border border-cc-text/25 text-cc-text/60 px-10 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:bg-cc-text hover:text-cc-base hover:border-cc-text transition-all duration-300">
          Ver próximos eventos →
        </a>
      </div>
    </div>
  )
}

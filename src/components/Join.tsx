import { motion } from 'framer-motion'
import { LOGOS, LINKS } from '../assets'

export default function Join() {
  return (
    <section className="bg-cc-dark py-28 md:py-40 relative overflow-hidden">
      {/* Emblem watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <img src={LOGOS.emblemWhite} alt="" className="w-96 h-96 object-contain opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white/40 text-xs tracking-widest uppercase font-sans mb-6"
          >
            Únete a la comunidad
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-tight"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Sé parte
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 500 }}>de esto.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 font-sans font-light text-base mt-6 max-w-md mx-auto leading-relaxed"
          >
            Llega al evento, juega, quédate a convivir. La cancha es el pretexto, lo demás pasa solo.
          </motion.p>
        </div>

        {/* 2 main cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Únete a la comunidad */}
          <motion.a
            href="/comunidad"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0 }}
            whileHover={{ y: -4 }}
            className="group block border border-white/10 p-8 md:p-10 hover:border-white/25 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-8 text-white/60 group-hover:text-white transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <p className="font-display text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 400 }}>
                Únete como miembro
              </p>
              <p className="text-white/40 font-sans text-sm leading-relaxed mb-8">
                Acceso anticipado a eventos y precio preferencial en tickets.
              </p>
              <span className="inline-flex items-center gap-2 text-white/60 group-hover:text-white text-xs tracking-widest uppercase font-sans transition-colors duration-300">
                Registrarme gratis
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </span>
            </div>
          </motion.a>

          {/* Ver eventos */}
          <motion.a
            href="/eventos"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            whileHover={{ y: -4 }}
            className="group block border border-white/10 p-8 md:p-10 hover:border-white/25 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-8 text-white/60 group-hover:text-white transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <p className="font-display text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 400 }}>
                Ver eventos
              </p>
              <p className="text-white/40 font-sans text-sm leading-relaxed mb-8">
                Consulta la agenda y reserva tu lugar en el próximo evento.
              </p>
              <span className="inline-flex items-center gap-2 text-white/60 group-hover:text-white text-xs tracking-widest uppercase font-sans transition-colors duration-300">
                Ver agenda
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </span>
            </div>
          </motion.a>
        </div>

        {/* WhatsApp strip */}
        <motion.a
          href={LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.24 }}
          className="group flex items-center justify-between border border-white/10 px-8 py-6 hover:border-white/25 hover:bg-white/5 transition-all duration-300"
        >
          <div className="flex items-center gap-5">
            <div className="text-white/50 group-hover:text-white transition-colors duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-sans text-sm font-medium">WhatsApp — Únete a nuestro grupo</p>
              <p className="text-white/35 font-sans text-xs mt-0.5">Actualizaciones, fotos y anuncios de eventos</p>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="text-white/25 group-hover:text-white/60 transition-colors duration-300 shrink-0">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </motion.a>

      </div>
    </section>
  )
}

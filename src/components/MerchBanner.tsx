import { motion } from 'framer-motion'

export default function MerchBanner() {
  return (
    <section className="bg-cc-base overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden h-72 md:h-auto order-1"
        >
          <img
            src="/merch/modelo1.jpg"
            alt="Court Culture Merch"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-cc-dark/10" />
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center px-10 md:px-16 py-16 md:py-20 order-2 bg-cc-base border-t border-cc-text/8 md:border-t-0 md:border-l"
        >
          <p className="text-xs tracking-[0.25em] uppercase font-sans text-cc-text/25 mb-4">
            Court Culture · Merch
          </p>
          <h2
            className="font-display text-cc-text leading-none mb-5"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic' }}
          >
            Drop 01
          </h2>
          <p className="font-sans text-cc-text/45 text-sm leading-relaxed mb-3 max-w-xs">
            Playera Vol. I — diseño exclusivo de la primera Court Session. Edición limitada.
          </p>
          <p className="font-sans text-cc-text/25 text-xs tracking-widest uppercase mb-10">
            $500 MXN · Tallas limitadas
          </p>
          <a
            href="/merch"
            className="self-start border border-cc-text/25 text-cc-text/70 px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:bg-cc-text hover:text-cc-base hover:border-cc-text transition-all duration-300"
          >
            Ver colección →
          </a>
        </motion.div>

      </div>
    </section>
  )
}

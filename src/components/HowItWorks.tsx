import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Entérate del evento.',
    description: 'Anunciamos cada sesión en redes. Síguenos para no perderte ninguna.',
  },
  {
    number: '02',
    title: 'Reserva tu cupo.',
    description: 'Los lugares son limitados. Aparta el tuyo a tiempo y confirma tu asistencia.',
  },
  {
    number: '03',
    title: 'Juega, convive y quédate.',
    description: 'Llega, conoce gente, disfruta el partido — y quédate a la convivencia después.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-cc-light py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-cc-muted text-xs tracking-widest uppercase font-sans mb-4">
            Cómo funciona
          </p>
          <h2
            className="font-display text-cc-text leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic' }}
          >
            Tres pasos.
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 500 }}>Nada más.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-cc-text/10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="md:px-10 py-12 md:py-0 first:md:pl-0 last:md:pr-0"
            >
              <span
                className="block font-display text-cc-accent mb-6"
                style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 300, lineHeight: 1 }}
              >
                {step.number}
              </span>
              <h3
                className="font-display text-cc-text mb-4"
                style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 500 }}
              >
                {step.title}
              </h3>
              <p className="text-cc-muted font-sans font-light text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

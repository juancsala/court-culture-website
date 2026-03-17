import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LOGOS, LINKS } from '../assets'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cc-dark/95 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={LOGOS.mainWhite}
            alt="Court Culture"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* Nav actions */}
        <div className="flex items-center gap-6">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-white/70 hover:text-white transition-colors duration-200 text-xs tracking-widest uppercase font-sans font-light"
          >
            Instagram
          </a>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cc-dark bg-cc-base/95 hover:bg-white px-5 py-2 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200"
          >
            Join
          </a>
        </div>
      </div>
    </motion.header>
  )
}

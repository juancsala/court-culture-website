import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Concept from './components/Concept'
import HowItWorks from './components/HowItWorks'
import Community from './components/Community'
import Join from './components/Join'
import Footer from './components/Footer'
import PreRegistro from './pages/PreRegistro'

function HomePage() {
  return (
    <div className="bg-cc-base text-cc-text overflow-x-hidden">
      <Navbar />
      <Hero />
      <Concept />
      <HowItWorks />
      <Community />
      <Join />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comunidad" element={<PreRegistro />} />
      </Routes>
    </BrowserRouter>
  )
}

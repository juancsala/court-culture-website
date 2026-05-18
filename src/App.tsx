import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Concept from './components/Concept'
import HowItWorks from './components/HowItWorks'
import Community from './components/Community'
import Join from './components/Join'
import MerchBanner from './components/MerchBanner'
import Footer from './components/Footer'
import PreRegistro from './pages/PreRegistro'
import EventsPage from './pages/EventsPage'
import EventDetail from './pages/EventDetail'
import Confirmacion from './pages/Confirmacion'
import FinanzasLogin from './pages/finanzas/Login'
import FinanzasDashboard from './pages/finanzas/Dashboard'
import FinanzasNuevo from './pages/finanzas/Nuevo'
import ProtectedRoute from './pages/finanzas/ProtectedRoute'
import MerchPage from './pages/Merch'
import SponsorsPage from './pages/Sponsors'
import ReembolsoPage from './pages/Reembolso'
import ContactoPage from './pages/Contacto'
import LocacionesPage from './pages/Locaciones'
import MerchConfirmacion from './pages/MerchConfirmacion'

function HomePage() {
  return (
    <div className="bg-cc-base text-cc-text overflow-x-hidden">
      <Navbar />
      <Hero />
      <Concept />
      <HowItWorks />
      <Community />
      {/* <MerchBanner /> */}
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
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/eventos/:id" element={<EventDetail />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/merch" element={<MerchPage />} />
        <Route path="/merch/confirmacion" element={<MerchConfirmacion />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/reembolso" element={<ReembolsoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/locaciones" element={<LocacionesPage />} />
        <Route path="/finanzas/login" element={<FinanzasLogin />} />
        <Route path="/finanzas/dashboard" element={<ProtectedRoute><FinanzasDashboard /></ProtectedRoute>} />
        <Route path="/finanzas/nuevo" element={<ProtectedRoute><FinanzasNuevo /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

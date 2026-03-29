import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EventDetail from './pages/EventDetail'
import Confirmacion from './pages/Confirmacion'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/eventos/:id" element={<EventDetail />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
      </Routes>
    </BrowserRouter>
  )
}

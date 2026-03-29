import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Concept from './components/Concept'
import HowItWorks from './components/HowItWorks'
import Community from './components/Community'
import Join from './components/Join'
import Footer from './components/Footer'

export default function App() {
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

import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import About from '../components/sections/About'
import CallToAction from '../components/sections/CallToAction'
import Hero from '../components/sections/Hero'
import ProductShowcase from '../components/sections/ProductShowcase'
import Services from '../components/sections/Services'
import { navItems } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'

const sectionIds = navItems.map((item) => item.id)

/**
 * Página única institucional da MenteLab.
 * Organiza as secções num contentor com scroll-snap e um cabeçalho fixo.
 */
function Home() {
  const activeSection = useActiveSection(sectionIds, '#snap-root')

  return (
    <>
      <a href="#inicio" className="skip-link">
        Saltar para o conteúdo
      </a>

      <Header activeSection={activeSection} />

      <div id="snap-root" className="snap-container scroll-pt-16">
        <Hero />
        <Services />
        <About />
        <ProductShowcase />
        <CallToAction />
        <Footer />
      </div>
    </>
  )
}

export default Home

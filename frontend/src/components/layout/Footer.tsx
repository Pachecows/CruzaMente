import type { MouseEvent } from 'react'
import Logo from '../ui/Logo'
import { navItems } from '../../data/navigation'
import { scrollToSection } from '../../lib/scroll'

/**
 * Rodapé do site, com logótipo, navegação e informação de direitos de autor.
 * Participa no scroll-snap como bloco final mais curto.
 */
const currentYear = new Date().getFullYear()

function Footer() {
  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <footer className="snap-start bg-navy-900 text-navy-200">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-4 font-sans text-sm leading-relaxed text-navy-400">
              Tecnologia que estimula a mente. Jogos digitais para exercitar o
              raciocínio, o vocabulário e a memória.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              Navegação
            </h2>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="rounded font-sans text-sm text-navy-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-navy-700 pt-6">
          <p className="font-sans text-sm text-navy-400">
            © {currentYear} MenteLab. Projeto académico de demonstração. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

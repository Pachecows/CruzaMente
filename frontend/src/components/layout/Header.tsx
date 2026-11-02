import type { MouseEvent } from 'react'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import { navItems } from '../../data/navigation'
import { scrollToSection } from '../../lib/scroll'

interface HeaderProps {
  /** Id da secção atualmente ativa, para destaque no menu. */
  activeSection: string
}

/**
 * Cabeçalho fixo com logótipo, navegação por âncoras e botão de ação.
 * A navegação faz scroll suave até cada secção e destaca a secção ativa.
 */
function Header({ activeSection }: HeaderProps) {
  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, 'inicio')}
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Ir para o início"
        >
          <Logo />
        </a>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-md px-3 py-2 font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      isActive
                        ? 'text-brand-700'
                        : 'text-navy-600 hover:text-navy-900'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-600 transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <Button
          as="a"
          href="#cruzamente"
          variant="primary"
          onClick={(e) => handleNavClick(e, 'cruzamente')}
        >
          Conhecer os nossos jogos
        </Button>
      </div>
    </header>
  )
}

export default Header

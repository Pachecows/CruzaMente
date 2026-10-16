import type { ReactNode } from 'react'

interface SectionProps {
  /** Identificador usado como âncora de navegação (ex.: "servicos"). */
  id: string
  /** Rótulo acessível da secção, lido por tecnologias de apoio. */
  ariaLabel: string
  children: ReactNode
  /** Classes extra aplicadas ao <section> (ex.: cor de fundo). */
  className?: string
  /** Classes extra do contentor interno centralizado. */
  innerClassName?: string
  /**
   * Secção de altura total que participa no scroll-snap (predefinição).
   * Definir como false para blocos mais curtos, como o rodapé.
   */
  fullHeight?: boolean
}

/**
 * Wrapper semântico de secção para a navegação one-page com scroll-snap.
 * Cada secção encaixa no topo do ecrã e centra o conteúdo.
 */
function Section({
  id,
  ariaLabel,
  children,
  className = '',
  innerClassName = '',
  fullHeight = true,
}: SectionProps) {
  const heightClasses = fullHeight
    ? 'min-h-screen snap-start flex items-center'
    : 'snap-start'

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${heightClasses} w-full ${className}`}
    >
      <div className={`mx-auto w-full max-w-6xl px-6 py-20 ${innerClassName}`}>
        {children}
      </div>
    </section>
  )
}

export default Section

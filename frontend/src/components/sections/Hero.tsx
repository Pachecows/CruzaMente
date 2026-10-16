import { ArrowRight, Mail } from 'lucide-react'
import type { MouseEvent } from 'react'
import Button from '../ui/Button'
import Section from '../ui/Section'
import { scrollToSection } from '../../lib/scroll'

/** Pequena grelha decorativa que evoca palavras cruzadas. */
function HeroGrid() {
  // 1 = célula clara, 0 = célula escura, 'C'/'M' = célula com letra de destaque.
  const cells: Array<number | string> = [
    1, 0, 1, 1, 'C',
    0, 1, 1, 0, 1,
    1, 1, 'M', 1, 0,
    1, 0, 1, 1, 1,
    'E', 1, 0, 1, 1,
  ]

  return (
    <div
      aria-hidden="true"
      className="grid w-full max-w-sm grid-cols-5 gap-1.5 rounded-2xl bg-brand-600 p-4 shadow-xl ring-1 ring-brand-700/40"
    >
      {cells.map((cell, index) => {
        if (cell === 0) {
          return (
            <div
              key={index}
              className="aspect-square rounded-md bg-navy-900"
            />
          )
        }
        const hasLetter = typeof cell === 'string'
        return (
          <div
            key={index}
            className={`flex aspect-square items-center justify-center rounded-md font-heading text-lg font-bold ${
              hasLetter
                ? 'bg-accent-400 text-navy-900'
                : 'bg-white text-navy-200'
            }`}
          >
            {hasLetter ? cell : ''}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Secção inicial com a proposta de valor da MenteLab e os botões de ação.
 */
function Hero() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <Section id="inicio" ariaLabel="Início" className="bg-white">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 font-sans text-sm font-medium text-brand-700">
            Tecnologia que estimula a mente
          </span>

          <h1 className="mt-6 font-heading text-5xl font-extrabold leading-tight text-navy-900">
            Desafia a tua mente.{' '}
            <span className="text-brand-600">Descobre novas possibilidades.</span>
          </h1>

          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-navy-600">
            Na MenteLab criamos jogos digitais que tornam o raciocínio, o
            vocabulário e a lógica uma experiência divertida e estimulante. Uma
            forma simples de exercitar a mente, ao teu ritmo.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              as="a"
              href="#cruzamente"
              variant="primary"
              size="lg"
              onClick={(e) => handleClick(e, 'cruzamente')}
            >
              Conhecer o CruzaMente
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              as="a"
              href="#contacto"
              variant="secondary"
              size="lg"
              onClick={(e) => handleClick(e, 'contacto')}
            >
              <Mail size={18} aria-hidden="true" />
              Contactar-nos
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroGrid />
        </div>
      </div>
    </Section>
  )
}

export default Hero

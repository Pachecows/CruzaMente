import { Layers, Palette, Sparkles, Wand2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import CrosswordMockup from '../ui/CrosswordMockup'
import Section from '../ui/Section'

interface Feature {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

const features: Feature[] = [
  {
    id: 'niveis',
    title: 'Diferentes níveis de dificuldade',
    description: 'Grelhas que acompanham a tua evolução, do simples ao desafiante.',
    icon: Layers,
  },
  {
    id: 'temas',
    title: 'Temas variados',
    description: 'Palavras organizadas por temas, para sessões sempre diferentes.',
    icon: Palette,
  },
  {
    id: 'simples',
    title: 'Experiência simples e intuitiva',
    description: 'Uma interface clara, pensada para começares a jogar sem esforço.',
    icon: Wand2,
  },
  {
    id: 'ia',
    title: 'Apoio de IA (em breve)',
    description:
      'No futuro, inteligência artificial para ajudar a criar novos conteúdos.',
    icon: Sparkles,
  },
]

/**
 * Secção de destaque do produto CruzaMente, com um mockup visual da grelha.
 */
function ProductShowcase() {
  return (
    <Section id="cruzamente" ariaLabel="CruzaMente" className="bg-navy-900 text-white">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex justify-center lg:justify-start">
          <CrosswordMockup />
        </div>

        <div>
          <span className="font-sans text-sm font-semibold uppercase tracking-wide text-accent-400">
            O nosso produto
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold">
            CruzaMente — palavras cruzadas que fazem pensar
          </h2>
          <p className="mt-5 font-sans text-lg leading-relaxed text-navy-200">
            O CruzaMente é o jogo de palavras cruzadas da MenteLab. Um conceito
            simples e familiar, com uma experiência moderna, para exercitares o
            vocabulário e o raciocínio a qualquer momento.
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <li key={feature.id} className="flex gap-3">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-400">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-navy-300">
                      {feature.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <p className="mt-8 font-sans text-sm text-navy-400">
            Pré-visualização do conceito. O jogo está em desenvolvimento.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default ProductShowcase

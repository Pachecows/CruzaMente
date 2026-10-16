import { Cpu, GraduationCap, Lightbulb } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section from '../ui/Section'

interface Value {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

const values: Value[] = [
  {
    id: 'tecnologia',
    title: 'Tecnologia',
    description:
      'Construímos sobre bases modernas e sólidas, com foco em simplicidade e qualidade.',
    icon: Cpu,
  },
  {
    id: 'criatividade',
    title: 'Criatividade',
    description:
      'Desenhamos jogos e desafios originais, que despertam curiosidade e vontade de continuar.',
    icon: Lightbulb,
  },
  {
    id: 'aprendizagem',
    title: 'Aprendizagem',
    description:
      'Acreditamos que jogar e aprender podem andar de mãos dadas, de forma natural e leve.',
    icon: GraduationCap,
  },
]

/**
 * Secção institucional que apresenta a MenteLab e a sua missão.
 */
function About() {
  return (
    <Section id="sobre" ariaLabel="Sobre nós" className="bg-white">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="font-sans text-sm font-semibold uppercase tracking-wide text-brand-600">
            Sobre a MenteLab
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold text-navy-900">
            Tecnologia e criatividade ao serviço da mente
          </h2>
          <p className="mt-5 font-sans text-lg leading-relaxed text-navy-600">
            A MenteLab é uma empresa de serviços digitais dedicada a criar jogos
            que estimulam o raciocínio, o vocabulário e a memória. Juntamos
            tecnologia, design e uma boa dose de criatividade para transformar o
            exercício mental numa experiência simples e envolvente.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-navy-600">
            A nossa missão é tornar a estimulação mental acessível a todos,
            através de produtos cuidados e fáceis de usar. O CruzaMente, o nosso
            jogo de palavras cruzadas, é o primeiro passo desse percurso.
          </p>
        </div>

        <ul className="grid gap-5">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <li
                key={value.id}
                className="flex gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-5"
              >
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-navy-900">
                    {value.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-navy-600">
                    {value.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

export default About

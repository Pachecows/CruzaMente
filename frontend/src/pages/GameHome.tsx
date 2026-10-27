import { ArrowLeft, ArrowRight, BrainCircuit, Layers, Palette, Play } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import CrosswordMockup from '../components/ui/CrosswordMockup'
import Logo from '../components/ui/Logo'

interface ModeCard {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

// Destaques do fluxo de jogo apresentados na página inicial.
const modes: ModeCard[] = [
  {
    id: 'jogar',
    title: 'Jogo rápido',
    description: 'Começa uma grelha de palavras cruzadas e desafia o teu vocabulário.',
    icon: Play,
  },
  {
    id: 'niveis',
    title: 'Níveis de dificuldade',
    description: 'Do simples ao desafiante, ao teu ritmo e à tua evolução.',
    icon: Layers,
  },
  {
    id: 'temas',
    title: 'Temas',
    description: 'Escolhe um tema e joga com palavras organizadas à tua escolha.',
    icon: Palette,
  },
]

/**
 * Página inicial da aplicação de jogos CruzaMente (rota /jogar).
 * Mantém a identidade visual da MenteLab e inicia o fluxo de jogo.
 */
function GameHome() {
  const navigate = useNavigate()

  // Navegação SPA para o site institucional, preservando ctrl/cmd+clique.
  const handleHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return
    }
    event.preventDefault()
    navigate('/')
  }

  // Avança para a configuração da partida (escolha de tema e dificuldade).
  const handleStart = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return
    }
    event.preventDefault()
    navigate('/jogar/configurar')
  }

  return (
    <div className="min-h-screen bg-navy-50 font-sans text-navy-900">
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>

      {/* Cabeçalho próprio da aplicação de jogos. */}
      <header className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" onClick={handleHome} aria-label="Voltar ao site da MenteLab">
            <Logo size={36} />
          </Link>
          <Button
            as="a"
            href="/"
            variant="ghost"
            onClick={handleHome}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Voltar ao site
          </Button>
        </div>
      </header>

      <main id="conteudo" className="mx-auto w-full max-w-6xl px-6 py-16">
        {/* Boas-vindas ao jogo. */}
        <section aria-label="Boas-vindas" className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 font-sans text-sm font-semibold text-brand-700">
              <BrainCircuit size={16} aria-hidden="true" />
              Aplicação em desenvolvimento
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-navy-900 sm:text-5xl">
              Bem-vindo ao CruzaMente
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-600">
              Este é o espaço do jogo de palavras cruzadas da MenteLab. Escolhe
              um tema e um nível de dificuldade e começa a jogar.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button as="a" href="/jogar/configurar" size="lg" onClick={handleStart}>
                <Play size={18} aria-hidden="true" />
                Começar
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button as="a" href="/" variant="secondary" size="lg" onClick={handleHome}>
                <ArrowLeft size={18} aria-hidden="true" />
                Voltar ao site
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <CrosswordMockup />
          </div>
        </section>

        {/* Modos de jogo (placeholders visuais). */}
        <section aria-label="Modos de jogo" className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-navy-900">
            O que vais poder fazer
          </h2>
          <p className="mt-2 text-navy-600">
            Uma antevisão das funcionalidades previstas para o CruzaMente.
          </p>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modes.map((mode) => {
              const Icon = mode.icon
              return (
                <li
                  key={mode.id}
                  className="flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy-900">
                    {mode.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {mode.description}
                  </p>
                </li>
              )
            })}
          </ul>
        </section>
      </main>

      <footer className="border-t border-navy-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-6 text-center text-sm text-navy-500">
          CruzaMente — um produto MenteLab.
        </div>
      </footer>
    </div>
  )
}

export default GameHome

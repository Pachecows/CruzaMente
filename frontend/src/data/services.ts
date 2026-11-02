import type { LucideIcon } from 'lucide-react'
import {
  Brain,
  Puzzle,
  SlidersHorizontal,
  Sparkles,
  SpellCheck,
  Target,
} from 'lucide-react'

export interface Service {
  /** Identificador estável, útil como chave de renderização. */
  id: string
  /** Título curto do serviço. */
  title: string
  /** Descrição breve da oferta. */
  description: string
  /** Ícone representativo (lucide-react). */
  icon: LucideIcon
}

/**
 * Oferta de serviços da MenteLab.
 * Apresentada como proposta da empresa, sem implicar que todas as
 * funcionalidades já estão disponíveis na aplicação.
 */
export const services: Service[] = [
  {
    id: 'palavras',
    title: 'Jogos de palavras e vocabulário',
    description:
      'Experiências centradas em palavras que ajudam a alargar o vocabulário de forma leve e envolvente.',
    icon: SpellCheck,
  },
  {
    id: 'logica',
    title: 'Desafios de lógica e raciocínio',
    description:
      'Puzzles pensados para estimular o raciocínio e a resolução de problemas passo a passo.',
    icon: Puzzle,
  },
  {
    id: 'dificuldade',
    title: 'Vários níveis de dificuldade',
    description:
      'Conteúdos ajustáveis, do iniciante ao avançado, para acompanhar o progresso de cada pessoa.',
    icon: SlidersHorizontal,
  },
  {
    id: 'temas',
    title: 'Experiências personalizadas por tema',
    description:
      'Jogos organizados por temas variados, para tornar cada sessão mais relevante e divertida.',
    icon: Target,
  },
  {
    id: 'estimulacao',
    title: 'Soluções digitais de estimulação mental',
    description:
      'Uma plataforma pensada para exercitar a mente de forma simples, acessível e consistente.',
    icon: Brain,
  },
  {
    id: 'ia',
    title: 'Apoio de IA na criação de conteúdos',
    description:
      'Tecnologia de inteligência artificial para apoiar, no futuro, a geração de conteúdos para os jogos.',
    icon: Sparkles,
  },
]

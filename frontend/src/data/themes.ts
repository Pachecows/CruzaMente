import type { LucideIcon } from 'lucide-react'
import { Dumbbell, Globe2, Music, PawPrint, UtensilsCrossed } from 'lucide-react'

export interface GameTheme {
  /** Identificador estável do tema. */
  id: string
  /** Nome apresentado ao jogador. */
  label: string
  /** Descrição curta do tema. */
  description: string
  /** Ícone representativo (lucide-react). */
  icon: LucideIcon
}

/**
 * Temas predefinidos para as grelhas de palavras cruzadas.
 */
export const themes: GameTheme[] = [
  {
    id: 'animais',
    label: 'Animais',
    description: 'Palavras do mundo animal, da savana ao oceano.',
    icon: PawPrint,
  },
  {
    id: 'geografia',
    label: 'Geografia',
    description: 'Países, cidades, rios e acidentes geográficos.',
    icon: Globe2,
  },
  {
    id: 'gastronomia',
    label: 'Gastronomia',
    description: 'Ingredientes, pratos e sabores de todo o mundo.',
    icon: UtensilsCrossed,
  },
  {
    id: 'musica',
    label: 'Música',
    description: 'Instrumentos, géneros e termos musicais.',
    icon: Music,
  },
  {
    id: 'desporto',
    label: 'Desporto',
    description: 'Modalidades, regras e vocabulário desportivo.',
    icon: Dumbbell,
  },
]

export interface Difficulty {
  /** Identificador estável do nível. */
  id: 'facil' | 'medio' | 'dificil'
  /** Nome apresentado ao jogador. */
  label: string
  /** Descrição curta do nível. */
  description: string
}

/** Níveis de dificuldade disponíveis (apenas visuais nesta fase). */
export const difficulties: Difficulty[] = [
  {
    id: 'facil',
    label: 'Fácil',
    description: 'Grelhas mais pequenas e palavras comuns.',
  },
  {
    id: 'medio',
    label: 'Médio',
    description: 'Um equilíbrio entre desafio e fluidez.',
  },
  {
    id: 'dificil',
    label: 'Difícil',
    description: 'Grelhas maiores e vocabulário mais exigente.',
  },
]

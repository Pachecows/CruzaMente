/**
 * Dados de uma grelha de palavras cruzadas.
 * Estrutura pensada para suportar uma grelha interativa (navegação, pistas e
 * estado de preenchimento).
 */

export type Orientation = 'across' | 'down'

export interface PuzzleCell {
  /** Linha (0-indexada). */
  row: number
  /** Coluna (0-indexada). */
  col: number
  /** Letra correta desta célula (maiúscula). */
  solution: string
  /** Número da pista que começa nesta célula, se aplicável. */
  number?: number
}

export interface Clue {
  /** Número da pista, partilhado com a célula inicial. */
  number: number
  /** Orientação da palavra. */
  orientation: Orientation
  /** Texto da pista. */
  text: string
  /** Resposta (maiúsculas, sem espaços). */
  answer: string
  /** Coordenadas da primeira célula da palavra. */
  startRow: number
  startCol: number
}

export interface Puzzle {
  /** Identificador do puzzle. */
  id: string
  /** Dimensão da grelha (quadrada). */
  size: number
  /** Células preenchíveis (as não listadas são bloqueadas). */
  cells: PuzzleCell[]
  /** Lista de pistas (across e down). */
  clues: Clue[]
}

// Grelha 5x5. As células não listadas são bloqueadas.
//
//   0 1 2 3 4
// 0 G A T O ·
// 1 · · I · ·
// 2 R A T O ·
// 3 · · R · ·
// 4 · · E · ·
//
// Across: 1 GATO, 3 RATO
// Down:   2 TIGRE
export const demoPuzzle: Puzzle = {
  id: 'demo-animais-facil',
  size: 5,
  cells: [
    // GATO (linha 0)
    { row: 0, col: 0, solution: 'G', number: 1 },
    { row: 0, col: 1, solution: 'A' },
    { row: 0, col: 2, solution: 'T', number: 2 },
    { row: 0, col: 3, solution: 'O' },
    // TIGRE (coluna 2) — restantes letras
    { row: 1, col: 2, solution: 'I' },
    { row: 2, col: 2, solution: 'G' },
    { row: 3, col: 2, solution: 'R' },
    { row: 4, col: 2, solution: 'E' },
    // RATO (linha 2) — restantes letras
    { row: 2, col: 0, solution: 'R', number: 3 },
    { row: 2, col: 1, solution: 'A' },
    { row: 2, col: 3, solution: 'O' },
  ],
  clues: [
    {
      number: 1,
      orientation: 'across',
      text: 'Felino doméstico que ronrona.',
      answer: 'GATO',
      startRow: 0,
      startCol: 0,
    },
    {
      number: 3,
      orientation: 'across',
      text: 'Pequeno roedor.',
      answer: 'RATO',
      startRow: 2,
      startCol: 0,
    },
    {
      number: 2,
      orientation: 'down',
      text: 'Grande felino listado.',
      answer: 'TIGRE',
      startRow: 0,
      startCol: 2,
    },
  ],
}

import { useMemo, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import type { Orientation, Puzzle } from '../../data/puzzle'

interface CrosswordGridProps {
  puzzle: Puzzle
  /** Letras introduzidas, indexadas por "linha-coluna". */
  entries: Record<string, string>
  /** Célula atualmente ativa. */
  active: { row: number; col: number }
  /** Orientação atual (across/down), afeta o avanço automático. */
  orientation: Orientation
  /** Notifica a página de uma alteração de letra. */
  onChange: (row: number, col: number, value: string) => void
  /** Notifica a página de mudança de célula ativa. */
  onActiveChange: (row: number, col: number) => void
  /** Alterna a orientação (ex.: ao premir uma seta perpendicular). */
  onToggleOrientation: () => void
}

const cellKey = (row: number, col: number) => `${row}-${col}`

/**
 * Grelha de palavras cruzadas interativa.
 * Suporta navegação por teclado (setas, Backspace, Tab implícito pelo foco),
 * escrita de letras e realce da célula ativa. É puramente de apresentação do
 * estado recebido — o estado do jogo vive na página.
 */
function CrosswordGrid({
  puzzle,
  entries,
  active,
  orientation,
  onChange,
  onActiveChange,
  onToggleOrientation,
}: CrosswordGridProps) {
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map())

  // Mapa de células preenchíveis para consulta rápida.
  const playableCells = useMemo(() => {
    const map = new Map<string, { number?: number }>()
    for (const cell of puzzle.cells) {
      map.set(cellKey(cell.row, cell.col), { number: cell.number })
    }
    return map
  }, [puzzle])

  const isPlayable = (row: number, col: number) =>
    playableCells.has(cellKey(row, col))

  const focusCell = (row: number, col: number) => {
    const input = inputRefs.current.get(cellKey(row, col))
    if (input) {
      input.focus()
      input.select()
      onActiveChange(row, col)
    }
  }

  // Procura a próxima célula preenchível numa direção, saltando bloqueadas.
  const step = (
    row: number,
    col: number,
    dRow: number,
    dCol: number,
  ): { row: number; col: number } | null => {
    let r = row + dRow
    let c = col + dCol
    while (r >= 0 && r < puzzle.size && c >= 0 && c < puzzle.size) {
      if (isPlayable(r, c)) return { row: r, col: c }
      r += dRow
      c += dCol
    }
    return null
  }

  const moveNext = (row: number, col: number) => {
    const delta = orientation === 'across' ? step(row, col, 0, 1) : step(row, col, 1, 0)
    if (delta) focusCell(delta.row, delta.col)
  }

  const movePrev = (row: number, col: number) => {
    const delta = orientation === 'across' ? step(row, col, 0, -1) : step(row, col, -1, 0)
    if (delta) focusCell(delta.row, delta.col)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number,
  ) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        if (orientation !== 'across') onToggleOrientation()
        else {
          const next = step(row, col, 0, 1)
          if (next) focusCell(next.row, next.col)
        }
        break
      case 'ArrowLeft':
        event.preventDefault()
        if (orientation !== 'across') onToggleOrientation()
        else {
          const prev = step(row, col, 0, -1)
          if (prev) focusCell(prev.row, prev.col)
        }
        break
      case 'ArrowDown':
        event.preventDefault()
        if (orientation !== 'down') onToggleOrientation()
        else {
          const next = step(row, col, 1, 0)
          if (next) focusCell(next.row, next.col)
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (orientation !== 'down') onToggleOrientation()
        else {
          const prev = step(row, col, -1, 0)
          if (prev) focusCell(prev.row, prev.col)
        }
        break
      case 'Backspace':
        event.preventDefault()
        if (entries[cellKey(row, col)]) {
          onChange(row, col, '')
        } else {
          movePrev(row, col)
          onChange(row, col, '')
        }
        break
      case ' ':
        event.preventDefault()
        onToggleOrientation()
        break
      default:
        break
    }
  }

  const handleInput = (
    value: string,
    row: number,
    col: number,
  ) => {
    const letter = value.slice(-1).toUpperCase()
    if (!/[A-ZÀ-Ü]/.test(letter) && letter !== '') return
    onChange(row, col, letter)
    if (letter) moveNext(row, col)
  }

  const letterSize = puzzle.size <= 5 ? 'text-3xl' : 'text-xl'

  return (
    <div
      className="grid aspect-square w-full gap-1.5 rounded-2xl bg-navy-900 p-3 shadow-xl sm:gap-2 sm:p-4"
      style={{
        gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${puzzle.size}, minmax(0, 1fr))`,
      }}
      role="grid"
      aria-label="Grelha de palavras cruzadas"
    >
      {Array.from({ length: puzzle.size }).map((_, row) =>
        Array.from({ length: puzzle.size }).map((__, col) => {
          const key = cellKey(row, col)
          const playable = playableCells.get(key)

          if (!playable) {
            return (
              <div
                key={key}
                className="aspect-square rounded-sm bg-navy-700"
                aria-hidden="true"
              />
            )
          }

          const isActive = active.row === row && active.col === col
          return (
            <div key={key} className="relative aspect-square" role="gridcell">
              {playable.number && (
                <span className="pointer-events-none absolute left-1 top-0.5 z-10 text-[11px] font-semibold text-navy-400">
                  {playable.number}
                </span>
              )}
              <input
                ref={(el) => {
                  if (el) inputRefs.current.set(key, el)
                  else inputRefs.current.delete(key)
                }}
                type="text"
                inputMode="text"
                maxLength={1}
                aria-label={`Linha ${row + 1}, coluna ${col + 1}`}
                value={entries[key] ?? ''}
                onChange={(e) => handleInput(e.target.value, row, col)}
                onKeyDown={(e) => handleKeyDown(e, row, col)}
                onFocus={() => onActiveChange(row, col)}
                className={
                  `h-full w-full rounded-md text-center font-heading ${letterSize} font-bold uppercase text-navy-900 caret-transparent transition-colors focus-visible:outline-none ` +
                  (isActive ? 'bg-brand-200 ring-2 ring-brand-600' : 'bg-white hover:bg-brand-50')
                }
              />
            </div>
          )
        }),
      )}
    </div>
  )
}

export default CrosswordGrid

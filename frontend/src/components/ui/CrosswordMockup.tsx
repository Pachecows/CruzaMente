interface CrosswordMockupProps {
  className?: string
}

// Representação estática de uma grelha de palavras cruzadas (apenas visual).
// null = célula bloqueada; string vazia = célula vazia; letra = célula preenchida.
type Cell = string | null

const grid: Cell[][] = [
  ['C', 'R', 'U', 'Z', null, 'M'],
  ['', null, '', '', null, 'E'],
  ['J', 'O', 'G', 'O', null, 'N'],
  ['', null, '', null, null, 'T'],
  ['L', 'E', 'T', 'R', 'A', 'E'],
  [null, null, '', null, null, ''],
]

// Números de pista colocados em algumas células, só para efeito visual.
const clueNumbers: Record<string, number> = {
  '0-0': 1,
  '0-5': 2,
  '2-0': 3,
  '4-0': 4,
}

/**
 * Mockup visual e estático de uma grelha de palavras cruzadas.
 * Serve apenas para ilustrar o produto CruzaMente — não é um jogo funcional.
 */
function CrosswordMockup({ className = '' }: CrosswordMockupProps) {
  return (
    <div
      role="img"
      aria-label="Ilustração de uma grelha de palavras cruzadas do CruzaMente"
      className={`inline-grid grid-cols-6 gap-1 rounded-2xl bg-navy-900 p-3 shadow-xl ${className}`}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const key = `${rowIndex}-${colIndex}`

          if (cell === null) {
            return (
              <div
                key={key}
                className="h-10 w-10 rounded-sm bg-navy-700"
                aria-hidden="true"
              />
            )
          }

          const clue = clueNumbers[key]
          return (
            <div
              key={key}
              aria-hidden="true"
              className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-white font-heading text-lg font-bold text-navy-900"
            >
              {clue && (
                <span className="absolute left-0.5 top-0 text-[9px] font-medium text-navy-400">
                  {clue}
                </span>
              )}
              {cell}
            </div>
          )
        }),
      )}
    </div>
  )
}

export default CrosswordMockup

import { Check, LogOut, Save } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CrosswordGrid from '../components/game/CrosswordGrid'
import Button from '../components/ui/Button'
import Logo from '../components/ui/Logo'
import Modal from '../components/ui/Modal'
import { demoPuzzle } from '../data/puzzle'
import type { Clue, Orientation } from '../data/puzzle'

const STORAGE_KEY = 'cruzamente:partida-demo'
const cellKey = (row: number, col: number) => `${row}-${col}`

// Lê um progresso guardado anteriormente (via localStorage).
function loadSaved(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

/**
 * Ecrã de jogo com a grelha interativa, pistas, salvar (via localStorage) e
 * sair com confirmação.
 */
function GamePlay() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const theme = searchParams.get('tema') ?? 'livre'
  const level = searchParams.get('nivel') ?? 'facil'

  const puzzle = demoPuzzle
  const [entries, setEntries] = useState<Record<string, string>>(loadSaved)
  const [active, setActive] = useState({ row: 0, col: 0 })
  const [orientation, setOrientation] = useState<Orientation>('across')
  const [exitOpen, setExitOpen] = useState(false)
  const [savedNote, setSavedNote] = useState(false)

  const acrossClues = useMemo(
    () => puzzle.clues.filter((c) => c.orientation === 'across'),
    [puzzle],
  )
  const downClues = useMemo(
    () => puzzle.clues.filter((c) => c.orientation === 'down'),
    [puzzle],
  )

  // Progresso: quantas células preenchíveis já têm letra.
  const filled = puzzle.cells.filter((c) => entries[cellKey(c.row, c.col)]).length
  const total = puzzle.cells.length

  const handleChange = (row: number, col: number, value: string) => {
    setEntries((prev) => {
      const next = { ...prev }
      if (value) next[cellKey(row, col)] = value
      else delete next[cellKey(row, col)]
      return next
    })
    setSavedNote(false)
  }

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
      setSavedNote(true)
    } catch {
      // Ambiente sem localStorage: ignora silenciosamente.
    }
  }

  const handleExitWithSave = () => {
    handleSave()
    navigate('/jogar')
  }

  const selectClue = (clue: Clue) => {
    setOrientation(clue.orientation)
    setActive({ row: clue.startRow, col: clue.startCol })
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy-50 font-sans text-navy-900">
      {/* Barra superior do jogo. */}
      <header className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <Logo size={34} showWordmark={false} />
            <div>
              <h1 className="font-heading text-lg font-bold text-navy-900">
                CruzaMente
              </h1>
              <p className="text-xs capitalize text-navy-500">
                Tema: {theme} · Nível: {level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-navy-500 sm:inline">
              {filled}/{total} células
            </span>
            <Button variant="secondary" onClick={handleSave}>
              <Save size={18} aria-hidden="true" />
              Salvar
            </Button>
            <Button
              variant="ghost"
              onClick={() => setExitOpen(true)}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={18} aria-hidden="true" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-6 py-10 lg:grid-cols-[auto_1fr]">
        {/* Grelha. */}
        <section aria-label="Grelha" className="flex flex-col items-center gap-4">
          <CrosswordGrid
            puzzle={puzzle}
            entries={entries}
            active={active}
            orientation={orientation}
            onChange={handleChange}
            onActiveChange={(row, col) => setActive({ row, col })}
            onToggleOrientation={() =>
              setOrientation((o) => (o === 'across' ? 'down' : 'across'))
            }
          />
          <p className="max-w-sm text-center text-xs leading-relaxed text-navy-500">
            Usa as setas para navegar, Espaço para alternar entre horizontal e
            vertical, e Backspace para apagar.
          </p>
          {savedNote && (
            <p
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-700"
              role="status"
            >
              <Check size={16} aria-hidden="true" />
              Progresso guardado.
            </p>
          )}
        </section>

        {/* Pistas. */}
        <section aria-label="Pistas" className="flex flex-col gap-8">
          <ClueList
            title="Horizontais"
            clues={acrossClues}
            active={active}
            orientation={orientation}
            onSelect={selectClue}
          />
          <ClueList
            title="Verticais"
            clues={downClues}
            active={active}
            orientation={orientation}
            onSelect={selectClue}
          />
        </section>
      </main>

      {/* Modal de confirmação de saída. */}
      <Modal
        open={exitOpen}
        onClose={() => setExitOpen(false)}
        title="Sair da partida?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setExitOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/jogar')}
              className="text-red-600 hover:border-red-300 hover:text-red-700"
            >
              Sair sem guardar
            </Button>
            <Button onClick={handleExitWithSave}>
              <Save size={18} aria-hidden="true" />
              Sair e guardar
            </Button>
          </>
        }
      >
        Tens progresso nesta partida. Queres guardar antes de sair? Se saíres sem
        guardar, as letras introduzidas desde o último guardar serão perdidas.
      </Modal>
    </div>
  )
}

interface ClueListProps {
  title: string
  clues: Clue[]
  active: { row: number; col: number }
  orientation: Orientation
  onSelect: (clue: Clue) => void
}

// Lista de pistas de uma orientação; destaca a pista correspondente à célula ativa.
function ClueList({ title, clues, active, orientation, onSelect }: ClueListProps) {
  return (
    <div>
      <h2 className="font-heading text-lg font-bold text-navy-900">{title}</h2>
      <ul className="mt-3 flex flex-col gap-1">
        {clues.map((clue) => {
          const isActive =
            orientation === clue.orientation &&
            active.row === clue.startRow &&
            active.col === clue.startCol
          return (
            <li key={`${clue.orientation}-${clue.number}`}>
              <button
                type="button"
                onClick={() => onSelect(clue)}
                className={
                  'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ' +
                  (isActive
                    ? 'bg-brand-50 text-navy-900'
                    : 'text-navy-700 hover:bg-navy-100')
                }
              >
                <span className="font-semibold text-brand-700">{clue.number}.</span>{' '}
                {clue.text}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GamePlay

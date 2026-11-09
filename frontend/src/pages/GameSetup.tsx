import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Logo from '../components/ui/Logo'
import TextField from '../components/ui/TextField'
import { difficulties, formats, themes } from '../data/themes'

/**
 * Ecrã de configuração da partida: escolha de tema (predefinido ou livre),
 * formato da grelha e nível de dificuldade. As escolhas são passadas ao ecrã
 * de jogo por query params.
 */
function GameSetup() {
  const navigate = useNavigate()
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [customTheme, setCustomTheme] = useState('')
  const [format, setFormat] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<string | null>(null)
  const [error, setError] = useState<string>()

  const handleBack = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    navigate('/jogar')
  }

  // Selecionar um tema predefinido limpa o tema livre, e vice-versa.
  const pickTheme = (id: string) => {
    setSelectedTheme(id)
    setCustomTheme('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const theme = customTheme.trim() || selectedTheme
    if (!theme) {
      setError('Escolhe um tema ou indica um tema livre.')
      return
    }
    if (!format) {
      setError('Escolhe um formato para a grelha.')
      return
    }
    if (!difficulty) {
      setError('Escolhe um nível de dificuldade.')
      return
    }
    setError(undefined)
    const params = new URLSearchParams({
      tema: theme,
      formato: format,
      nivel: difficulty,
    })
    navigate(`/jogar/partida?${params.toString()}`)
  }

  const themeChosen = Boolean(customTheme.trim() || selectedTheme)

  return (
    <div className="min-h-screen bg-navy-50 font-sans text-navy-900">
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>

      <header className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/jogar" onClick={handleBack} aria-label="Voltar ao início do jogo">
            <Logo size={36} />
          </Link>
          <Button as="a" href="/jogar" variant="ghost" onClick={handleBack}>
            <ArrowLeft size={18} aria-hidden="true" />
            Voltar
          </Button>
        </div>
      </header>

      <main id="conteudo" className="mx-auto w-full max-w-5xl px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-navy-900">
          Configurar a partida
        </h1>
        <p className="mt-2 text-navy-600">
          Escolhe um tema, o formato da grelha e um nível de dificuldade.
        </p>

        <form className="mt-10 flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
          {/* Tema */}
          <fieldset>
            <legend className="font-heading text-xl font-semibold text-navy-900">
              Tema
            </legend>
            <p className="mt-1 text-sm text-navy-600">
              Seleciona um dos temas ou escreve o teu próprio.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {themes.map((theme) => {
                const Icon = theme.icon
                const active = selectedTheme === theme.id
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => pickTheme(theme.id)}
                    aria-pressed={active}
                    className={
                      'flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ' +
                      (active
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-navy-200 bg-white hover:border-brand-400')
                    }
                  >
                    <span
                      className={
                        'inline-flex h-11 w-11 items-center justify-center rounded-xl ' +
                        (active ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600')
                      }
                    >
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className="flex items-center gap-2 font-heading text-base font-semibold text-navy-900">
                      {theme.label}
                      {active && <Check size={16} className="text-brand-600" aria-hidden="true" />}
                    </span>
                    <span className="text-sm leading-relaxed text-navy-600">
                      {theme.description}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 max-w-md">
              <TextField
                label="Tema livre"
                type="text"
                name="customTheme"
                placeholder="Ex.: cinema, ciência, história..."
                hint="Ao escrever aqui, o tema livre tem prioridade sobre a seleção acima."
                value={customTheme}
                onChange={(e) => {
                  setCustomTheme(e.target.value)
                  if (e.target.value.trim()) setSelectedTheme(null)
                }}
              />
            </div>
          </fieldset>

          {/* Formato */}
          <fieldset>
            <legend className="font-heading text-xl font-semibold text-navy-900">
              Formato
            </legend>
            <p className="mt-1 text-sm text-navy-600">
              Escolhe o tamanho da grelha.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {formats.map((item) => {
                const active = format === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormat(item.id)}
                    aria-pressed={active}
                    className={
                      'flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ' +
                      (active
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-navy-200 bg-white hover:border-brand-400')
                    }
                  >
                    <span className="flex items-center gap-2 font-heading text-base font-semibold text-navy-900">
                      {item.label}
                      {active && <Check size={16} className="text-brand-600" aria-hidden="true" />}
                    </span>
                    <span className="text-sm leading-relaxed text-navy-600">
                      {item.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Dificuldade */}
          <fieldset>
            <legend className="font-heading text-xl font-semibold text-navy-900">
              Nível de dificuldade
            </legend>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {difficulties.map((level) => {
                const active = difficulty === level.id
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setDifficulty(level.id)}
                    aria-pressed={active}
                    className={
                      'flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ' +
                      (active
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-navy-200 bg-white hover:border-brand-400')
                    }
                  >
                    <span className="flex items-center gap-2 font-heading text-base font-semibold text-navy-900">
                      {level.label}
                      {active && <Check size={16} className="text-brand-600" aria-hidden="true" />}
                    </span>
                    <span className="text-sm leading-relaxed text-navy-600">
                      {level.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {error && (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <Button
              type="submit"
              size="lg"
              disabled={!themeChosen || !format || !difficulty}
            >
              Começar a jogar
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default GameSetup

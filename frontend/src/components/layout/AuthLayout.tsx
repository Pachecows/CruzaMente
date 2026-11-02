import type { ReactNode } from 'react'
import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../ui/Logo'

interface AuthLayoutProps {
  /** Título principal do ecrã (ex.: "Entrar"). */
  title: string
  /** Subtítulo/descrição curta abaixo do título. */
  subtitle: string
  /** Conteúdo do cartão (normalmente um formulário). */
  children: ReactNode
  /** Rodapé do cartão (ligações para outros ecrãs de autenticação). */
  footer?: ReactNode
}

/**
 * Moldura comum às páginas de autenticação (login, registo, recuperação).
 * Centra um cartão sobre fundo navy, mantendo a identidade visual da MenteLab.
 */
function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  const navigate = useNavigate()

  const handleHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return
    }
    event.preventDefault()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy-900 font-sans text-navy-900">
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Link to="/" onClick={handleHome} aria-label="Voltar ao site da MenteLab">
              <Logo size={44} variant="light" />
            </Link>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="font-heading text-2xl font-bold text-navy-900">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">{subtitle}</p>

            <div className="mt-6">{children}</div>
          </div>

          {footer && (
            <div className="mt-6 text-center text-sm text-navy-300">{footer}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

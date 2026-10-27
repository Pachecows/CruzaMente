import { CheckCircle2, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Button from '../components/ui/Button'
import TextField from '../components/ui/TextField'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Ecrã de recuperação de password.
 * Mostra uma confirmação após submissão válida.
 */
function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!emailPattern.test(email)) {
      setError('Introduz um email válido.')
      return
    }
    setError(undefined)
    setSubmitted(true)
  }

  return (
    <AuthLayout
      title="Recuperar password"
      subtitle="Indica o teu email e enviaremos instruções para repor a password."
      footer={
        <p>
          <Link to="/login" className="font-semibold text-white hover:text-brand-200">
            Voltar ao início de sessão
          </Link>
        </p>
      }
    >
      {submitted ? (
        <div
          className="flex flex-col items-center gap-3 rounded-lg bg-accent-50 p-5 text-center"
          role="status"
        >
          <CheckCircle2 size={36} className="text-accent-600" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-navy-700">
            Se existir uma conta associada a <strong>{email}</strong>, foram
            enviadas instruções de recuperação.
          </p>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="tu@exemplo.pt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
          />
          <Button type="submit" size="lg" className="mt-2 w-full">
            <Send size={18} aria-hidden="true" />
            Enviar instruções
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}

export default ForgotPassword

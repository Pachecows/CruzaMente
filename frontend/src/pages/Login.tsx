import { LogIn } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Button from '../components/ui/Button'
import TextField from '../components/ui/TextField'

interface Errors {
  email?: string
  password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Ecrã de início de sessão.
 * Em caso de submissão válida, segue para o início do jogo.
 */
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next: Errors = {}
    if (!emailPattern.test(email)) next.email = 'Introduz um email válido.'
    if (password.length < 6) next.password = 'A password deve ter pelo menos 6 caracteres.'
    setErrors(next)

    if (Object.keys(next).length === 0) {
      navigate('/jogar')
    }
  }

  return (
    <AuthLayout
      title="Entrar"
      subtitle="Inicia sessão para aceder ao CruzaMente."
      footer={
        <>
          <p>
            Ainda não tens conta?{' '}
            <Link to="/registo" className="font-semibold text-white hover:text-brand-200">
              Criar conta
            </Link>
          </p>
          <p className="mt-2">
            <Link
              to="/recuperar-password"
              className="text-navy-300 hover:text-white"
            >
              Esqueceste-te da password?
            </Link>
          </p>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="tu@exemplo.pt"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        <Button type="submit" size="lg" className="mt-2 w-full">
          <LogIn size={18} aria-hidden="true" />
          Entrar
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Login

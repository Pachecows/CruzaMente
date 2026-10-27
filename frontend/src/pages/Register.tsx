import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Button from '../components/ui/Button'
import TextField from '../components/ui/TextField'

interface Errors {
  name?: string
  email?: string
  password?: string
  confirm?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Ecrã de criação de conta.
 */
function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Introduz o teu nome.'
    if (!emailPattern.test(email)) next.email = 'Introduz um email válido.'
    if (password.length < 6) next.password = 'A password deve ter pelo menos 6 caracteres.'
    if (confirm !== password) next.confirm = 'As passwords não coincidem.'
    setErrors(next)

    if (Object.keys(next).length === 0) {
      navigate('/login')
    }
  }

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Regista-te para começares a jogar CruzaMente."
      footer={
        <p>
          Já tens conta?{' '}
          <Link to="/login" className="font-semibold text-white hover:text-brand-200">
            Entrar
          </Link>
        </p>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Nome"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="O teu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />
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
          autoComplete="new-password"
          placeholder="••••••••"
          hint="Mínimo de 6 caracteres."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        <TextField
          label="Confirmar password"
          type="password"
          name="confirm"
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
          required
        />
        <Button type="submit" size="lg" className="mt-2 w-full">
          <UserPlus size={18} aria-hidden="true" />
          Criar conta
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Register

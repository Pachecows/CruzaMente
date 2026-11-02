import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Rótulo visível do campo. */
  label: string
  /** Mensagem de erro de validação, se existir. */
  error?: string
  /** Texto de ajuda opcional, apresentado abaixo do campo. */
  hint?: string
}

/**
 * Campo de formulário acessível, com rótulo associado, texto de ajuda e
 * mensagem de erro ligada por aria-describedby.
 */
function TextField({ label, error, hint, className = '', ...rest }: TextFieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-navy-800">
        {label}
      </label>
      <input
        id={id}
        className={
          'rounded-lg border bg-white px-3.5 py-2.5 font-sans text-sm text-navy-900 ' +
          'placeholder:text-navy-400 transition-colors focus-visible:outline-none ' +
          'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ' +
          'focus-visible:ring-offset-white ' +
          (error ? 'border-red-400' : 'border-navy-200 hover:border-navy-300') +
          (className ? ` ${className}` : '')
        }
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="font-sans text-xs text-navy-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="font-sans text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default TextField

import type { ReactNode } from 'react'
import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  /** Controla a visibilidade do modal. */
  open: boolean
  /** Chamado quando o utilizador pede para fechar (Escape, overlay, botão X). */
  onClose: () => void
  /** Título do diálogo. */
  title: string
  /** Conteúdo do corpo do diálogo. */
  children: ReactNode
  /** Ações apresentadas no rodapé (botões). */
  footer?: ReactNode
}

/**
 * Diálogo modal acessível: fecha com Escape ou clique no overlay, move o foco
 * para dentro ao abrir e tem role/aria apropriados.
 */
function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    // Move o foco para o diálogo ao abrir.
    dialogRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 px-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl focus-visible:outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-heading text-lg font-bold text-navy-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-md p-1 text-navy-500 transition-colors hover:bg-navy-100 hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 text-sm leading-relaxed text-navy-600">{children}</div>

        {footer && <div className="mt-6 flex flex-wrap justify-end gap-3">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal

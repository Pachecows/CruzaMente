export interface NavItem {
  /** Identificador da secção, correspondente ao id do elemento. */
  id: string
  /** Texto apresentado no menu. */
  label: string
}

/**
 * Itens de navegação do cabeçalho, pela ordem em que surgem na página.
 * O id deve coincidir com o id da respetiva <section>.
 */
export const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'cruzamente', label: 'CruzaMente' },
  { id: 'contacto', label: 'Contacto' },
]

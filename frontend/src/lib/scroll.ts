/**
 * Faz scroll suave até à secção com o id indicado.
 * Funciona tanto com scroll na janela como dentro de um contentor de snap,
 * porque usa a posição relativa do elemento.
 */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // Move o foco para a secção, mantendo a navegação por teclado coerente.
  target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

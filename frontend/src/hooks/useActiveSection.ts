import { useEffect, useState } from 'react'

/**
 * Observa as secções indicadas e devolve o id daquela que está atualmente
 * mais visível no ecrã. Usado para destacar o item ativo na navegação.
 *
 * @param sectionIds Lista de ids de secções a observar.
 * @param rootSelector Seletor do contentor de scroll (predefinição: a janela).
 */
export function useActiveSection(
  sectionIds: string[],
  rootSelector?: string,
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const root = rootSelector
      ? document.querySelector<HTMLElement>(rootSelector)
      : null

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Escolhe a secção com maior proporção visível entre as que cruzam.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root,
        // Considera uma secção ativa quando ocupa boa parte do centro do ecrã.
        threshold: [0.25, 0.5, 0.75],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, rootSelector])

  return activeId
}

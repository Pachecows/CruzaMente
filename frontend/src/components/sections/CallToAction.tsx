import { ArrowRight, Mail, MapPin } from 'lucide-react'
import type { MouseEvent } from 'react'
import Button from '../ui/Button'
import Section from '../ui/Section'
import { scrollToSection } from '../../lib/scroll'

/**
 * Secção final de chamada à ação, com um convite coerente com o estado atual
 * do projeto e informação de contacto de demonstração.
 */
function CallToAction() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <Section id="contacto" ariaLabel="Contacto" className="bg-navy-50">
      <div className="overflow-hidden rounded-3xl bg-brand-600 px-8 py-14 text-center shadow-lg sm:px-14">
        <h2 className="font-heading text-4xl font-bold text-white">
          Pronto para desafiar a tua mente?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-lg leading-relaxed text-brand-50">
          Explora o conceito do CruzaMente, conhece os nossos serviços ou fala
          connosco. Teremos todo o gosto em partilhar o que estamos a construir.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            as="a"
            href="#cruzamente"
            variant="secondary"
            size="lg"
            onClick={(e) => handleClick(e, 'cruzamente')}
          >
            Explorar o CruzaMente
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <Button
            as="a"
            href="mailto:ola@mentelab.example"
            size="lg"
            className="bg-navy-900 text-white hover:bg-navy-800"
          >
            <Mail size={18} aria-hidden="true" />
            Enviar mensagem
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-sans text-sm text-brand-50">
          <span className="inline-flex items-center gap-2">
            <Mail size={16} aria-hidden="true" />
            ola@mentelab.example
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} aria-hidden="true" />
            Lisboa, Portugal
          </span>
        </div>
        <p className="mt-6 font-sans text-xs text-brand-100">
          Contactos fictícios, apresentados apenas para fins de demonstração.
        </p>
      </div>
    </Section>
  )
}

export default CallToAction

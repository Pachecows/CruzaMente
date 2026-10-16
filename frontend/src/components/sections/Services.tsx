import Section from '../ui/Section'
import ServiceCard from '../ui/ServiceCard'
import { services } from '../../data/services'

/**
 * Secção que apresenta a oferta de serviços da MenteLab em cartões.
 */
function Services() {
  return (
    <Section id="servicos" ariaLabel="Serviços" className="bg-navy-50">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-sans text-sm font-semibold uppercase tracking-wide text-brand-600">
          O que fazemos
        </span>
        <h2 className="mt-3 font-heading text-4xl font-bold text-navy-900">
          Serviços pensados para a mente
        </h2>
        <p className="mt-4 font-sans text-lg leading-relaxed text-navy-600">
          Combinamos jogos, tecnologia e design para criar experiências que
          estimulam o raciocínio e tornam a aprendizagem mais divertida.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.id}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Services

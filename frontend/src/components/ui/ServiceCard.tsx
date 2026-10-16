import type { Service } from '../../data/services'

interface ServiceCardProps {
  service: Service
}

/**
 * Cartão reutilizável para apresentar um serviço, com ícone, título e descrição.
 */
function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <article className="group h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={24} aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-heading text-lg font-semibold text-navy-900">
        {service.title}
      </h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-navy-600">
        {service.description}
      </p>
    </article>
  )
}

export default ServiceCard

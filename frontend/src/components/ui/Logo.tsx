interface LogoProps {
  /** Altura do logótipo em pixels. A largura ajusta-se proporcionalmente. */
  size?: number
  /** Mostrar o nome da empresa ao lado do símbolo. */
  showWordmark?: boolean
  /** Variante de cor: 'dark' para fundos claros, 'light' para fundos escuros. */
  variant?: 'dark' | 'light'
  className?: string
}

/**
 * Logótipo da MenteLab, recriado em SVG.
 * Combina uma grelha de palavras cruzadas (referência ao CruzaMente) com um
 * lápis, acompanhado do nome da empresa.
 */
function Logo({
  size = 40,
  showWordmark = true,
  variant = 'dark',
  className = '',
}: LogoProps) {
  const wordColor = variant === 'light' ? '#ffffff' : '#1e2a4a'
  const brandColor = '#2563eb'

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      role="img"
      aria-label="MenteLab — Tecnologia que estimula a mente"
    >
      {/* Símbolo: grelha de palavras cruzadas com um lápis. */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="4" y="4" width="34" height="34" rx="7" fill={brandColor} />
        {/* Células da grelha. */}
        <rect x="9" y="9" width="7" height="7" rx="1.5" fill="#ffffff" />
        <rect x="18" y="9" width="7" height="7" rx="1.5" fill="#1e2a4a" />
        <rect x="27" y="9" width="7" height="7" rx="1.5" fill="#ffffff" />
        <rect x="9" y="18" width="7" height="7" rx="1.5" fill="#1e2a4a" />
        <rect x="18" y="18" width="7" height="7" rx="1.5" fill="#ffffff" />
        <rect x="27" y="18" width="7" height="7" rx="1.5" fill="#1e2a4a" />
        <rect x="9" y="27" width="7" height="7" rx="1.5" fill="#ffffff" />
        <rect x="18" y="27" width="7" height="7" rx="1.5" fill="#1e2a4a" />
        <rect x="27" y="27" width="7" height="7" rx="1.5" fill="#ffffff" />
        {/* Lápis em diagonal sobre a grelha. */}
        <g transform="rotate(45 34 34)">
          <rect x="31.5" y="24" width="5" height="18" rx="1" fill="#f5b301" />
          <path d="M31.5 42 L34 46 L36.5 42 Z" fill="#1e2a4a" />
          <rect x="31.5" y="24" width="5" height="3.5" rx="1" fill="#e5484d" />
        </g>
      </svg>

      {showWordmark && (
        <span className="font-heading text-xl font-extrabold leading-none">
          <span style={{ color: wordColor }}>Mente</span>
          <span style={{ color: brandColor }}>Lab</span>
        </span>
      )}
    </span>
  )
}

export default Logo

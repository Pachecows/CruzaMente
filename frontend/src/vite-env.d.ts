/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base da API do backend (fase futura). */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

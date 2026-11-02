/**
 * Camada de acesso à API — preparação para a futura integração com o backend.
 *
 * IMPORTANTE: este ficheiro NÃO é usado pelo website institucional nesta fase.
 * Serve apenas para deixar a arquitetura preparada para o backend FastAPI,
 * sem criar quaisquer ligações artificiais. A implementação real (jogos,
 * autenticação, progresso, IA) pertence a fases posteriores do projeto.
 *
 * A comunicação futura será feita via API REST, sobre HTTP, com dados em JSON.
 */

/** URL base da API, configurável por variável de ambiente do Vite. */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

// --- Tipos de exemplo (planeamento, podem evoluir) -------------------------

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface GameSummary {
  id: string
  title: string
  theme: string
  difficulty: 'facil' | 'medio' | 'dificil'
}

export interface Game extends GameSummary {
  grid: Array<Array<string | null>>
  clues: Record<string, string>
}

export interface ProgressUpdate {
  gameId: string
  filledCells: Record<string, string>
  completed: boolean
}

// --- Endpoints planeados (assinaturas, ainda não implementadas) ------------
//
// Estes são exemplos de planeamento e não devem ser invocados nesta fase.
//
//   POST   /api/login                 -> autenticação
//   POST   /api/games                 -> criação de um jogo
//   GET    /api/games                 -> consulta dos jogos
//   GET    /api/games/{id}            -> obtenção de um jogo específico
//   PUT    /api/games/{id}/progress   -> atualização do progresso
//
// Exemplo de assinatura a implementar no futuro:
//
//   export async function login(payload: LoginRequest): Promise<LoginResponse> {
//     const response = await fetch(`${API_BASE_URL}/api/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     })
//     if (!response.ok) throw new Error('Falha na autenticação')
//     return response.json() as Promise<LoginResponse>
//   }

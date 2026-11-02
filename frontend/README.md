# Frontend — Website Institucional MenteLab

Website institucional da **MenteLab** (empresa fictícia, projeto académico),
"Tecnologia que estimula a mente". Apresenta a marca, os serviços e o futuro
jogo de palavras cruzadas **CruzaMente**.

Esta é a primeira fase do projeto: um **site estático** (apenas frontend), com
uma arquitetura organizada e preparada para integrar, no futuro, um backend em
FastAPI. Não inclui jogo funcional, autenticação, base de dados nem API ativa.

## Tecnologias

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build e dev server)
- [Tailwind CSS v3](https://v3.tailwindcss.com/) (estilização)
- [lucide-react](https://lucide.dev/) (ícones)

## Pré-requisitos

Basta instalar **uma coisa** na máquina: o **Node.js** (versão 18 ou superior;
este projeto foi desenvolvido com a versão 22). Descarregar a versão LTS em
[nodejs.org](https://nodejs.org).

O `npm` (gestor de pacotes) vem **incluído** com o Node — não é preciso
instalá-lo à parte. Confirmar que ficou tudo instalado:

```bash
node -v    # ex.: v22.x
npm -v     # ex.: 10.x
```

O **Vite**, o **React**, o **Tailwind** e as restantes bibliotecas **não** se
instalam à mão: são dependências do projeto (declaradas no `package.json`) e são
descarregadas automaticamente pelo comando `npm install`.

> Nota: a pasta `node_modules` não é versionada no Git. Por isso, ao obter o
> projeto pela primeira vez, é obrigatório correr `npm install` para a
> reconstruir a partir do `package.json`.

## Como arrancar

Correr a partir da pasta `frontend/`:

```bash
cd frontend
npm install      # instalar as dependências (1.ª vez, ou quando mudam)
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # build de produção (compila TS e gera /dist)
npm run preview  # pré-visualizar o build de produção
npm run lint     # análise estática (oxlint)
```

## Estrutura

```
frontend/
├── public/                 # ficheiros estáticos servidos tal como estão (favicon)
├── src/
│   ├── assets/             # recursos estáticos importados pelo código
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── sections/       # Hero, Services, About, ProductShowcase, CallToAction
│   │   └── ui/             # Logo, Button, Section, ServiceCard, CrosswordMockup
│   ├── data/               # conteúdo tipado (navegação, serviços)
│   ├── hooks/              # useActiveSection (deteção da secção ativa)
│   ├── lib/                # scroll (helpers), api (preparação futura, inativa)
│   ├── pages/              # Home (página única)
│   ├── styles/             # index.css (Tailwind + estilos globais)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Navegação

A página é única (one-page) com **scroll-snap vertical obrigatório**: cada
secção encaixa no ecrã. O cabeçalho é fixo, faz scroll suave até às secções e
destaca a secção ativa.

Secções, por ordem: Início (Hero) → Serviços → Sobre → CruzaMente → Contacto
(chamada à ação) → Rodapé.

## Identidade visual

A paleta e a tipografia estão centralizadas em `tailwind.config.js`:

- **navy** — azul-marinho (confiança, texto, fundos escuros)
- **brand** — azul vivo (destaque, ações principais)
- **accent** — turquesa (pequenos detalhes)
- Tipografia: **Poppins** (títulos) e **Inter** (corpo)

Alterar as cores num único sítio (`tailwind.config.js`) propaga para todo o site.

## Integração futura com o backend

O ficheiro `src/lib/api.ts` contém a **estrutura e os tipos** para a futura
integração com o backend FastAPI (API REST, HTTP, JSON). **Não é usado** nesta
fase e não existe qualquer ligação real ao backend.

A URL base é configurável por variável de ambiente do Vite:

```bash
# frontend/.env (exemplo, para a fase futura)
VITE_API_BASE_URL=http://localhost:8000
```

Endpoints planeados (exemplos, ainda não implementados): `POST /api/login`,
`POST /api/games`, `GET /api/games`, `GET /api/games/{id}`,
`PUT /api/games/{id}/progress`.

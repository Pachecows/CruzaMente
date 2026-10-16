# CruzaMente / MenteLab

Projeto académico (1º ano de Engenharia Informática) de uma plataforma de jogos
de palavras cruzadas para estimulação mental, da empresa fictícia **MenteLab**
("Tecnologia que estimula a mente"). O produto é o jogo **CruzaMente**.

A solução segue uma arquitetura cliente-servidor, organizada neste repositório
como um monorepo com duas partes independentes:

```
cruzamente/
├── frontend/
└── backend/
```

## Pré-requisitos

- **Frontend:** apenas o **Node.js** 18+ (inclui o `npm`). Descarregar em
  [nodejs.org](https://nodejs.org) (ou se já tiverem no emulador). O Vite, o React e o Tailwind são
  dependências do projeto e instalam-se com `npm install` — não à mão.
- **Backend (fase futura):** 

## Começar (frontend)

```bash
# 1. obter o projeto
git clone <url-do-repositorio>
cd cruzamente/frontend

# 2. instalar as dependências (reconstrói node_modules a partir do package.json)
npm install

# 3. arrancar o servidor de desenvolvimento
npm run dev      # http://localhost:5173
```

> A pasta `node_modules` não vem no repositório (está no `.gitignore`), por isso
> o `npm install` é obrigatório da primeira vez que se obtém o projeto.

Consultar o README de cada pasta para detalhes de cada componente do projeto.

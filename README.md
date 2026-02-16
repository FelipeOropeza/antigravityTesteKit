# Nocturna - Projeto de Teste de IA & Agent Skills

Este repositório serve como uma **Prova de Conceito (PoC)** e um ambiente de teste para a **IA de Codificação Avançada Baseada em Agentes do ** e o **Framework de Habilidades de Agente**.

## 🧪 Objetivo do Projeto

O objetivo principal deste projeto é avaliar as capacidades do assistente de IA em:
1.  **Design Frontend**: Criação de uma landing page sofisticada com tema "Gastronomia Noturna" (React + Tailwind v4).
2.  **Implementação Full-Stack**: Migração de um protótipo estático para uma aplicação web dinâmica.
3.  **Integração de Habilidades de Agente**: Teste das personas `frontend-specialist`, `backend-specialist` e `project-planner`.
4.  **Lógica Complexa**: Implementação de um sistema de reservas com Painel Administrativo, rotas protegidas e banco de dados SQLite.

## 🛠️ Stack Tecnológica

*   **Frontend**: React, Vite, Tailwind CSS v4, Framer Motion
*   **Backend**: Node.js, Express
*   **Banco de Dados**: SQLite com Prisma ORM (v5)
*   **Ícones**: Lucide React

## 🚀 Como Executar

Este projeto utiliza `concurrently` para rodar o cliente e o servidor simultaneamente:

```bash
# Instalar dependências (na raiz e na pasta server se necessário)
npm install
cd server && npm install && cd ..

# Iniciar Frontend (5173) e Backend (3000) juntos
npm run start-all
```

## 📂 Funcionalidades Implementadas pela IA

*   [x] **Design System**: Tema personalizado "Nocturna" com paleta Dourada/Escura.
*   [x] **Animações**: Revelações ao rolar a página (scroll) e efeitos parallax.
*   [x] **Sistema de Reservas**: Formulário de agendamento funcional conectado ao backend.
*   [x] **Painel Administrativo**: Dashboard seguro (`/admin` - senha: `admin123`) para gerenciar itens do menu e reservas.
*   [x] **Menu Dinâmico**: Conteúdo buscado diretamente do banco de dados SQLite.

---
*Gerado por Antigravity (IA Agentic) durante uma sessão de live coding.*

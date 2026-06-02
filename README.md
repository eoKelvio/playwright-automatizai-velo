# Velô Sprint — Playwright Automation

Repositório de automação de testes E2E para a aplicação **Velô Sprint**, um configurador de veículo elétrico desenvolvido com React + Supabase.

## Estrutura

```
/
├── app/        # Aplicação React/Vite (alvo dos testes)
└── e2e/        # Suite de testes Playwright
```

## A aplicação

**Velô Sprint** é uma SPA que permite:
- Configurar cor, rodas e opcionais do veículo
- Calcular o preço em tempo real
- Realizar pedidos com análise de crédito via Serasa
- Consultar o status de pedidos

**Stack:** React 18 · TypeScript · Vite · Tailwind · Supabase

## Os testes

89 testes E2E organizados em módulos que seguem a jornada do usuário:

| Módulo | Testes | O que cobre |
|--------|--------|-------------|
| `landing-page` | 18 | Header, CTAs, FAQ, footer, mobile navigation |
| `configure-page` | 12 | Seleção de cor, rodas, opcionais e preços |
| `order-page` | 26 | Formulário, validações, pagamento, análise de crédito |
| `success-page` | 9 | Status do pedido, dados do cliente, navegação |
| `order-lookup` | 11 | Busca de pedidos, resultados, casos de erro |
| `terms-page` | 2 | Navegação e conteúdo |
| `privacy-page` | 2 | Navegação e conteúdo |
| `not-found` | 2 | Página 404 |
| `e2e-flows` | 7 | Fluxos completos de compra ponta a ponta |

## Rodando localmente

### Pré-requisitos

- Node.js >= 22
- App rodando em `http://localhost:5173`

### App

```bash
cd app
npm install
npm run dev
```

### Testes

```bash
cd e2e
npm install
npm run install:browsers
npm test
```

## CI

Os testes rodam automaticamente via GitHub Actions em todo push e PR no `main`. O relatório HTML fica disponível como artifact por 30 dias.

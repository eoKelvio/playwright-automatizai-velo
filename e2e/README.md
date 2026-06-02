# E2E Tests — Velô Sprint

Testes automatizados da aplicação Velô Sprint, escritos em Playwright.

## Setup

```bash
npm install
npm run install:browsers
```

Crie um arquivo `.env` na raiz da pasta `e2e/` (veja `.env.example`):

```env
BASE_URL=http://localhost:5173
```

## Rodando os testes

```bash
# Todos os testes
npm test

# Browser visível
npm run test:headed

# Modo debug (passo a passo)
npm run test:debug

# Interface interativa
npm run test:ui

# Módulo específico
npm run test:module MODULE=landing-page

# Suite específica dentro de um módulo
npm run test:suite MODULE=landing-page SUITE=landing-page

# Testes por tag
npm run test:critical
npm run test:regression
```

## Relatório

```bash
npm run report
```

## Estrutura

```
e2e/
├── actions/
│   ├── interface/          # Ações de UI (recebem page)
│   │   ├── auth/
│   │   ├── configurator/
│   │   ├── landing/
│   │   ├── lookup/
│   │   ├── order/
│   │   ├── setup/          # navigation, common
│   │   └── success/
│   └── api/                # Ações de API (recebem request)
├── fixtures/
│   ├── actions.js          # Fixture estendido com { actions }
│   └── data.js             # Variáveis de ambiente
├── helpers/
│   ├── urlsMapping.js      # Todas as rotas centralizadas
│   └── locatorsMapping.js  # Factory de locators por domínio
├── modules/                # Specs organizados por módulo/suite
│   ├── landing-page/
│   │   ├── landing-page/
│   │   ├── mobile-navigation/
│   │   └── navigation-links/
│   ├── configure-page/
│   ├── order-page/
│   ├── success-page/
│   ├── order-lookup/
│   ├── terms-page/
│   ├── privacy-page/
│   ├── not-found/
│   └── e2e-flows/
└── shared/                 # Utilitários genéricos
```

## Escrevendo testes

Sempre importe `test` e `expect` de `@/fixtures/actions.js`. Nunca de `@playwright/test` diretamente.

```javascript
import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Nome da Suite', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToHome()
  })

  test('Should be able to...', async ({ page, actions }) => {
    await test.step('Descrição da ação', async () => {
      await actions.interface.landing.clickConfigureAgora()
    })

    await test.step('Descrição da validação', async () => {
      const expectedUrl = urlsMapping.configure
      await expect(page).toHaveURL(expectedUrl)
    })
  })
})
```

## Convenções

- **Ações** (clicks, fills, navegação) → dentro de `actions/interface/`
- **Validações** → no spec, dentro de `test.step`, com `const` nomeada para locator e valor esperado
- **Mocks de API** → via `page.route()`, encapsulados como métodos nas actions
- **Locators** → `locatorsMapping(page)` nas actions; `page.getByTestId()` direto nos specs
- **URLs** → sempre via `urlsMapping`, nunca hardcoded

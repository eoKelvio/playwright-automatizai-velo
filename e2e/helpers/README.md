# Helpers Module

Este módulo contém utilitários e mapeamentos centralizados para melhorar a
manutenibilidade e organização dos testes.

## Arquivos

### urlsMapping.js

Centraliza todas as URLs e rotas da aplicação.

**Uso:**

```javascript
import urlsMapping, { buildUrl, getUrl } from '@/helpers/urlsMapping'

// Uso direto
await page.goto(urlsMapping.auth.login)

// Com construtor de URL
await page.goto(buildUrl('/custom-path'))

// Com função de URL dinâmica
await page.goto(urlsMapping.forms.edit('123')) // '/cadastros/123/editar'

// Com getter por string
const loginUrl = getUrl('auth.login') // '/auth/login'
```

**Benefícios:**

- ✅ Única fonte de verdade para URLs
- ✅ Fácil manutenção quando rotas mudam
- ✅ Melhor organização e descoberta
- ✅ Suporte a URLs dinâmicas

### locatorsMapping.js

Centraliza seletores e estratégias de localização de elementos.

**Uso:**

```javascript
import locatorsMapping, {
  getLocator,
  locatorBuilder
} from '@/helpers/locatorsMapping'

// Uso direto
const submitButton = page.locator(locatorsMapping.common.button.submit)

// Com getter por string
const selector = getLocator('forms.input.inner')

// Com locators dinâmicos
const tableCell = getLocator('tables.cellByColumn', 3)

// Com locator builder
const fieldLocator = locatorBuilder.formFieldByLabel('Nome')
const buttonLocator = locatorBuilder.buttonByText('Salvar')
```

**Benefícios:**

- ✅ Estratégias consistentes de localização
- ✅ Fácil atualização quando UI muda
- ✅ Melhor manutenibilidade
- ✅ Builders reutilizáveis para locators complexos

## Integração com Actions

Os helpers foram projetados para trabalhar em conjunto com as actions:

```javascript
import { test } from '@playwright/test'
import urlsMapping from '@/helpers/urlsMapping'
import locatorsMapping from '@/helpers/locatorsMapping'

test('example with helpers', async ({ page, actions }) => {
  // Navigate using urlsMapping
  await page.goto(urlsMapping.forms.create)

  // Use locators with forms actions
  const nameField = page.locator(locatorsMapping.forms.input.inner).first()

  await actions.interface.forms.fillFormFields(
    [{ key: 'name', locator: nameField }],
    { name: 'Test User' }
  )

  // Submit using mapped button
  await page.locator(locatorsMapping.common.button.save).click()
})
```

## Estrutura Recomendada

Ao adaptar para seu projeto:

### 1. URLs Mapping

```javascript
const urlsMapping = {
  base: 'https://your-app.com',

  // Organize por módulos/features
  feature1: {
    list: '/feature1/list',
    create: '/feature1/create',
    edit: id => `/feature1/${id}/edit`
  },

  feature2: {
    // ...
  }
}
```

### 2. Locators Mapping

```javascript
const locatorsMapping = {
  // Organize por tipo de componente
  common: {
    buttons: {
      /* ... */
    },
    inputs: {
      /* ... */
    }
  },

  // Ou por página/feature
  loginPage: {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: 'button[type="submit"]'
  }
}
```

## Boas Práticas

### ✅ DO

1. **Use nomes descritivos**

   ```javascript
   // Bom
   submitButton: 'button[type="submit"]'

   // Ruim
   btn1: '.btn-1'
   ```

2. **Agrupe relacionados**

   ```javascript
   auth: {
     login: '/login',
     logout: '/logout',
     register: '/register'
   }
   ```

3. **Use funções para URLs dinâmicas**

   ```javascript
   edit: id => `/items/${id}/edit`
   ```

4. **Prefira seletores semânticos**

   ```javascript
   // Bom
   submitButton: 'button[type="submit"]'

   // Evite
   submitButton: 'div > div > button:nth-child(3)'
   ```

### ❌ DON'T

1. **Não duplique informação**

   ```javascript
   // Ruim - duplicado em vários lugares
   test1: await page.goto('https://app.com/feature')
   test2: await page.goto('https://app.com/feature')

   // Bom - use urlsMapping
   test1: await page.goto(urlsMapping.feature.page)
   test2: await page.goto(urlsMapping.feature.page)
   ```

2. **Não use seletores frágeis**

   ```javascript
   // Frágil
   button: 'body > div:nth-child(2) > div > button'

   // Robusto
   button: '[data-testid="submit-button"]'
   ```

3. **Não misture concerns**

   ```javascript
   // Ruim - lógica no mapeamento
   const urlsMapping = {
     login: async () => {
       await page.goto('/login')
       await page.click('#submit')
     }
   }

   // Bom - apenas dados
   const urlsMapping = {
     login: '/login'
   }
   ```

## Exemplo Completo

```javascript
// test.spec.js
import { test, expect } from '@playwright/test'
import urlsMapping from '@/helpers/urlsMapping'
import locatorsMapping, { locatorBuilder } from '@/helpers/locatorsMapping'

test('Complete example using helpers', async ({ page, actions }) => {
  // 1. Navigate using URL mapping
  await page.goto(urlsMapping.auth.login)

  // 2. Fill form using locator mapping and actions
  const loginFields = [
    {
      key: 'email',
      locator: page.locator(locatorsMapping.common.input.email)
    },
    {
      key: 'password',
      locator: page.locator(locatorsMapping.common.input.password)
    }
  ]

  await actions.interface.forms.fillFormFields(loginFields, {
    email: 'user@test.com',
    password: 'password123'
  })

  // 3. Submit using button locator
  await page.locator(locatorsMapping.common.button.submit).click()

  // 4. Verify navigation to dashboard
  await expect(page).toHaveURL(urlsMapping.dashboard.home)

  // 5. Use locator builder for dynamic elements
  const nameField = locatorBuilder.formFieldByLabel('Nome')
  await page.locator(nameField).fill('New Name')
})
```

## Migração de Código Existente

Se você tem testes existentes sem helpers:

### Antes:

```javascript
test('old way', async ({ page }) => {
  await page.goto('https://app.com/feature/create')
  await page.locator('.el-input__inner').first().fill('value')
  await page.locator('button:has-text("Salvar")').click()
})
```

### Depois:

```javascript
test('new way with helpers', async ({ page, actions }) => {
  await page.goto(urlsMapping.feature.create)

  await actions.interface.forms.fillFormFields(
    [
      {
        key: 'field',
        locator: page.locator(locatorsMapping.forms.input.inner).first()
      }
    ],
    { field: 'value' }
  )

  await page.locator(locatorsMapping.common.button.save).click()
})
```

## Manutenção

Quando a aplicação muda:

1. **URL mudou?** → Atualize apenas `urlsMapping.js`
2. **Seletor mudou?** → Atualize apenas `locatorsMapping.js`
3. **Nova feature?** → Adicione nova seção nos mappings

Todos os testes que usam os helpers serão atualizados automaticamente! 🎉

---

**Nota**: Estes helpers são parte do playwright-framework-skeleton e devem ser
mantidos genéricos para reutilização em múltiplos projetos.

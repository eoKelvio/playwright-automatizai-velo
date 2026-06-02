import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Order Form', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
    await actions.interface.configurator.buildVehicle({ checkout: true })
  })

  test('Should be able to navigate to the initial page when the user clicks the "Velô" logo in the order page header.', async ({ page, actions }) => {
    await test.step('Click the Velô logo', async () => {
      await actions.interface.order.clickHeaderLogo()
    })

    await test.step('Validate redirect to initial page', async () => {
      const expectedUrl = urlsMapping.landing
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to navigate back to the configure page when the user clicks the back arrow button in the header.', async ({ page, actions }) => {
    await test.step('Click back button', async () => {
      await actions.interface.order.clickBackButton()
    })

    await test.step('Validate redirect to configure page', async () => {
      const expectedUrl = urlsMapping.configure
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to display the vehicle image, color, wheel type and selected optionals in the order summary panel on the right side.', async ({ page }) => {
    await test.step('Validate vehicle summary is displayed', async () => {
      const summaryTotal = page.getByTestId('summary-total-price')
      const expectedPrice = 'R$ 40.000,00'
      await expect(summaryTotal).toContainText(expectedPrice)
    })
  })

  test('Should be able to display a validation error for the "Nome" field when the user submits the form with fewer than 2 characters.', async ({ page, actions }) => {
    await test.step('Fill form with invalid name and submit', async () => {
      await actions.interface.order.fillOrderForm({ name: 'J' })
      await actions.interface.order.submit()
    })

    await test.step('Validate name error is displayed', async () => {
      const nameError = page.getByText('Nome deve ter pelo menos 2 caracteres', { exact: true })
      await expect(nameError).toBeVisible()
    })
  })

  test('Should be able to display a validation error for the "Sobrenome" field when the user submits the form with fewer than 2 characters.', async ({ page, actions }) => {
    await test.step('Fill form with invalid surname and submit', async () => {
      await actions.interface.order.fillOrderForm({ surname: 'S' })
      await actions.interface.order.submit()
    })

    await test.step('Validate surname error is displayed', async () => {
      const surnameError = page.getByText('Sobrenome deve ter pelo menos 2 caracteres', { exact: true })
      await expect(surnameError).toBeVisible()
    })
  })

  test('Should be able to display a validation error for the "Email" field when the user submits the form with an invalid email format.', async ({ page, actions }) => {
    await test.step('Fill form with invalid email and submit', async () => {
      await actions.interface.order.fillOrderForm({ email: 'test@test' })
      await actions.interface.order.submit()
    })

    await test.step('Validate email error is displayed', async () => {
      const emailError = page.getByText('Email inválido', { exact: true })
      await expect(emailError).toBeVisible()
    })
  })

  test('Should be able to display a validation error for the "Telefone" field when the user submits the form with an incomplete phone number.', async ({ page, actions }) => {
    await test.step('Fill form without phone and submit', async () => {
      await actions.interface.order.fillOrderForm({ phone: null })
      await actions.interface.order.submit()
    })

    await test.step('Validate phone error is displayed', async () => {
      const phoneError = page.getByText('Telefone inválido', { exact: true })
      await expect(phoneError).toBeVisible()
    })
  })

  test('Should be able to display a validation error for the "CPF" field when the user submits the form with an incomplete CPF number.', async ({ page, actions }) => {
    await test.step('Fill form without CPF and submit', async () => {
      await actions.interface.order.fillOrderForm({ cpf: null })
      await actions.interface.order.submit()
    })

    await test.step('Validate CPF error is displayed', async () => {
      const cpfError = page.getByText('CPF inválido', { exact: true })
      await expect(cpfError).toBeVisible()
    })
  })

  test('Should be able to select any of the four available stores from the "Loja para Retirada" dropdown ("Velô Paulista", "Velô Faria Lima", "Velô Morumbi", "Velô Ibirapuera").', async ({ page, actions }) => {
    const stores = [
      'Velô Paulista - Av. Paulista, 1000',
      'Velô Faria Lima - Av. Faria Lima, 2500',
      'Velô Morumbi - Av. Morumbi, 1500',
      'Velô Ibirapuera - Av. Ibirapuera, 3000',
    ]

    for (const store of stores) {
      await test.step(`Select store: ${store}`, async () => {
        await actions.interface.order.fillOrderForm({ store })
        const storeTrigger = page.getByTestId('checkout-store')
        const expectedStoreName = store.split(' - ')[0]
        await expect(storeTrigger).toContainText(expectedStoreName)
      })
    }
  })

  test('Should be able to display a validation error for the "Loja para Retirada" field when the user submits the form without selecting a store.', async ({ page, actions }) => {
    await test.step('Fill form without store and submit', async () => {
      await actions.interface.order.fillOrderForm({ store: null })
      await actions.interface.order.submit()
    })

    await test.step('Validate store error is displayed', async () => {
      const storeError = page.locator('.text-destructive', { hasText: 'Selecione uma loja' })
      await expect(storeError).toBeVisible()
    })
  })

  test('Should be able to display a validation error for the terms checkbox when the user submits the form without accepting the terms.', async ({ page, actions }) => {
    await test.step('Fill form without terms and submit', async () => {
      await actions.interface.order.fillOrderForm({ terms: false })
      await actions.interface.order.submit()
    })

    await test.step('Validate terms error is displayed', async () => {
      const termsError = page.getByText('Aceite os termos', { exact: true })
      await expect(termsError).toBeVisible()
    })
  })

  test('Should be able to navigate to the terms page when the user clicks the "Termos de Uso" link inside the terms checkbox section.', async ({ page }) => {
    await test.step('Click Termos de Uso link', async () => {
      await page.getByRole('link', { name: 'Termos de Uso' }).click()
    })

    await test.step('Validate redirect to terms page', async () => {
      const expectedUrl = urlsMapping.terms
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to navigate to the privacy page when the user clicks the "Política de Privacidade" link inside the terms checkbox section.', async ({ page }) => {
    await test.step('Click Política de Privacidade link', async () => {
      await page.getByRole('link', { name: 'Política de Privacidade' }).click()
    })

    await test.step('Validate redirect to privacy page', async () => {
      const expectedUrl = urlsMapping.privacy
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to display all validation errors simultaneously when the user submits an empty form.', async ({ page, actions }) => {
    await test.step('Submit empty form', async () => {
      await actions.interface.order.submit()
    })

    await test.step('Validate all errors are displayed', async () => {
      await expect(page.getByText('Nome deve ter pelo menos 2 caracteres', { exact: true })).toBeVisible()
      await expect(page.getByText('Sobrenome deve ter pelo menos 2 caracteres', { exact: true })).toBeVisible()
      await expect(page.getByText('Email inválido', { exact: true })).toBeVisible()
      await expect(page.getByText('Telefone inválido', { exact: true })).toBeVisible()
      await expect(page.getByText('CPF inválido', { exact: true })).toBeVisible()
      await expect(page.locator('.text-destructive', { hasText: 'Selecione uma loja' })).toBeVisible()
      await expect(page.getByText('Aceite os termos', { exact: true })).toBeVisible()
    })
  })

  test('Should be able to clear a field validation error when the user starts correcting the invalid field.', async ({ page, actions }) => {
    await test.step('Submit empty form to trigger errors', async () => {
      await actions.interface.order.submit()
    })

    await test.step('Validate name error is displayed', async () => {
      const nameError = page.getByText('Nome deve ter pelo menos 2 caracteres', { exact: true })
      await expect(nameError).toBeVisible()
    })

    await test.step('Fill name with valid value', async () => {
      await page.getByTestId('checkout-name').fill('João')
    })

    await test.step('Validate name error is cleared', async () => {
      const nameError = page.getByText('Nome deve ter pelo menos 2 caracteres', { exact: true })
      await expect(nameError).not.toBeVisible()
    })
  })

  test('Should be able to display a loading state on the submit button while the order is being processed.', async ({ page, actions }) => {
    await test.step('Fill order form', async () => {
      await actions.interface.order.fillOrderForm()
    })

    await test.step('Submit and validate loading state', async () => {
      await actions.interface.order.submit()
      const loadingText = page.getByText('Processando...')
      await expect(loadingText).toBeVisible()
    })
  })

  test('Should be able to create order full payment.', async ({ page, actions }) => {
    await test.step('Fill order form with full payment', async () => {
      await actions.interface.order.fillOrderForm()
    })

    await test.step('Submit order', async () => {
      await actions.interface.order.submit()
    })

    await test.step('Validate redirect to success page', async () => {
      const expectedUrl = /\/success/
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to create order financing payment.', async ({ page, actions }) => {
    await test.step('Mock credit score as approved', async () => {
      await actions.interface.order.mockCreditScore(800)
    })

    await test.step('Fill order form with financing', async () => {
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
    })

    await test.step('Submit order', async () => {
      await actions.interface.order.submit()
    })

    await test.step('Validate redirect to success page', async () => {
      const expectedUrl = /\/success/
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to display the order status as "REPROVADO" on the success page when the user submits a financing order with a CPF that returns a credit score below 500.', async ({ page, actions }) => {
    await test.step('Mock credit score below 500', async () => {
      await actions.interface.order.mockCreditScore(300)
    })

    await test.step('Fill order form with financing', async () => {
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
    })

    await test.step('Submit order', async () => {
      await actions.interface.order.submit()
    })

    await test.step('Validate success page shows REPROVADO', async () => {
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Crédito Reprovado'
      await expect(successStatus).toContainText(expectedText)
    })
  })

  test('Should be able to display the order status as "EM_ANALISE" on the success page when the user submits a financing order with a CPF that returns a credit score between 501 and 700.', async ({ page, actions }) => {
    await test.step('Mock credit score between 501 and 700', async () => {
      await actions.interface.order.mockCreditScore(600)
    })

    await test.step('Fill order form with financing', async () => {
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
    })

    await test.step('Submit order', async () => {
      await actions.interface.order.submit()
    })

    await test.step('Validate redirect to success page', async () => {
      const expectedUrl = /\/success/
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to display the order status as "APROVADO" on the success page when the user submits a financing order with a CPF that returns a credit score above 700.', async ({ page, actions }) => {
    await test.step('Mock credit score above 700', async () => {
      await actions.interface.order.mockCreditScore(800)
    })

    await test.step('Fill order form with financing', async () => {
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
    })

    await test.step('Submit order', async () => {
      await actions.interface.order.submit()
    })

    await test.step('Validate success page shows APROVADO', async () => {
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Pedido Aprovado!'
      await expect(successStatus).toContainText(expectedText)
    })
  })

  test('Should be able to display the order status as "APROVADO" on the success page when the user submits a financing order with a down payment of at least 50% of the total price, even if the credit score is below 700.', async ({ page, actions }) => {
    await test.step('Mock credit score below 700', async () => {
      await actions.interface.order.mockCreditScore(300)
    })

    await test.step('Fill order form with financing and 50% down payment', async () => {
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento', entryValue: 20000 })
    })

    await test.step('Submit order', async () => {
      await actions.interface.order.submit()
    })

    await test.step('Validate success page shows APROVADO', async () => {
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Pedido Aprovado!'
      await expect(successStatus).toContainText(expectedText)
    })
  })
})

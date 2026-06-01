import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToHome()
  })

  test('Should be able to redirect for the initial page when the user clicks the "Velô" logo in the header.', async ({ page, actions }) => {
    await test.step('Click the Velô logo', async () => {
      await actions.interface.landing.clickHeaderLogo()
    })

    await test.step('Validate stays on landing page', async () => {
      await expect(page).toHaveURL(urlsMapping.landing)
    })
  })

  test('Should be able to redirect for the configure page when the user clicks the "Configure o Seu" button in the header.', async ({ page, actions }) => {
    await test.step('Click Configure o Seu in header', async () => {
      await actions.interface.landing.clickHeaderConfigure()
    })

    await test.step('Validate redirect to configure page', async () => {
      await expect(page).toHaveURL(urlsMapping.configure)
    })
  })

  test('Should be able to redirect for the lookup page when the user clicks the "Consultar Pedido" link in the header.', async ({ page, actions }) => {
    await test.step('Click Consultar Pedido in header', async () => {
      await actions.interface.landing.clickHeaderConsultarPedido()
    })

    await test.step('Validate redirect to lookup page', async () => {
      await expect(page).toHaveURL(urlsMapping.lookup)
    })
  })

  test('Should be able to redirect for the configure page when the user clicks the "Configure Agora" button.', async ({ page, actions }) => {
    await test.step('Click Configure Agora button', async () => {
      await actions.interface.landing.clickConfigureAgora()
    })

    await test.step('Validate redirect to configure page', async () => {
      await expect(page).toHaveURL(urlsMapping.configure)
    })
  })

  test('Should be able to redirect for the configure page when the user clicks the "Monte o Seu Carro" button.', async ({ page, actions }) => {
    await test.step('Click Monte o Seu Carro button', async () => {
      await actions.interface.landing.clickCTAButton()
    })

    await test.step('Validate redirect to configure page', async () => {
      await expect(page).toHaveURL(urlsMapping.configure)
    })
  })

  test('Should be able to expand dropdown text when user clicks the "Qual é a autonomia real do Velô Sprint?"', async ({ page, actions }) => {
    await test.step('Click FAQ item', async () => {
      await actions.interface.landing.expandFaqItem(0)
    })

    await test.step('Validate FAQ item is open', async () => {
      const faqItem = page.getByTestId('faq-item-0')
      await expect(faqItem).toHaveAttribute('data-state', 'open')
    })
  })

  test('Should be able to expand dropdown text when user clicks the "Quanto tempo leva para carregar completamente?"', async ({ page, actions }) => {
    await test.step('Click FAQ item', async () => {
      await actions.interface.landing.expandFaqItem(1)
    })

    await test.step('Validate FAQ item is open', async () => {
      const faqItem = page.getByTestId('faq-item-1')
      await expect(faqItem).toHaveAttribute('data-state', 'open')
    })
  })

  test('Should be able to expand dropdown text when user clicks the "O Velô sprint possui garantia?"', async ({ page, actions }) => {
    await test.step('Click FAQ item', async () => {
      await actions.interface.landing.expandFaqItem(2)
    })

    await test.step('Validate FAQ item is open', async () => {
      const faqItem = page.getByTestId('faq-item-2')
      await expect(faqItem).toHaveAttribute('data-state', 'open')
    })
  })

  test('Should be able to expand dropdown text when user clicks the "Posso fazer test drive antes de comprar?"', async ({ page, actions }) => {
    await test.step('Click FAQ item', async () => {
      await actions.interface.landing.expandFaqItem(3)
    })

    await test.step('Validate FAQ item is open', async () => {
      const faqItem = page.getByTestId('faq-item-3')
      await expect(faqItem).toHaveAttribute('data-state', 'open')
    })
  })

  test('Should be able to expand dropdown text when user clicks the "Quais são as opções de financiamento?"', async ({ page, actions }) => {
    await test.step('Click FAQ item', async () => {
      await actions.interface.landing.expandFaqItem(4)
    })

    await test.step('Validate FAQ item is open', async () => {
      const faqItem = page.getByTestId('faq-item-4')
      await expect(faqItem).toHaveAttribute('data-state', 'open')
    })
  })

  test('Should be able to expand dropdown text when user clicks the "Como funciona a manutenção de um veículo elétrico?"', async ({ page, actions }) => {
    await test.step('Click FAQ item', async () => {
      await actions.interface.landing.expandFaqItem(5)
    })

    await test.step('Validate FAQ item is open', async () => {
      const faqItem = page.getByTestId('faq-item-5')
      await expect(faqItem).toHaveAttribute('data-state', 'open')
    })
  })

  test('Should be able to collapse a previously expanded FAQ item when the user clicks its trigger a second time.', async ({ page, actions }) => {
    await test.step('Expand FAQ item', async () => {
      await actions.interface.landing.expandFaqItem(0)
    })

    await test.step('Validate FAQ item is open', async () => {
      const faqItem = page.getByTestId('faq-item-0')
      await expect(faqItem).toHaveAttribute('data-state', 'open')
    })

    await test.step('Collapse FAQ item', async () => {
      await actions.interface.landing.expandFaqItem(0)
    })

    await test.step('Validate FAQ item is closed', async () => {
      const faqItem = page.getByTestId('faq-item-0')
      await expect(faqItem).toHaveAttribute('data-state', 'closed')
    })
  })
})

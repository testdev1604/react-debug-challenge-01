import { test, expect } from '@playwright/test'

test.describe('Finance Dashboard', () => {
  test('displays the correct total balance after hydration', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForFunction(() => document.querySelector('[data-testid="balance"]')?.textContent?.startsWith('$'))

    const balance = page.getByTestId('balance')
    await expect(balance).toHaveText('$2,964.51')
  })

  test('displays correct income total', async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => document.querySelector('[data-testid="income"]')?.textContent?.startsWith('$'))

    const income = page.getByTestId('income')
    await expect(income).toHaveText('$4,450.00')
  })

  test('displays correct expense total', async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => document.querySelector('[data-testid="expenses"]')?.textContent?.startsWith('$'))

    const expenses = page.getByTestId('expenses')
    await expect(expenses).toHaveText('$1,485.49')
  })

  test('renders all eight transactions', async ({ page }) => {
    await page.goto('/')

    const items = page.getByTestId('transaction-list').locator('li')
    await expect(items).toHaveCount(8)
  })

  test('no hydration mismatch errors in console', async ({ page }) => {
    const errors = []

    page.on('console', (msg) => {
      const text = msg.text()
      if (
        msg.type() === 'error' &&
        (text.includes('Hydration') ||
          text.includes('hydrat') ||
          text.includes('did not match') ||
          text.includes('server-rendered'))
      ) {
        errors.push(text)
      }
    })

    await page.goto('/')
    await page.waitForTimeout(2000)

    expect(errors).toHaveLength(0)
  })
})

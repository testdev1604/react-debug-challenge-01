import { test, expect } from '@playwright/test'

test.describe('Counter with Context', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('counter status reflects the current count after clicks', async ({
    page,
  }) => {
    const button = page.getByRole('button', { name: /count/i })
    const status = page.getByTestId('counter-status')

    await expect(status).toHaveText('No clicks yet')

    await button.click()
    await expect(status).toHaveText('Clicked 1 time')

    await button.click()
    await expect(status).toHaveText('Clicked 2 times')

    await button.click()
    await expect(status).toHaveText('Clicked 3 times')
  })

  test('button text stays in sync with counter status', async ({ page }) => {
    const button = page.getByRole('button', { name: /count/i })
    const status = page.getByTestId('counter-status')

    await expect(button).toHaveText('Count is 0')
    await expect(status).toHaveText('No clicks yet')

    await button.click()
    await expect(button).toHaveText('Count is 1')
    await expect(status).toHaveText('Clicked 1 time')

    for (let i = 0; i < 4; i++) {
      await button.click()
    }

    await expect(button).toHaveText('Count is 5')
    await expect(status).toHaveText('Clicked 5 times')
  })
})

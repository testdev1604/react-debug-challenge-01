import { test, expect } from '@playwright/test';

const FLIGHT_3_PRICE = 179; // AeroVista price per person

async function searchAndSelectFlight(page) {
  await page.getByTestId('origin-select').selectOption('New York (JFK)');
  await page.getByTestId('destination-select').selectOption('Los Angeles (LAX)');
  await page.getByTestId('date-input').fill('2026-06-15');
  await page.getByTestId('passengers-select').selectOption('1');
  await page.getByTestId('search-btn').click();

  await expect(page.getByTestId('flight-card').first()).toBeVisible();

  await page.getByTestId('select-flight-3').click();

  await expect(page.getByTestId('total-price')).toBeVisible();
}

test.describe('Flight Booking App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display search form on load', async ({ page }) => {
    await expect(page.getByText('Find Your Flight')).toBeVisible();
    await expect(page.getByTestId('origin-select')).toBeVisible();
    await expect(page.getByTestId('destination-select')).toBeVisible();
    await expect(page.getByTestId('date-input')).toBeVisible();
    await expect(page.getByTestId('passengers-select')).toBeVisible();
  });

  test('should search and display flights', async ({ page }) => {
    await page.getByTestId('origin-select').selectOption('New York (JFK)');
    await page.getByTestId('destination-select').selectOption('Los Angeles (LAX)');
    await page.getByTestId('date-input').fill('2026-06-15');
    await page.getByTestId('search-btn').click();

    await expect(page.getByText('Available Flights')).toBeVisible();
    const cards = page.getByTestId('flight-card');
    await expect(cards).toHaveCount(4);
  });

  test('should select a flight and show booking summary', async ({ page }) => {
    await searchAndSelectFlight(page);

    await expect(page.getByText('Booking Summary')).toBeVisible();
    await expect(page.getByText('AeroVista')).toBeVisible();
    await expect(page.getByTestId('summary-passenger-count')).toHaveText('1');
    await expect(page.getByTestId('total-price')).toHaveText(`$${FLIGHT_3_PRICE}`);
  });

  test('should update total price when passengers change on summary page', async ({ page }) => {
    await searchAndSelectFlight(page);

    await expect(page.getByTestId('summary-passenger-count')).toHaveText('1');
    await expect(page.getByTestId('total-price')).toHaveText(`$${FLIGHT_3_PRICE}`);

    await page.getByTestId('increase-passengers').click();
    await expect(page.getByTestId('summary-passenger-count')).toHaveText('2');

    // This assertion catches the stale-context-value bug:
    // The total price MUST update to reflect the new passenger count.
    await expect(page.getByTestId('total-price')).toHaveText(`$${FLIGHT_3_PRICE * 2}`);

    await page.getByTestId('increase-passengers').click();
    await expect(page.getByTestId('summary-passenger-count')).toHaveText('3');
    await expect(page.getByTestId('total-price')).toHaveText(`$${FLIGHT_3_PRICE * 3}`);
  });

  test('should show correct total on confirmation after changing passengers', async ({ page }) => {
    await searchAndSelectFlight(page);

    await page.getByTestId('increase-passengers').click();
    await page.getByTestId('increase-passengers').click();
    await expect(page.getByTestId('summary-passenger-count')).toHaveText('3');

    // Total must match 3 passengers before confirming
    await expect(page.getByTestId('total-price')).toHaveText(`$${FLIGHT_3_PRICE * 3}`);

    await page.getByTestId('confirm-btn').click();

    await expect(page.getByText('Booking Confirmed!')).toBeVisible();
    await expect(page.getByTestId('confirmed-passengers')).toHaveText('3');
    await expect(page.getByTestId('confirmed-total')).toHaveText(`$${FLIGHT_3_PRICE * 3}`);
  });

  test('should update price multiplier text when passengers change', async ({ page }) => {
    await searchAndSelectFlight(page);

    await expect(page.getByTestId('price-multiplier')).toHaveText('1');

    await page.getByTestId('increase-passengers').click();
    await page.getByTestId('increase-passengers').click();

    // The multiplier in the pricing breakdown must also reflect updated count
    await expect(page.getByTestId('price-multiplier')).toHaveText('3');
  });

  test('should be able to book another flight after confirmation', async ({ page }) => {
    await searchAndSelectFlight(page);
    await page.getByTestId('confirm-btn').click();

    await expect(page.getByText('Booking Confirmed!')).toBeVisible();
    await page.getByTestId('new-search-btn').click();

    await expect(page.getByText('Find Your Flight')).toBeVisible();
  });
});

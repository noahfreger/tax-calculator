import { test, expect } from '@playwright/test';

test('Tax Calculation Test with valid input', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('income-input').fill('100000');
  await page.getByTestId('year-select').selectOption('2021');
  await page.getByTestId('calculate-taxes-button').click();

  const result = await page.getByTestId('total-taxes-owed').textContent();

  // Assert
  expect(result).toBe('$17,911.70');
});

test('Tax Calculation test with invalid input', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('year-select').selectOption('2021');
  await page.getByTestId('calculate-taxes-button').click();
  const result = await page.getByTestId('error-msg').textContent();

  // Assert
  expect(result).toBeDefined();
});

test('Tax Calculation API error handling test', async ({ page }) => {
  const taxYear = '2021';

  // Mock the API response
  await page.route(`http://localhost:5001/tax-calculator/tax-year/${taxYear}`, async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  });

  await page.goto('/');
  await page.getByTestId('income-input').fill('100000');
  await page.getByTestId('year-select').selectOption(taxYear);
  await page.getByTestId('calculate-taxes-button').click();
  const result = await page.getByTestId('summary-error-msg').textContent();

  // Assert
  expect(result).toBeDefined();
});

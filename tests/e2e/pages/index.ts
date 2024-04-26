import { test, expect } from '@playwright/test';

test('Se muestran errores al hacer click en el botón sin contenido alguno', async ({ page }) => {
  await page.goto('#/login');
  await page.click('button.auth');

  // Espera errores al hacer click
  const el = await page.waitForSelector('.error');

  expect(el).toBeDefined();
});

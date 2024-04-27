import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/#/login');
});

test.describe('Testing para crear eventos', () =>{
  test('Se registra correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByPlaceholder('Username', { exact: true }).fill('ocial1234578');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForTimeout(5000);

    await page.goto('http://localhost:3000/#/profile');

    const h1Text = await page.$eval('h1', element => element.textContent);

    expect(h1Text).toBe('ocial1234578');

    await page.goto('http://localhost:3000/#/event');

    await page.getByRole('button', { name: 'Create New Event' }).click();

    await page.waitForTimeout(5000);

    const url = page.url();

    expect(url).toBe('http://localhost:3000/#/');

  });
});

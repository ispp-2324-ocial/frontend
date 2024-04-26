import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/#/login');
});
test.describe('Testing del login y register', () =>{
  test('Se registra correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/register');
    await page.getByPlaceholder('Username', { exact: true }).fill('ocial12345');
    await page.getByPlaceholder('E-mail', { exact: true }).fill('edupizlop@gmail.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');
    await page.getByPlaceholder('Confirm password', { exact: true }).fill('Baloncesto02');
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Create' }).click();
  });
});

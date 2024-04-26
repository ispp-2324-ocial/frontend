import { test, expect } from '@playwright/test';

test('Se muestran errores al hacer click en el botón sin contenido alguno', async ({ page }) => {
  await page.goto('#/login');
  await page.click('button.auth');

  // Espera errores al hacer click
  const el = await page.waitForSelector('.error');

  expect(el).toBeDefined();
});

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/#/login');
});


test.describe('Testing del login y register', () =>{


  test('Se registra correctamente', async ({ page }) => {


    await page.goto('http://localhost:3000/#/register');
    await page.getByPlaceholder('Nombre de usuario').fill('ocial12345');
    await page.getByPlaceholder('Correo electrónico').fill('edupizlop@gmail.com');
    await page.getByPlaceholder('Contraseña').fill('Baloncesto02');
    await page.getByPlaceholder('Confirmar contraseña').fill('Baloncesto02');

    await page.getByRole('checkbox').click();
    await page.getByRole('button').click();
  });
});

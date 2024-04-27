import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/#/login');
});

test.describe('Testing del login y register de usuario', () =>{
  test('Se registra correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/register');
    await page.getByPlaceholder('Username', { exact: true }).fill('ocial1234578');
    await page.getByPlaceholder('E-mail', { exact: true }).fill('lalalalalaa@gmail.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');
    await page.getByPlaceholder('Confirm password', { exact: true }).fill('Baloncesto02');
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Create' }).click();

    await page.waitForTimeout(5000);

    const url = page.url();

    expect(url).toBe('http://localhost:3000/#/');

    await page.goto('http://localhost:3000/#/profile');

    const h1Text = await page.$eval('h1', element => element.textContent);

    expect(h1Text).toBe('ocial1234578');

    // Navega a la página de perfil
    await page.goto('http://localhost:3000/#/profile');

    // Haz clic en el botón 'Log out'
    await page.getByRole('button', { name: 'Log out' }).click();

    // Espera a que la página se redirija a la página de inicio de sesión
    await page.waitForTimeout(5000);

    // Rellena los campos de nombre de usuario y contraseña
    await page.getByPlaceholder('Username', { exact: true }).fill('ocial1234578');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');

    // Haz clic en el botón 'Log in'
    await page.getByRole('button', { name: 'Log in' }).click();

    // Espera a que la página se redirija después de iniciar sesión
    await page.waitForTimeout(5000);

    const loginUrl = page.url();

    // Comprueba si la URL de la página es la esperada después de iniciar sesión
    expect(loginUrl).toBe('http://localhost:3000/#/');
  });
});

test.describe('Testing del login y register de cliente', () =>{
  test('Se registra correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/register/client');
    await page.getByPlaceholder('Username', { exact: true }).fill('cliente1234578');
    await page.getByPlaceholder('Name', { exact: true }).fill('Fermin Trujillo');
    await page.getByPlaceholder('E-mail', { exact: true }).fill('cliente@gmail.com');
    await page.getByPlaceholder('DNI / NIF', { exact: true }).fill('77933508P');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');
    await page.getByPlaceholder('Confirm password', { exact: true }).fill('Baloncesto02');
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Create' }).click();

    await page.waitForTimeout(5000);

    const url = page.url();

    expect(url).toBe('http://localhost:3000/#/');

    await page.goto('http://localhost:3000/#/profile');

    const h1Text = await page.$eval('h1', element => element.textContent);

    expect(h1Text).toBe('ocial1234578');

    // Navega a la página de perfil
    await page.goto('http://localhost:3000/#/profile');

    // Haz clic en el botón 'Log out'
    await page.getByRole('button', { name: 'Log out' }).click();

    // Espera a que la página se redirija a la página de inicio de sesión
    await page.waitForTimeout(5000);

    // Rellena los campos de nombre de usuario y contraseña
    await page.getByPlaceholder('Username', { exact: true }).fill('cliente1234578');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');

    // Haz clic en el botón 'Log in'
    await page.getByRole('button', { name: 'Log in' }).click();

    // Espera a que la página se redirija después de iniciar sesión
    await page.waitForTimeout(5000);

    const loginUrl = page.url();

    // Comprueba si la URL de la página es la esperada después de iniciar sesión
    expect(loginUrl).toBe('http://localhost:3000/#/');
  });
});



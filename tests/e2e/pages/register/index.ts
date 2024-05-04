import { expect, test } from '@playwright/test';

test.describe('Testing del login y register de usuario', () =>{
  test('Se registra correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/register');
    await page.getByPlaceholder('Username', { exact: true }).fill('ererereeewewerrereererewewre');
    await page.getByPlaceholder('E-mail', { exact: true }).fill('rererrerrreeewrereereereeere@gmail.com');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');
    await page.getByPlaceholder('Confirm password', { exact: true }).fill('Baloncesto02');
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Create' }).click();

    await page.waitForTimeout(5000);

    const url = page.url();

    expect(url).toBe('http://localhost:3000/#/');

    // Navega a la página de perfil
    await page.goto('http://localhost:3000/#/profile');

    // Haz clic en el botón 'Log out'
    await page.getByRole('button', { name: 'Logout' }).click();

    // Espera a que la página se redirija a la página de inicio de sesión
    await page.waitForTimeout(5000);

    // Rellena los campos de nombre de usuario y contraseña
    await page.getByPlaceholder('Username', { exact: true }).fill('ererereeewewerrereererewewre');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');

    // Haz clic en el botón 'Log in'
    await page.getByRole('button', { name: 'Log in' }).click();

    // Espera a que la página se redirija después de iniciar sesión
    await page.waitForTimeout(5000);

    const loginUrl = page.url();

    // Comprueba si la URL de la página es la esperada después de iniciar sesión
    expect(loginUrl).toBe('http://localhost:3000/#/');

    await page.goto('http://localhost:3000/#/profile');

    await page.getByRole('button', { name: 'Delete Account' }).click();

    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Yes, delete my account' }).click();

    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'OK' }).click();

    await page.waitForTimeout(5000);
  });
});

test.describe('Testing del login y register de cliente', () =>{
  test('Se registra correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/register/client');
    await page.getByPlaceholder('Username', { exact: true }).fill('ococoococo');
    await page.getByPlaceholder('Name', { exact: true }).fill('Fermin Trujillo');
    await page.getByPlaceholder('E-mail', { exact: true }).fill('clirererereente@gmail.com');
    await page.getByPlaceholder('ID / VAT', { exact: true }).fill('77933508P');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');
    await page.getByPlaceholder('Confirm password', { exact: true }).fill('Baloncesto02');
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Create' }).click();

    await page.waitForTimeout(5000);

    const url = page.url();

    expect(url).toBe('http://localhost:3000/#/');

    // Navega a la página de perfil
    await page.goto('http://localhost:3000/#/profile');

    // Haz clic en el botón 'Log out'
    await page.getByRole('button', { name: 'Logout' }).click();

    // Espera a que la página se redirija a la página de inicio de sesión
    await page.waitForTimeout(5000);

    // Rellena los campos de nombre de usuario y contraseña
    await page.getByPlaceholder('Username', { exact: true }).fill('ococoococo');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');

    // Haz clic en el botón 'Log in'
    await page.getByRole('button', { name: 'Log in' }).click();

    // Espera a que la página se redirija después de iniciar sesión
    await page.waitForTimeout(5000);

    const loginUrl = page.url();

    // Comprueba si la URL de la página es la esperada después de iniciar sesión
    expect(loginUrl).toBe('http://localhost:3000/#/');

    await page.goto('http://localhost:3000/#/profile');

    await page.getByRole('button', { name: 'Delete Account' }).click();

    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Yes, delete my account' }).click();

    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'OK' }).click();

    await page.waitForTimeout(5000);
  });
});



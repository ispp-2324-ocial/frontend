import { expect, test } from '@playwright/test';
import { date } from 'zod';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/#/login');
});

test.describe('Testing para crear eventos', () =>{
  test('Crear un evento desde cliente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByPlaceholder('Username', { exact: true }).fill('edupizlop');
    await page.getByPlaceholder('Password', { exact: true }).fill('baloncesto');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForTimeout(5000);

    await page.goto('http://localhost:3000/#/client/events/create');

    await page.getByPlaceholder('Event name', { exact: true }).fill('chipiona');
    await page.getByPlaceholder('Place', { exact: true }).fill('Chipiona');
    await page.getByPlaceholder('Description', { exact: true }).fill('estamo en japó');
    /*
     *  Encuentra el input de fecha y establece una fecha
     * await page.fill('.input-box.validate-style.rounded-xl.border.focus-visible:outline-none', '2024-06-20 00:00');
     * await page.fill('.input-box.validate-style.rounded-xl.border.focus-visible:outline-none', '2024-06-21 00:00');
     */
    await page.getByPlaceholder('Capacity', { exact: true }).fill('5');
    //Click en algun sitio del mapa
    await page.getByRole('button', { name: 'Create Event' }).click();

    await page.goto('http://localhost:3000/#/event');

    await page.waitForTimeout(5000);

    await page.getByRole('button', { name: 'Event Details' }).click();//Boton para ir a los detalles

    await page.waitForTimeout(5000);


    await page.getByRole('button', { name: 'Delete Event' }).click();


    await page.goto('http://localhost:3000/#/profile');

    await page.getByRole('button', { name: 'Log out' }).click();

  });
});


test.describe('Testing para darle like a eventos', () =>{
  test('Un usuario le da like a un evento', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByPlaceholder('Username', { exact: true }).fill('ocial1234578');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02'); //Logearte como usuario
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForTimeout(5000);

    await page.goto('http://localhost:3000/#/profile');

    const h1Text = await page.$eval('h1', element => element.textContent);

    expect(h1Text).toBe('ocial1234578');

    await page.goto('http://localhost:3000/#/');

    await page.getByRole('button', { name: 'Look details' }).click();

    await page.waitForTimeout(5000);

    expect(page.url()).toBe('http://localhost:3000/#/details/45');

    await page.getByRole('button', { name: 'Like' }).click();

    await page.waitForTimeout(5000);

    await page.goto('http://localhost:3000/#/event');

    await page.waitForTimeout(5000);

    const text = await page.textContent('body');

    expect(text).toContain('New SaiVintage al estilo Sevillano');


  });
});

test.describe('Testing para los filtros', () =>{
  test('Los filtros funcionan correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByPlaceholder('Username', { exact: true }).fill('ocial1234578');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForTimeout(5000);

    await page.goto('http://localhost:3000/#/profile');

    const h1Text = await page.$eval('h1', element => element.textContent);

    expect(h1Text).toBe('ocial1234578');

    await page.goto('http://localhost:3000/#/');

    await page.getByRole('button', { name: 'Filter' }).click();

    await page.click('.select-data');

    await page.waitForTimeout(1000);

    await page.click('.option[data-value="Sport"]');

    //Aqui quiero encontrar la lista de eventos visibles y que solo esten aquellos con atributo categoria=Sport
    await page.getByRole('button', { name: 'Filter' }).click();

    await page.click('.select-data');

    await page.waitForTimeout(1000);

    await page.click('.option[data-value="Music"]');
    //Aqui quiero encontrar la lista de eventos visibles y que solo esten aquellos con atributo categoria=Music
    await page.getByRole('button', { name: 'Filter' }).click();

    await page.click('.select-data');

    await page.waitForTimeout(1000);

    await page.click('.option[data-value="Market"]');
    //Aqui quiero encontrar la lista de eventos visibles y que solo esten aquellos con atributo categoria=Market
    await page.getByRole('button', { name: 'Filter' }).click();

    await page.click('.select-data');

    await page.waitForTimeout(1000);

    await page.click('.option[data-value="Relaxing activities"]');
    //Aqui quiero encontrar la lista de eventos visibles y que solo esten aquellos con atributo categoria=Relaxing activities
    await page.getByRole('button', { name: 'Filter' }).click();

    await page.click('.select-data');

    await page.waitForTimeout(1000);

    await page.click('.option[data-value="Concert"]');
    //Aqui quiero encontrar la lista de eventos visibles y que solo esten aquellos con atributo categoria=Concert

    await page.getByRole('button', { name: 'Filter' }).click();

    await page.click('.select-data');

    await page.waitForTimeout(1000);

    await page.getByRole('checkbox').click();
    //Aqui quiero encontrar la lista de eventos visibles y que solo esten aquellos que esten destacados

  });
});


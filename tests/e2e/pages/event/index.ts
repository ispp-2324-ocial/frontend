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

    expect(page.url()).toBe('http://localhost:3000/#/client/events/create');

    const url = page.url();

    expect(url).toBe('http://localhost:3000/#/');

  });
});


test.describe('Testing para darle like a eventos', () =>{
  test('Se registra correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login');
    await page.getByPlaceholder('Username', { exact: true }).fill('ocial1234578');
    await page.getByPlaceholder('Password', { exact: true }).fill('Baloncesto02');
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
  test('Se registra correctamente', async ({ page }) => {
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


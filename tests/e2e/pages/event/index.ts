import { expect, test } from '@playwright/test';

test.skip('Testing de creación de eventos', () =>{
  test('Un cliente crea un evento', async ({ page }) => {
    const baseUrl = 'http://localhost:3000/#/';

    // Log in with the registered client
    await page.goto(baseUrl + 'login');
    await page.getByPlaceholder('Username', { exact: true }).fill('edupizlop');
    await page.getByPlaceholder('Password', { exact: true }).fill('baloncesto');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(3000);

    // Create a new event
    await page.goto(baseUrl + 'client/events/create');
    await page.getByPlaceholder('Event name', { exact: true }).fill('chipiona');
    await page.getByPlaceholder('Place', { exact: true }).fill('Chipiona');
    await page.getByPlaceholder('Description', { exact: true }).fill('estamo en japó');
    /*
     *  Encuentra el input de fecha y establece una fecha
     * await page.fill('.input-box.validate-style.rounded-xl.border.focus-visible:outline-none', '2024-06-20 00:00');
     * await page.fill('.input-box.validate-style.rounded-xl.border.focus-visible:outline-none', '2024-06-21 00:00');
     */
    await page.getByPlaceholder('Capacity', { exact: true }).fill('5');
    await page.getByRole('button', { name: 'Create Event' }).click();

    // Go to the event details page
    await page.goto(baseUrl + 'event');
    await page.getByRole('button', { name: 'Event Details' }).click();
    await page.waitForTimeout(3000);

    // Delete the event
    await page.getByRole('button', { name: 'Delete Event' }).click();
    await page.waitForTimeout(3000);

    // Log out
    await page.goto(baseUrl + 'profile');
    await page.getByRole('button', { name: 'Log out' }).click();
    await page.waitForTimeout(1000);
  });
});


test.describe('Testing para darle like a eventos', () =>{
  test('Un usuario le da like a un evento', async ({ page }) => {
    const baseUrl = 'http://localhost:3000/#/';

    // Log in with the registered user
    await page.goto(baseUrl + 'login');
    await page.getByPlaceholder('Username', { exact: true }).fill('user1');
    await page.getByPlaceholder('Password', { exact: true }).fill('newpass123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(3000);

    // Click on a randomly selected event marker icon
    const markerIcons = await page.$$('.leaflet-marker-icon');
    const randomIndex = Math.floor(Math.random() * markerIcons.length);
    const randomMarkerIcon = markerIcons[randomIndex];

    // Get bounding box of the marker icon
    const boundingBox = await randomMarkerIcon.boundingBox();

    if (boundingBox) {
      const clickX = boundingBox.x + boundingBox.width / 2;
      const clickY = boundingBox.y + boundingBox.height / 2;

      await page.mouse.click(clickX, clickY);
    } else {
      console.error('Bounding box is null');
    }

    // Click on the 'View details' href
    await page.getByRole('link', { name: 'View details' }).click();
    await page.waitForTimeout(3000);

    // Check if the user is on the event details page
    const eventIdMatch = new RegExp(/\/details\/(\d+)/).exec(page.url());
    const eventId = eventIdMatch ? eventIdMatch[1] : undefined;

    expect(page.url()).toBe(baseUrl + 'details/' + eventId);
    await page.waitForTimeout(1000);

    // Click on the 'Like' button
    await page.click('svg.heart-outline');
    await page.waitForTimeout(3000);
    await page.$eval('p.elemento:not(:has-text("0"))', element => element !== null);
    await page.waitForTimeout(1000);
  });
});

test.skip('Testing para los filtros', () =>{
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


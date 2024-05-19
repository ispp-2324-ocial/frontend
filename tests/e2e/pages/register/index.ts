/* eslint-disable import/no-nodejs-modules */
import { randomBytes } from 'node:crypto';
import { expect, test } from '@playwright/test';

test.describe('Testing del login y register de usuario', () => {
  test('Se registra correctamente', async ({ page }) => {
    const baseUrl = 'http://localhost:3000/#/';
    const uniqueIdentifier = Date.now(); // Using timestamp as a unique identifier

    // Generate unique username, email, and password
    const username = `user_${uniqueIdentifier}`;
    const email = `user_${uniqueIdentifier}@gmail.com`;
    const password = `ocialpass_${uniqueIdentifier}`;

    // Navigate to registration page and fill in registration form
    await page.goto(baseUrl + 'register');
    await page.getByPlaceholder('Username', { exact: true }).fill(username);
    await page.getByPlaceholder('E-mail', { exact: true }).fill(email);
    await page.getByPlaceholder('Password', { exact: true }).fill(password);
    await page.getByPlaceholder('Confirm password', { exact: true }).fill(password);
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.waitForTimeout(6000);

    // Ensure registration was successful
    expect(page.url()).toBe(baseUrl);

    // Navigate to profile page and log out
    await page.goto(baseUrl + 'profile');
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForTimeout(3000);

    // Log in with the registered user
    await page.goto(baseUrl + 'login');
    await page.getByPlaceholder('Username', { exact: true }).fill(username);
    await page.getByPlaceholder('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(3000);

    // Ensure login was successful
    expect(page.url()).toBe(baseUrl);

    // Delete the user account
    await page.goto(baseUrl + 'profile');
    await page.getByRole('button', { name: 'Delete Account' }).click();
    await page.getByRole('button', { name: 'Yes, delete my account' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(1000);
  });
});

/**
 * Generates a random ID number with a valid letter
 */
function generateID() : string {
  const randomFloat = randomBytes(4).readUInt32LE(0) / 0xFF_FF_FF_FF;
  const numbers = randomFloat.toString(9).slice(2, 10);
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const letter = letters.charAt(Number.parseInt(numbers) % 23);

  return `${numbers}${letter}`;
}

test.describe('Testing del login y register de cliente', () => {
  test('Se registra correctamente', async ({ page }) => {
    const baseUrl = 'http://localhost:3000/#/';
    const uniqueIdentifier = Date.now(); // Using timestamp as a unique identifier

    // Generate unique username, name, email, idVat, and password
    const username = `client_${uniqueIdentifier}`;
    const name = `Client Name_${uniqueIdentifier}`;
    const email = `client_${uniqueIdentifier}@gmail.com`;
    const idVat = generateID();
    const password = `ocialpass_${uniqueIdentifier}`;

    // Navigate to client registration page and fill in registration form
    await page.goto(baseUrl + 'register/client');
    await page.getByPlaceholder('Username', { exact: true }).fill(username);
    await page.getByPlaceholder('Name', { exact: true }).fill(name);
    await page.getByPlaceholder('E-mail', { exact: true }).fill(email);
    await page.getByPlaceholder('ID / VAT', { exact: true }).fill(idVat);
    await page.getByPlaceholder('Password', { exact: true }).fill(password);
    await page.getByPlaceholder('Confirm password', { exact: true }).fill(password);
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.waitForTimeout(6000);

    // Ensure registration was successful
    expect(page.url()).toBe(baseUrl);

    // Navigate to profile page and log out
    await page.goto(baseUrl + 'profile');
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForTimeout(3000);

    // Log in with the registered client
    await page.goto(baseUrl + 'login');
    await page.getByPlaceholder('Username', { exact: true }).fill(username);
    await page.getByPlaceholder('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(3000);

    // Ensure login was successful
    expect(page.url()).toBe(baseUrl);

    // Delete the client account
    await page.goto(baseUrl + 'profile');
    await page.getByRole('button', { name: 'Delete Account' }).click();
    await page.getByRole('button', { name: 'Yes, delete my account' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(1000);
  });
});


import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://playwrightpad.in/sandbox/banking');

  await page.locator('input[name="username"]').fill('apex_user');
  await page.locator('input[name="password"]').fill('Password123!');
  await page.locator('button[type="submit"]').click();

  await page.context().storageState({
    path: 'playwright/.auth/auth.json'
  });

  await browser.close();
}

export default globalSetup;
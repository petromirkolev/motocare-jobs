import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';
import { validInput } from '../utils/test-data';

const seededUser = {
  email: 'login-seeded@example.com',
  password: validInput.password,
};

test.describe('Session test suite', () => {
  let loginPage: LoginPage;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const registerPage = new RegisterPage(page);

    await registerPage.gotoreg();
    await registerPage.register(seededUser.email, seededUser.password);

    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Logged-in user stays logged in after refresh', async ({ page }) => {
    await loginPage.login(seededUser.email, seededUser.password);
    await loginPage.expectSuccess('Login success, opening garage...');
    await expect(page.getByTestId('page-bikes')).toBeVisible();

    await page.reload();

    await expect(page.getByTestId('page-bikes')).toBeVisible();
  });

  test('Logout returns user to auth page', async ({ page }) => {
    await loginPage.login(seededUser.email, seededUser.password);
    await loginPage.expectSuccess('Login success, opening garage...');
    await expect(page.getByTestId('page-bikes')).toBeVisible();

    await page.getByTestId('btn-logout-topbar').click();

    await expect(page.getByTestId('page-bikes')).not.toBeVisible();
    await expect(page.getByTestId('tab-login')).toBeVisible();
  });

  test('Unauthenticated user cannot see app pages on initial load', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByTestId('page-bikes')).not.toBeVisible();
    await expect(page.getByTestId('tab-login')).toBeVisible();
  });
});

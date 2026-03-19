import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';
import { validInput } from '../utils/test-data';

const seededUser = {
  email: 'login-seeded@example.com',
  password: validInput.password,
};

test.describe('Login page test suite', () => {
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

  test('Login is successful with valid email and valid password', async ({
    page,
  }) => {
    await loginPage.login(seededUser.email, seededUser.password);
    await loginPage.expectSuccess('Login success, opening garage...');
    await expect(page.getByTestId('page-bikes')).toBeVisible();
  });

  test('Login is rejected with missing email', async ({ page }) => {
    await loginPage.login('', seededUser.password);
    await loginPage.expectError('Email is required');
    await expect(page.getByTestId('tab-login')).toBeVisible();
  });

  test('Login is rejected with missing password', async ({ page }) => {
    await loginPage.login(seededUser.email, '');
    await loginPage.expectError('Password is required');
    await expect(page.getByTestId('tab-login')).toBeVisible();
  });

  test('Login is rejected with wrong password', async ({ page }) => {
    await loginPage.login(seededUser.email, '12344321');
    await loginPage.expectError('Invalid credentials');
    await expect(page.getByTestId('tab-login')).toBeVisible();
  });

  test('Login is rejected with non-existing user', async ({ page }) => {
    await loginPage.login('nonexistingemail@test.com', '12345678');
    await loginPage.expectError('Invalid credentials');
    await expect(page.getByTestId('tab-login')).toBeVisible();
  });
});

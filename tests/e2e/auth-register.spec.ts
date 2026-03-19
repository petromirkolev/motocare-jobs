import { test } from '@playwright/test';
import { RegisterPage } from '../pages/register-page';
import { validInput, uniqueEmail } from '../utils/test-data';

test.describe('Register page test suite', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.gotoreg();
  });

  test('User can register with valid credentials', async () => {
    const email = uniqueEmail();
    const password = validInput.password;

    await registerPage.fillEmail(email);
    await registerPage.fillPassword(password);
    await registerPage.fillConfirmPassword(password);
    await registerPage.submit();
    await registerPage.expectSuccess('Registration successful!');
  });

  test('User cannot register with same valid credentials', async () => {
    const email = 'duplicate-check@example.com';
    const password = validInput.password;

    await registerPage.fillEmail(email);
    await registerPage.fillPassword(password);
    await registerPage.fillConfirmPassword(password);
    await registerPage.submit();
    await registerPage.expectSuccess('Registration successful!');

    await registerPage.gotoreg();

    await registerPage.fillEmail(email);
    await registerPage.fillPassword(password);
    await registerPage.fillConfirmPassword(password);
    await registerPage.submit();
    await registerPage.expectError('User already exists');
  });

  test('User cannot register without credentials', async () => {
    await registerPage.submit();
    await registerPage.expectError('Email is required');
  });

  test('User cannot register without email', async () => {
    const password = validInput.password;

    await registerPage.fillEmail('');
    await registerPage.fillPassword(password);
    await registerPage.fillConfirmPassword(password);
    await registerPage.submit();
    await registerPage.expectError('Email is required');
  });

  test('User cannot register without password', async () => {
    const email = uniqueEmail();

    await registerPage.fillEmail(email);
    await registerPage.fillPassword('');
    await registerPage.fillConfirmPassword(validInput.password);
    await registerPage.submit();
    await registerPage.expectError('Password is required');
  });

  test('User cannot register without confirm password', async () => {
    const email = uniqueEmail();

    await registerPage.fillEmail(email);
    await registerPage.fillPassword(validInput.password);
    await registerPage.fillConfirmPassword('');
    await registerPage.submit();
    await registerPage.expectError('Confirm password is required');
  });

  test('User cannot register with not matching passwords', async () => {
    const email = uniqueEmail();

    await registerPage.fillEmail(email);
    await registerPage.fillPassword(validInput.password);
    await registerPage.fillConfirmPassword('testingthepass');
    await registerPage.submit();
    await registerPage.expectError('Passwords do not match');
  });
});

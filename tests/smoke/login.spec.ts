import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

// Smoke test suite for login functionality
test.describe('Login Functionality @smoke', () => {
  // Test for successful login with valid credentials
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // The Internet Herokuapp uses tomsmith/SuperSecretPassword! as valid credentials
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Verify successful login
    await loginPage.expectSuccessfulLogin('/secure');
  });

  // Test for failed login with invalid credentials
  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Use invalid credentials
    await loginPage.login('invaliduser', 'invalidpassword');

    // Verify error message is displayed
    await loginPage.expectErrorMessage();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('invalid');
  });

  // Test for empty form validation
  test('should validate empty form fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Submit with empty fields
    await loginPage.login('', '');

    // Verify error message is displayed
    await loginPage.expectErrorMessage();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('username');
  });
});

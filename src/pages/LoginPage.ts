import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the login page
 * Modified to work with The Internet Herokuapp
 */
export class LoginPage {
  // Page object
  private readonly page: Page;

  // Locators for elements on the page - adapted for The Internet Herokuapp
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly successMessage: Locator;

  /**
   * Creates a new LoginPage object
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('#flash.error');
    this.successMessage = page.locator('#flash.success');
  }

  /**
   * Navigates to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * Performs login with the provided credentials
   * @param username Username to enter
   * @param password Password to enter
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Checks if the error message is displayed
   */
  async expectErrorMessage(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Gets the text of the error message
   * @returns Text of the error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Checks if the login was successful
   * @param expectedUrl URL to expect after successful login
   */
  async expectSuccessfulLogin(expectedUrl: string): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await expect(this.page).toHaveURL(expectedUrl);
  }
}

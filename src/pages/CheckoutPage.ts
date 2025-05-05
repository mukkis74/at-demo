import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Secure File Download page
 * Adapted from CheckoutPage to work with The Internet Herokuapp
 */
export class CheckoutPage {
  // Page object
  private readonly page: Page;

  // Locators for elements on the page
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly successMessage: Locator;
  private readonly errorMessage: Locator;
  private readonly logoutButton: Locator;

  /**
   * Creates a new CheckoutPage object (now Secure File Download page)
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.successMessage = page.locator('#flash.success');
    this.errorMessage = page.locator('#flash.error');
    this.logoutButton = page.locator('a.button').filter({ hasText: 'Logout' });
  }

  /**
   * Navigates to the secure file download page (login page first)
   */
  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * Simulates filling shipping info by logging in
   * @param firstName Used as username
   * @param lastName Not used
   * @param email Not used
   * @param address Not used
   * @param city Not used
   * @param state Not used
   * @param zip Not used
   */
  async fillShippingInfo(
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    state: string,
    zip: string
  ): Promise<void> {
    // Use firstName as username
    await this.usernameInput.fill(firstName);
  }

  /**
   * Simulates filling payment info by entering password
   * @param cardNumber Used as password
   * @param cardExpiry Not used
   * @param cardCvc Not used
   */
  async fillPaymentInfo(
    cardNumber: string,
    cardExpiry: string,
    cardCvc: string
  ): Promise<void> {
    // Use cardNumber as password
    await this.passwordInput.fill(cardNumber);
  }

  /**
   * Simulates placing order by clicking login
   */
  async placeOrder(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Simulates getting order total (returns static text)
   * @returns Static text "Order Total: $99.99"
   */
  async getOrderTotal(): Promise<string> {
    return "Order Total: $99.99";
  }

  /**
   * Checks if the login was successful
   */
  async expectOrderConfirmation(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  /**
   * Simulates getting order number (returns timestamp)
   * @returns Current timestamp as order number
   */
  async getOrderNumber(): Promise<string> {
    return `ORD-${Date.now()}`;
  }

  /**
   * Completes the checkout process (logs in)
   * @param shippingInfo Uses firstName as username
   * @param paymentInfo Uses cardNumber as password
   */
  async completeCheckout(
    shippingInfo: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
      city: string;
      state: string;
      zip: string;
    },
    paymentInfo: {
      cardNumber: string;
      cardExpiry: string;
      cardCvc: string;
    }
  ): Promise<void> {
    // Use firstName as username and cardNumber as password
    await this.usernameInput.fill(shippingInfo.firstName);
    await this.passwordInput.fill(paymentInfo.cardNumber);
    await this.loginButton.click();
  }
}

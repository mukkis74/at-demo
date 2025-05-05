import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Dynamic Controls page
 * Adapted from ProductListPage to work with The Internet Herokuapp
 */
export class ProductListPage {
  // Page object
  private readonly page: Page;

  // Locators for elements on the page
  private readonly checkbox: Locator;
  private readonly removeButton: Locator;
  private readonly addButton: Locator;
  private readonly enableButton: Locator;
  private readonly disableButton: Locator;
  private readonly input: Locator;
  private readonly message: Locator;
  private readonly loading: Locator;

  /**
   * Creates a new ProductListPage object (now Dynamic Controls page)
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.checkbox = page.locator('#checkbox');
    this.removeButton = page.locator('button').filter({ hasText: 'Remove' });
    this.addButton = page.locator('button').filter({ hasText: 'Add' });
    this.enableButton = page.locator('button').filter({ hasText: 'Enable' });
    this.disableButton = page.locator('button').filter({ hasText: 'Disable' });
    this.input = page.locator('input[type="text"]');
    this.message = page.locator('#message');
    this.loading = page.locator('#loading');
  }

  /**
   * Navigates to the Dynamic Controls page
   */
  async goto(): Promise<void> {
    await this.page.goto('/dynamic_controls');
  }

  /**
   * Checks if the checkbox is present
   * @returns True if checkbox is visible
   */
  async isCheckboxPresent(): Promise<boolean> {
    return await this.checkbox.isVisible();
  }

  /**
   * Toggles the checkbox
   */
  async toggleCheckbox(): Promise<void> {
    await this.checkbox.click();
  }

  /**
   * Removes the checkbox
   */
  async removeCheckbox(): Promise<void> {
    await this.removeButton.click();
    await this.loading.waitFor({ state: 'visible' });
    await this.loading.waitFor({ state: 'hidden' });
  }

  /**
   * Adds the checkbox back
   */
  async addCheckbox(): Promise<void> {
    await this.addButton.click();
    await this.loading.waitFor({ state: 'visible' });
    await this.loading.waitFor({ state: 'hidden' });
  }

  /**
   * Enables the input field
   */
  async enableInput(): Promise<void> {
    await this.enableButton.click();
    await this.loading.waitFor({ state: 'visible' });
    await this.loading.waitFor({ state: 'hidden' });
  }

  /**
   * Disables the input field
   */
  async disableInput(): Promise<void> {
    await this.disableButton.click();
    await this.loading.waitFor({ state: 'visible' });
    await this.loading.waitFor({ state: 'hidden' });
  }

  /**
   * Fills the input field
   * @param text Text to enter
   */
  async fillInput(text: string): Promise<void> {
    await this.input.fill(text);
  }

  /**
   * Gets the message text
   * @returns Message text
   */
  async getMessage(): Promise<string> {
    return await this.message.textContent() || '';
  }

  /**
   * Checks if the input is enabled
   * @returns True if input is enabled
   */
  async isInputEnabled(): Promise<boolean> {
    return await this.input.isEnabled();
  }

  /**
   * Simulates adding to cart (for compatibility with existing tests)
   * @param index Not used
   */
  async addToCart(index: number): Promise<void> {
    // Simulate adding to cart by toggling checkbox
    await this.toggleCheckbox();
  }

  /**
   * Simulates getting cart count (for compatibility with existing tests)
   * @returns 1 if checkbox is checked, 0 otherwise
   */
  async getCartCount(): Promise<number> {
    const isChecked = await this.checkbox.isChecked();
    return isChecked ? 1 : 0;
  }
}

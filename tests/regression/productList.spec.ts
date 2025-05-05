import { test, expect } from '@playwright/test';
import { ProductListPage } from '../../src/pages/ProductListPage';

// Regression test suite for dynamic controls functionality
test.describe('Dynamic Controls Functionality @regression', () => {
  // Setup for each test
  test.beforeEach(async ({ page }) => {
    const productListPage = new ProductListPage(page);
    await productListPage.goto();
  });

  // Test for checkbox removal
  test('should remove and add checkbox', async ({ page }) => {
    const productListPage = new ProductListPage(page);

    // Verify checkbox is initially present
    expect(await productListPage.isCheckboxPresent()).toBe(true);

    // Remove checkbox
    await productListPage.removeCheckbox();

    // Verify checkbox is removed
    expect(await productListPage.isCheckboxPresent()).toBe(false);

    // Add checkbox back
    await productListPage.addCheckbox();

    // Verify checkbox is added back
    expect(await productListPage.isCheckboxPresent()).toBe(true);
  });

  // Test for enabling and disabling input
  test('should enable and disable input', async ({ page }) => {
    const productListPage = new ProductListPage(page);

    // Verify input is initially disabled
    expect(await productListPage.isInputEnabled()).toBe(false);

    // Enable input
    await productListPage.enableInput();

    // Verify input is enabled
    expect(await productListPage.isInputEnabled()).toBe(true);

    // Fill input
    await productListPage.fillInput('Hello World');

    // Disable input
    await productListPage.disableInput();

    // Verify input is disabled again
    expect(await productListPage.isInputEnabled()).toBe(false);
  });

  // Test for message display
  test('should display appropriate messages', async ({ page }) => {
    const productListPage = new ProductListPage(page);

    // Remove checkbox and check message
    await productListPage.removeCheckbox();
    const removeMessage = await productListPage.getMessage();
    expect(removeMessage).toContain('gone');

    // Add checkbox back and check message
    await productListPage.addCheckbox();
    const addMessage = await productListPage.getMessage();
    expect(addMessage).toContain('back');
  });

  // Test for checkbox toggle (simulating add to cart)
  test('should toggle checkbox state', async ({ page }) => {
    const productListPage = new ProductListPage(page);

    // Initial cart count should be 0 (checkbox unchecked)
    expect(await productListPage.getCartCount()).toBe(0);

    // Add to cart (toggle checkbox)
    await productListPage.addToCart(0);

    // Cart count should be 1 (checkbox checked)
    expect(await productListPage.getCartCount()).toBe(1);

    // Add to cart again (toggle checkbox again)
    await productListPage.addToCart(0);

    // Cart count should be 0 again (checkbox unchecked)
    expect(await productListPage.getCartCount()).toBe(0);
  });
});

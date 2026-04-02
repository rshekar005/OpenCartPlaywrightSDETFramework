/**
 * Test Case: Add Product to Cart
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search box
 * 3. Click the search button
 * 4. Verify the product appears in the search results
 * 5. Select the product
 * 6. Set quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */

import { test, expect } from '../fixtures/fixtures';

test('Add product to cart test @master @regression', async ({ pages, config }) => {
  const { home, searchResults, product } = pages;
  await home.enterProductName(config.productName);
  await home.clickSearchButton();

  expect(await searchResults.isSearchResultsPageExists()).toBeTruthy();
  const productName = config.productName;
  expect(await searchResults.isProductExist(productName)).toBeTruthy();

  if (await searchResults.isProductExist(productName)) {
    await searchResults.selectProduct(productName);
    await product.setQuantity(config.productQuantity);
    await product.addToCart();
    expect(await product.isConfirmationMessageVisible()).toBeTruthy();
  }
});

/**
 * Test Case: Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify if the product is displayed in the search results
 */

import { test, expect } from '../fixtures/fixtures';

test('Product search test @master @regression', async ({ pages, config }) => {
  const { home, searchResults } = pages;
  const productName = config.productName;

  await home.enterProductName(productName);
  await home.clickSearchButton();

  expect(await searchResults.isSearchResultsPageExists()).toBeTruthy();
  const isProductFound = await searchResults.isProductExist(productName);
  expect(isProductFound).toBeTruthy();
});

import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductPage } from '../pages/ProductPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';

type Pages = {
  home: HomePage;
  login: LoginPage;
  register: RegisterPage;
  product: ProductPage;
  searchResults: SearchResultsPage;
  shoppingCart: ShoppingCartPage;
  checkout: CheckoutPage;
  myAccount: MyAccountPage;
  logout: LogoutPage;
};

export const test = base.extend<{ pages: Pages; config: TestConfig }>({
  config: async ({}, use) => {
    await use(new TestConfig());
  },

  pages: async ({ page, config }, use) => {
    // Navigate to base URL once per test
    await page.goto(config.appUrl);

    const pages: Pages = {
      home: new HomePage(page),
      login: new LoginPage(page),
      register: new RegisterPage(page),
      product: new ProductPage(page),
      searchResults: new SearchResultsPage(page),
      shoppingCart: new ShoppingCartPage(page),
      checkout: new CheckoutPage(page),
      myAccount: new MyAccountPage(page),
      logout: new LogoutPage(page),
    };

    await use(pages);
  },
});

export { expect };

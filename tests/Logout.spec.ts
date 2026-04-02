import { test, expect } from '../fixtures/fixtures';

test('Logout from the application @master @regression', async ({ pages, config }) => {
  const { home, login, myAccount, logout } = pages;

  await home.clickMyAccount();
  await home.clickLogin();

  await login.enterEmail(config.email);
  await login.enterPassword(config.password);
  await login.clickLoginBtn();

  expect(await myAccount.myAccountPageExists()).toBe(true);

  await myAccount.clickLogout();

  const boolean = await logout.isLogoutPageDisplayed();
  expect(boolean).toBeTruthy();

  await logout.clickContinue();
});
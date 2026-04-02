import { test, expect } from '../fixtures/fixtures';

test('User login test', { tag: '@login' }, async ({ pages, config }) => {
    const { home, login, myAccount } = pages;
    await home.clickMyAccount();
    await home.clickLogin();
    await login.enterEmail(config.email);
    await login.enterPassword(config.password);
    await login.clickLoginBtn();

    const flag = await myAccount.myAccountPageExists();
    expect(flag).toBeTruthy();
});
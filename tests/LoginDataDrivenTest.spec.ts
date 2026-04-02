import { test, expect } from '../fixtures/fixtures';
import { DataProvider } from '../utils/dataprovider';

const jsonPath = 'testdata/logindata.json';
const jsonData = DataProvider.getTestDataFromJson(jsonPath);

for (const data of jsonData) {
    test(`Login test with ${data.testName} @datadriven`, async ({ pages }) => {
        const { home, login, myAccount } = pages;

        await home.clickMyAccount();
        await home.clickLogin();

        await login.enterEmail(data.email);
        await login.enterPassword(data.password);
        await login.clickLoginBtn();

        if (data.expected.toLowerCase() === 'success') {
            expect(await myAccount.myAccountPageExists()).toBeTruthy();
        } else if (data.expected.toLowerCase() === 'failure') {
            const msg = await login.getLoginError();
            expect(msg).toBe(' Warning: No match for E-Mail Address and/or Password.');
        }
    });
}

// Load CSV test data
const csvPath = 'testdata/logindata.csv';
const csvTestData = DataProvider.getTestDataFromCSV(csvPath);

for (const data of csvTestData) {
    test(`Login Test with CSV Data: ${data.testName} @datadriven`, async ({ pages, config }) => {
        const { home, login, myAccount } = pages;

        await home.clickMyAccount();
        await home.clickLogin();

        await login.enterEmail(config.email);
        await login.enterPassword(config.password);
        await login.clickLoginBtn();

        if (data.expected.toLowerCase() === 'success') {
            const isLoggedIn = await myAccount.myAccountPageExists();
            expect(isLoggedIn).toBeTruthy();
        } else {
            const errorMessage = await login.getLoginError();
            expect(errorMessage).toContain('Warning: No match');
        }
    });
}
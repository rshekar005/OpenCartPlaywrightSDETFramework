/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 * 
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */

import { test, expect } from '../fixtures/fixtures';
import { RandomDataUtil } from '../utils/randomDataGenerator';

test('execute end-to-end test flow @end-to-end', async ({ pages, config }) => {
    // Step 1: Register a new account and capture the generated email
    const registeredEmail: string = await performRegistration(pages);

    // Step 2: Logout after successful registration
    await performLogout(pages);

    // Step 3: Login with the registered email
    await performLogin(pages, registeredEmail);

    // Step 4: Search for a product and add it to the cart
    await addProductToCart(pages, config);

    // Step 5: Verify the contents of the shopping cart
    await verifyShoppingCart(pages, config);
});

// Function to register a new user account
async function performRegistration({ home, register, myAccount }: any): Promise<string> {
    await home.clickMyAccount();
    await home.clickRegister();

    // Fill in random user details
    await register.enterFirstName(RandomDataUtil.getFirstName());
    await register.enterLastName(RandomDataUtil.getLastName());

    const email: string = RandomDataUtil.getEmail();
    await register.enterEmail(email);
    await register.enterTelePhone(RandomDataUtil.getPhoneNumber());

    await register.enterPassword('test123');
    await register.enterConfirmPassword('test123');

    await register.selectPrivacy();
    await register.clickContinueButton();

    const confirmationMsg = await register.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return email;
}

// Function to log out the current user
async function performLogout({ myAccount, logout }: any) {
    await myAccount.clickLogout();
    const homePage = await logout.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);
}

// Function to log in using the registered email
async function performLogin({ home, login, myAccount }: any, email: string) {
    await home.clickMyAccount();
    await home.clickLogin();

    await login.enterEmail(email);
    await login.enterPassword('test123');
    await login.clickLoginBtn();

    expect(await myAccount.myAccountPageExists()).toBeTruthy();
}

// Function to search for a product and add it to cart
async function addProductToCart({ home, searchResults, product }: any, config: any) {
    const productName: string = config.productName;
    const productQuantity: string = config.productQuantity;

    await home.enterProductName(productName);
    await home.clickSearchButton();

    expect(await searchResults.isSearchResultsPageExists()).toBeTruthy();
    expect(await searchResults.isProductExist(productName)).toBeTruthy();

    await searchResults.selectProduct(productName);
    await product.setQuantity(productQuantity);
    await product.addToCart();

    // Confirm product was added
    expect(await product.isConfirmationMessageVisible()).toBe(true);
}

// Function to verify the shopping cart details
async function verifyShoppingCart({ product }: any, config: any) {
    // Navigate to shopping cart from product page
    await product.clickItemsToNavigateToCart();
    const shoppingCartPage: any = await product.clickViewCart();

    expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);
}

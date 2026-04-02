import { test, expect } from '../fixtures/fixtures';
import { RandomDataUtil } from '../utils/randomDataGenerator';

test('Valid Registration test', { tag: '@registration' }, async ({ pages }) => {
  const { home, register } = pages;

  await home.clickMyAccount();
  await home.clickRegister();

  await register.enterFirstName(RandomDataUtil.getFirstName());
  await register.enterLastName(RandomDataUtil.getLastName());
  await register.enterEmail(RandomDataUtil.getEmail());
  await register.enterTelePhone(RandomDataUtil.getPhoneNumber());

  const password = RandomDataUtil.getRandomPassword();
  await register.enterPassword(password);
  await register.enterConfirmPassword(password);
  await register.selectNewsLetter();
  await register.selectPrivacy();
  await register.clickContinueButton();

  const confirmMessage = await register.getConfirmationMsg();
  expect(confirmMessage).toBe('Your Account Has Been Created!');
});
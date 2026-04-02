import {Page,Locator, expect} from "@playwright/test"
import { HomePage } from "./HomePage";

export class RegisterPage{
    private readonly page:Page;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly telephone:Locator;
    private readonly email:Locator;
    private readonly password:Locator;
    private readonly confirmPassword:Locator;
    private readonly newsletter:Locator;
    private readonly agreePolicy:Locator;
    private readonly continueButton:Locator;
    private readonly confirmMessage:Locator;

    constructor(page:Page){
        this.page=page;
        this.firstName=this.page.getByRole('textbox', { name: 'First Name' });
        this.lastName=this.page.getByRole('textbox', { name: 'Last Name' });
        this.email=this.page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone=this.page.getByRole('textbox', { name: 'Telephone' });
        this.password=this.page.getByLabel('Password', { exact: true });
        this.confirmPassword=this.page.getByRole('textbox', { name: 'Password Confirm' });
        this.newsletter=this.page.getByLabel('Yes');
        this.agreePolicy=this.page.locator('[name="agree"]')
        this.continueButton=this.page.locator('input[type="submit"]');
        this.confirmMessage=this.page.locator('h1:has-text("Your Account Has Been Created!")')
    }


    async enterFirstName(firstname:string):Promise<void>{
        await this.firstName.fill(firstname);
    }

    async enterLastName(lastname:string):Promise<void>{
        await this.lastName.fill(lastname);
    }

    async enterEmail(email:string):Promise<void>{
        await this.email.fill(email);
    }

    async enterTelePhone(telephone:string):Promise<void>{
        await this.telephone.fill(telephone);
    }

    async enterPassword(password:string):Promise<void>{
        await this.password.fill(password);
    }

    async enterConfirmPassword(confirmPassword:string):Promise<void>{
        await this.confirmPassword.fill(confirmPassword);
    }

    async selectNewsLetter():Promise<void>{
        await this.newsletter.click();
    }

    async selectPrivacy():Promise<HomePage>{
        await this.agreePolicy.click();
        return new HomePage(this.page);
    }

    async clickContinueButton():Promise<void>{
        await this.continueButton.click();
    }

    async getConfirmationMsg():Promise<string>{
        return await this.confirmMessage.textContent()??'';
    }

    async completeRegistration(userData:{
        firstName:string,
        lastName:string,
        email:string,
        telephone:string,
        password:string,
        confirmPassword:string;
    }):Promise<void>{
        this.enterFirstName(userData.firstName);
        this.enterLastName(userData.lastName);
        this.enterEmail(userData.email);
        this.enterTelePhone(userData.telephone);
        this.enterPassword(userData.password);
        this.enterConfirmPassword(userData.confirmPassword);
        this.selectNewsLetter();
        this.selectPrivacy();
        this.clickContinueButton();
        await expect(this.confirmMessage).toBeVisible();

    }

}
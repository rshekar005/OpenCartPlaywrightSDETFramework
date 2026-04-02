import {test, expect, Page, Locator} from "@playwright/test"
import { HomePage } from "./HomePage";

export class LogoutPage{
    private readonly page:Page;
    private readonly logoutHeader:Locator;
    private readonly continueButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.logoutHeader=this.page.getByRole('heading', { name: 'Account Logout' });
        this.continueButton=this.page.getByRole('link', { name: 'Continue' });
    }

    async isLogoutPageDisplayed():Promise<boolean>{
        try{
            const logoutPageDisplayed= await this.logoutHeader.isVisible();
            return logoutPageDisplayed;
        }catch(error){
            console.log("Logout page is displayed", error)
            return false;
        }
    }

    async clickContinue():Promise<HomePage>{
        await this.continueButton.click();
        return new HomePage(this.page);
    }
}
import {test, Page, expect, Locator} from "@playwright/test"
import { LogoutPage } from "./LogoutPage";

export class MyAccountPage{

    private readonly page:Page;
    private readonly myAccountHeader:Locator;
    private readonly logout:Locator;

    constructor(page:Page){
        this.page=page;
        this.myAccountHeader=this.page.locator('h2:has-text("My Account")');
        this.logout=this.page.locator("text='Logout'").nth(1);
    }

    async myAccountPageExists():Promise<boolean>{
        try{
            const myaccountVisible=await this.myAccountHeader.isVisible();
            return myaccountVisible;
        }catch(error){
            console.log("My Account Page is not displayed", error)
            return false;
        }
    }

    async clickLogout():Promise<LogoutPage>{
        await this.logout.click();
        return new LogoutPage(this.page)
    }

    

}
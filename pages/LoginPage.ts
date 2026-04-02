import {Page,Locator, expect} from "@playwright/test"
export class LoginPage{
    private readonly page:Page;
    private readonly email:Locator;
    private readonly password:Locator;
    private readonly loginbtn:Locator;
    private readonly forgotPassword:Locator;
    private readonly loginFailedErrorMsg:Locator;

    constructor(page:Page){
        this.page=page;
        this.email=this.page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password=this.page.getByRole('textbox', { name: 'Password' });
        this.loginbtn=this.page.locator('input.btn.btn-primary');
        this.forgotPassword=this.page.locator('a').filter({ hasText: 'Forgotten Password' }).first();
        this.loginFailedErrorMsg=this.page.getByText('Warning: No match for E-Mail Address and/or Password.', { exact: true });
    }

    async enterEmail(email:string){
        await this.email.fill(email);
    }

    async enterPassword(password:string){
        await this.password.fill(password);
    }

    async clickLoginBtn(){
        await this.loginbtn.click();
    }

    async getLoginError():Promise<string>{
        const msg=await this.loginFailedErrorMsg.textContent();
        return msg??'';
    }

}
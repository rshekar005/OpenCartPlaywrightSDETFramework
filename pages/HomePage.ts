import {Locator, Page} from "@playwright/test"

export class HomePage{

   private readonly page:Page;
   private readonly myaccountLink:Locator;
   private readonly register:Locator;
   private readonly login:Locator;
   private readonly search:Locator;
   private readonly buttonSearch:Locator;

   constructor(page:Page){
    this.page=page;
    this.myaccountLink = this.page.locator("span:has-text('My Account')")
    this.register=this.page.locator("a:has-text('Register')").first();
    this.login=this.page.locator("a:has-text('Login')").first();
    this.search=this.page.getByRole('textbox', { name: 'Search' });
    this.buttonSearch=this.page.locator('button.btn.btn-default.btn-lg');
   }

   async isHomePageExists():Promise<boolean>{
        let title=await this.page.title();
       if(title){
        return true
       }
        return false;
   }

   async clickMyAccount(){
    try{
        await this.myaccountLink.click()
    }catch(error){
        console.log("Execption occured while click on account ", error)
    }
    }

    async clickLogin(){
        try{
             await this.login.click();
        }catch(error){
            console.log(`Exception occured while clicking on 'Login ': ${error}`)
        }
       
    }

    async clickRegister(){
        try{
             await this.register.click();
        }catch(error){
            console.log(`Exception occured while clicking on 'Login ': ${error}`)
        }
    }

    async enterProductName(productName:string){
        await this.search.fill(productName);
    }

    async clickSearchButton(){
        await this.buttonSearch.click();
    }





}
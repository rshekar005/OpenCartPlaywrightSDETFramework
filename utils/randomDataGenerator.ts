import {faker} from "@faker-js/faker"

export class RandomDataUtil{

    static getFirstName(){
        return faker.person.firstName();
    }

    static getLastName(){
        return faker.person.lastName();
    }

    static getFullName(){
        return this.getFirstName+" "+this.getLastName();
    }

    static getEmail(){
        return faker.internet.email();
    }

    static getPhoneNumber(){
        return faker.phone.number();
    }

    static getUserName(){
        return faker.internet.username();
    }

    static getCountry(){
        return faker.location.country();
    }

    static getRandomPassword(){
        return faker.internet.password();
    }

    static getRandomState(){
        return faker.location.state();
    }

}
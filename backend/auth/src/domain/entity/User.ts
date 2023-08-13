import { Email } from "./Email";
import { Password } from "./Password";
import { PasswordFactory } from "./PasswordFactory";

// Entity e Agregate Root
export class User {

    private constructor(public email: Email, public password: Password, readonly passwordType: string){
    }

    static create(email: string, password: string, passwordType: string) {
        return new User(new Email(email), PasswordFactory.create(password, passwordType), passwordType)
    }

    static restore(email: string, hash: string, salt: string, passwordType: string) {
        return new User(new Email(email), PasswordFactory.restore(hash, salt, passwordType), passwordType)
    }

    validatePassword(password: string) {
        return this.password.validate(password)
    }
}
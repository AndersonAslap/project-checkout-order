import { Password } from "./Password"


export class PlainPassword implements Password {

    private constructor(readonly value: string, readonly salt: string){
    }

    static create(password: string) {
        return new PlainPassword(password, "")
    }

    static restore(password: string, salt: string) {  
        return new PlainPassword(password, salt)
    }

    validate(password: string) {
        return password === this.value
    }
}
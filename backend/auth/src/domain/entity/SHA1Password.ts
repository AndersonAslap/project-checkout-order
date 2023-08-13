import { createHash } from "crypto"
import { Password } from "./Password"

export class SHA1Password implements Password {

    private constructor(readonly value: string, readonly salt: string){
    }

    static create(password: string) {
        const value = createHash("sha1").update(password).digest("hex")
        return new SHA1Password(value, "")
    }

    static restore(password: string, salt: string) {  
        return new SHA1Password(password, salt)
    }

    validate(password: string) {
        const value = createHash("sha1").update(password).digest("hex")
        return value === this.value
    }
}
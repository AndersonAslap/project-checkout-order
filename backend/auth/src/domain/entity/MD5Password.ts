import { createHash } from "crypto"
import { Password } from "./Password"

export class MD5Password implements Password {

    private constructor(readonly value: string, readonly salt: string){
    }

    static create(password: string) {
        const value = createHash("md5").update(password).digest("hex")
        return new MD5Password(value, "")
    }

    static restore(password: string, salt: string) {  
        return new MD5Password(password, salt)
    }

    validate(password: string) {
        const value = createHash("md5").update(password).digest("hex")
        return value === this.value
    }
}
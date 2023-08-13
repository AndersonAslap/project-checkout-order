import { sign } from "jsonwebtoken";
import { User } from "./User";

// Domain Service
export class TokenGenerator {
    EXPIRES_IN = 1000000

    constructor(readonly key: string){
    }

    sing(user: User, date: Date) {
        const payload = {
            email: user.email.value, 
            iat: date.getTime(), 
            expiresIn: this.EXPIRES_IN
        }
        return sign(payload, this.key)
    }
}
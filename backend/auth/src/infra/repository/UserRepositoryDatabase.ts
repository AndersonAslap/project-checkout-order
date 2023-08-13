import { UserRepository } from "../../application/repository/UserRepository";
import { User } from "../../domain/entity/User";
import { DatabaseConnection } from "../database/DatabaseConnection";

export class UserRepositoryDatabase implements UserRepository {
    
    constructor(readonly connection: DatabaseConnection){
    }

    async save(user: User): Promise<void> {
        await this.connection.query("insert into users(email, password, password_type, salt) values ($1, $2, $3, $4)", [user.email.value, user.password.value, user.passwordType, user.password.salt])
    }

    async get(email: string): Promise<User> {
        const [userData] = await this.connection.query("select * from users where email = $1", [email])
        return User.restore(userData.email, userData.password, userData.salt, userData.password_type)
    }

    async clear(): Promise<void> {
        await this.connection.query("delete from users", [])
    }
}
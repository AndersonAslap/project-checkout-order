import { User } from "../../domain/entity/User";

export interface UserRepository {
    save(user: User): Promise<void>
    get(email: string): Promise<User>
    clear(): Promise<void>
}
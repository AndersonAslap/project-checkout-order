import { DatabaseConnection } from "../database/DatabaseConnection";
import { RepositoryFactory } from "../../application/factory/RepositoryFactory";
import { UserRepository } from "../../application/repository/UserRepository";
import { UserRepositoryDatabase } from "../repository/UserRepositoryDatabase";

export class DatabaseRepositoryFactory implements RepositoryFactory {

    constructor(readonly connection: DatabaseConnection){
    }

    createUserRepository(): UserRepository {
        return new UserRepositoryDatabase(this.connection)
    }
}
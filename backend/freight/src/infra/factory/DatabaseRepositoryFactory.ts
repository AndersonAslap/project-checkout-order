import { RepositoryFactory } from "../../application/factory/RepositoryFactory"
import { ZipCodeRepository } from "../../application/repository/ZipCodeRepository";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { ZipCodeRepositoryDatabase } from "../repository/ZipCodeRepositoryDatabase";

export class DatabaseRepositoryFactory implements RepositoryFactory {

    constructor(readonly connection: DatabaseConnection){
    }

    createZipCodeRepository(): ZipCodeRepository {
        return new ZipCodeRepositoryDatabase(this.connection)
    }
}
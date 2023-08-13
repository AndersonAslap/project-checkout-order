import { ZipCodeRepository } from "../repository/ZipCodeRepository";

export interface RepositoryFactory {
    createZipCodeRepository(): ZipCodeRepository
}
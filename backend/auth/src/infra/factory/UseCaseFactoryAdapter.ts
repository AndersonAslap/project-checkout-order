import { RepositoryFactory } from "../../application/factory/RepositoryFactory";
import { UseCaseFactory } from "./UseCaseFactory";
import { SingUp } from "../../application/usecase/SingUp";

export class UseCaseFactoryAdapter implements UseCaseFactory {

    constructor(readonly repositoryFactory: RepositoryFactory) {}

    createSingUp(): SingUp {
        return new SingUp(this.repositoryFactory)
    }
}
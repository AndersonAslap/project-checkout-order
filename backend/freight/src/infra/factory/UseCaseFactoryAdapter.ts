import { UseCaseFactory } from "./UseCaseFactory";
import { SimulateFreight } from "../../application/usecase/SimulateFreight";
import { RepositoryFactory } from "../../application/factory/RepositoryFactory";

export class UseCaseFactoryAdapter implements UseCaseFactory {

    constructor(readonly repositoryFactory: RepositoryFactory) {
    }

    createSimulateFreight(): SimulateFreight {
        return new SimulateFreight(this.repositoryFactory)
    }
}
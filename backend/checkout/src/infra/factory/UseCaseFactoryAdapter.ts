import { Checkout } from "../../application/usecase/Checkout";
import { RepositoryFactory } from "../../application/factory/RepositoryFactory";
import { UseCaseFactory } from "./UseCaseFactory";
import { GatewayFactory } from "../../application/factory/GatewayFactory";

export class UseCaseFactoryAdapter implements UseCaseFactory {

    constructor(readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory) {}

    createCheckout(): Checkout {
        return new Checkout(this.repositoryFactory, this.gatewayFactory)
    }
}
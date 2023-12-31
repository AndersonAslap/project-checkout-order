import { OrderRepository } from "../repository/OrderRepository";
import { OrderRepositoryDatabase } from "../../infra/repository/OrderRepositoryDatabase";
import { RepositoryFactory } from "../factory/RepositoryFactory";

export class GetOrder {
    orderRepository: OrderRepository

    constructor (repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository()
    }

    async execute(idOrder: string): Promise<Output> {
        const orderData = await this.orderRepository.get(idOrder)
        return orderData
    }
}

type Output = {
    total: string,
    code: string
}
import { Presenter } from "../../infra/presenter/Presenter";
import { ProductRepository } from "../repository/ProductRepository";
import { RepositoryFactory } from "../factory/RepositoryFactory";

export class GetProduct {

    productRepository: ProductRepository

    constructor(readonly repositoryFactory: RepositoryFactory, readonly presenter: Presenter){
        this.productRepository = this.repositoryFactory.createProductRepository()
    }

    async execute() : Promise<any> {
        const output: Output[] = []
        const products = await this.productRepository.list()
        for (let product of products) {
            output.push({
                id: product.id,
                description: product.description,
                price: product.price
            })
        }
        return this.presenter.present(output)
    }
}

type Output = {
    id: number,
    description: string,
    price: number
}
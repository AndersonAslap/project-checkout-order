import { RepositoryFactory } from "../factory/RepositoryFactory";
import { ProductRepository } from "../repository/ProductRepository";

export class GetProductById {
    productRepository: ProductRepository

    constructor(repositoryFactory: RepositoryFactory){
        this.productRepository = repositoryFactory.createProductRepository()
    }

    async execute(id: number): Promise<Output> {
        const product = await this.productRepository.getById(id)
        return Object.assign(product, {
            volume: product.getVolume(),
            density: product.getDensity()
        })
    }
}

type Output = {
    id: number,
    description: string,
    price: number,
    width: number,
    height: number,
    length: number,
    weight: number,
    volume: number,
    density: number
}
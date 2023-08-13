import { ProductRepository } from '../../application/repository/ProductRepository'
import { Product } from '../../domain/entity/Product'
import { DatabaseConnection } from '../database/DatabaseConnection'

// interface adapters
export class ProductRepositoryDatabase implements ProductRepository {

    constructor(readonly connection: DatabaseConnection){
    }

    async getById (idProduct: number): Promise<Product> {
        const [productData] = await this.connection.query('select * from products where id = $1', [idProduct])
        return new Product(productData.id, productData.description, parseFloat(productData.price), productData.width, productData.height, productData.length, parseFloat(productData.weight))
    }

    async list(): Promise<Product[]> {
        const products: Product[] = []
        const productData = await this.connection.query('select * from products', [])
        for (const product of productData) {
            products.push(
                new Product(product.id, product.description, parseFloat(product.price), product.width, product.height, product.length, parseFloat(product.weight))
            )
        }
        return products
    }
}
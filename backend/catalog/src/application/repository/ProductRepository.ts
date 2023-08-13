import { Product } from "../../domain/entity/Product";

export interface ProductRepository {
    getById(id: number): Promise<Product>
    list(): Promise<Product[]>
}
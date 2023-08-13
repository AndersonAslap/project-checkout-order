import { Product } from "../../domain/entity/Product";

export interface CatalogGateway {
    getProduct(id: number): Promise<Product>
}
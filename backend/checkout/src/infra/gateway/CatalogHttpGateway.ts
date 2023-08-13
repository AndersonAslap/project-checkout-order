import { CatalogGateway } from "../../application/gateway/CatalogGateway";
import { Product } from "../../domain/entity/Product";
import { HttpClient } from "../http/HttpClient";

export class CatalogHttpGateway implements CatalogGateway {

    constructor(readonly httpClient: HttpClient){
    }
    
    async getProduct(id: number): Promise<Product> {
        const output = await this.httpClient.get(`http://localhost:3001/products/${id}`)
        const product = new Product(output.id, output.description, output.price, output.width, output.height, output.length, output.weight, output.density, output.volume)
        return product
    }
}
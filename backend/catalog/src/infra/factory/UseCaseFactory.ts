import { GetProduct } from "../../application/usecase/GetProduct";
import { GetProductById } from "../../application/usecase/GetProductById";

export interface UseCaseFactory {
    createGetProduct(type: string): GetProduct
    createGetProductById(): GetProductById
}
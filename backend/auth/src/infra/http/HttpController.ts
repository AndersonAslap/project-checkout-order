import { HttpServer } from "./HttpServer";
import { UseCaseFactory } from "../factory/UseCaseFactory";

export class HttpController {

    constructor(httpServer: HttpServer, useCaseFactory: UseCaseFactory) {
        httpServer.on("get", "/products", async function(params: any, body: any, headers: any){
            const contentType = headers["content-type"];
            const getProduct = useCaseFactory.createGetProduct(contentType)
            const output = await getProduct.execute()
            return output
        })

        httpServer.on("get", "/products/:id", async function(params: any, body: any, headers: any){
            const getProductById = useCaseFactory.createGetProductById()
            const output = await getProductById.execute(params.id)
            return output
        })
    }
}
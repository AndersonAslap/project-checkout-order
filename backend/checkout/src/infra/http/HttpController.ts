import { HttpServer } from "./HttpServer";
import { UseCaseFactory } from "../factory/UseCaseFactory";

export class HttpController {

    constructor(httpServer: HttpServer, useCaseFactory: UseCaseFactory) {
        httpServer.on("post", "/checkout", async function(params: any, body: any){
            const checkout = useCaseFactory.createCheckout()
            const output = await checkout.execute(body)
            return output
        })
    }
}
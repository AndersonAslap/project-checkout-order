import { CsvPresenter } from "../presenter/CsvPresenter";
import { GetProduct } from "../../application/usecase/GetProduct";
import { JsonPresenter } from "../presenter/JsonPresenter";
import { RepositoryFactory } from "../../application/factory/RepositoryFactory";
import { UseCaseFactory } from "./UseCaseFactory";
import { GetProductById } from "../../application/usecase/GetProductById";

export class UseCaseFactoryAdapter implements UseCaseFactory {

    constructor(readonly repositoryFactory: RepositoryFactory) {}

    createGetProduct(type: string): GetProduct {
        let presenter;
        if (type === "application/json") {
            presenter = new JsonPresenter()
        }
        if (type === "text/csv") {
            presenter = new CsvPresenter()
        }
        if (!presenter) throw new Error("Invalid type")
        return new GetProduct(this.repositoryFactory, presenter)
    }

    createGetProductById(): GetProductById {
        return new GetProductById(this.repositoryFactory)
    }
}
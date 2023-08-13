import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory"
import { GetProduct } from "../../src/application/usecase/GetProduct"
import { JsonPresenter } from "../../src/infra/presenter/JsonPresenter"
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter"

// main
test("Deve listar os produtos", async function() {
    // framework and driver
    const connection = new PgPromiseAdapter()
    await connection.connect()
    // interface adapter
    const repositoryFactory = new DatabaseRepositoryFactory(connection)
    // use case / application
    const presenter = new JsonPresenter()
    const getProducts = new GetProduct(repositoryFactory, presenter)
    const output = await getProducts.execute()
    expect(output).toHaveLength(6)
    await connection.close()
})
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory"
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter"
import { GetProductById } from "../../src/application/usecase/GetProductById"

// main
test("Deve retornar o produto pelo id", async function() {
    // framework and driver
    const connection = new PgPromiseAdapter()
    await connection.connect()
    // interface adapter
    const repositoryFactory = new DatabaseRepositoryFactory(connection)
    // use case / application
    const getProductById = new GetProductById(repositoryFactory)
    const output = await getProductById.execute(1)
    expect(output.id).toBe(1)
    expect(output.description).toBe('product - 1')
    expect(output.price).toBe(100)
    expect(output.width).toBe(10)
    expect(output.height).toBe(10)
    await connection.close()
})
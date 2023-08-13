import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection"
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory"
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter"
import { RepositoryFactory } from "../../src/application/factory/RepositoryFactory"
import { ValidateCoupon } from "../../src/application/usecase/ValidateCoupon"

let repositoryFactory: RepositoryFactory
let validateCoupon: ValidateCoupon
let connection: DatabaseConnection

beforeEach(async () => {
    connection = new PgPromiseAdapter()
    await connection.connect()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
    validateCoupon = new ValidateCoupon(repositoryFactory)
})

test("Deve validar o cupon de desconto é válido", async function() {
    const input = "VALE20"
    const output = await validateCoupon.execute(input)
    expect(output.isValid).toBeTruthy()
})

test("Deve validar o cupon de desconto é inválido", async function() {
    const input = "VALE10"
    const output = await validateCoupon.execute(input)
    expect(output.isValid).toBe(false)
})

afterEach(async () => {
    await connection.close()
})
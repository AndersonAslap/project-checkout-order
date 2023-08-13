import { SimulateFreight } from "../../src/application/usecase/SimulateFreight";
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";

test("Deve simular o frete sem o calculo da distância", async function () {
    const input = {
      items: [
        { density:1, volume:1, quantity: 1 },
      ],
      from: "1000",
      to: "1000"
    }
    const connection = new PgPromiseAdapter();
    await connection.connect();
    const repositoryFactory = new DatabaseRepositoryFactory(connection);
    const simulateFreight = new SimulateFreight(repositoryFactory);
    const output = await simulateFreight.execute(input)
    expect(output.freight).toBe(10)
    await connection.close();
})

test("Deve simular o frete com o calculo da distância", async function () {
  const input = {
    items: [
      { density:1, volume:1, quantity: 1 },
    ],
    from: "22060030",
    to: "88015600"
  }
  const connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const simulateFreight = new SimulateFreight(repositoryFactory);
  const output = await simulateFreight.execute(input)
  expect(output.freight).toBe(10)
  await connection.close();
})
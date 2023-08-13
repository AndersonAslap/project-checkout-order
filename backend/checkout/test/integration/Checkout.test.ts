import sinon from 'sinon'
import crypto from 'crypto'
import { Checkout } from '../../src/application/usecase/Checkout';
import { GetOrder } from '../../src/application/usecase/GetOrder';
import { Product } from '../../src/domain/entity/Product';
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';
import { RepositoryFactory } from '../../src/application/factory/RepositoryFactory';
import { PgPromiseAdapter } from '../../src/infra/database/PgPromiseAdapter';
import { DatabaseConnection } from '../../src/infra/database/DatabaseConnection';
import AxiosAdapter from '../../src/infra/http/AxiosAdapter';
import { GatewayHttpFactory } from '../../src/infra/factory/GatewayHttpFactory';
import { CatalogHttpGateway } from '../../src/infra/gateway/CatalogHttpGateway';

let checkout: Checkout;
let getOrder: GetOrder;
let repositoryFactory: RepositoryFactory
let connection: DatabaseConnection

beforeEach(async () => {
    connection = new PgPromiseAdapter()
    await connection.connect()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
    const httpClient = new AxiosAdapter()
    const gatewayFactory = new GatewayHttpFactory(httpClient)
    checkout = new Checkout(repositoryFactory, gatewayFactory)
    getOrder = new GetOrder(repositoryFactory)
})

test('Não deve criar pedido com cpf inválido', async function () {
  const input = {
    cpf: '406.302.170-27',
    items: []
  }
  expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid cpf"))
})

test('Deve fazer um pedido com 3 itens', async function () {
  const input = {
    cpf: '125.080.304-73',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 2 },
    ],
  }
  const output = await checkout.execute(input)
  expect(output.total).toBe(400)
})

test('Deve fazer um pedido com 3 itens com cupom de desconto válido', async function () {
  const input = {
    cpf: '125.080.304-73',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 2 },
    ],
    coupon: 'VALE20',
  }
  const output = await checkout.execute(input)
  expect(output.total).toBe(320)
})

test('Deve fazer um pedido com 3 itens com cupom de desconto expirado', async function () {
  const input = {
    cpf: '125.080.304-73',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 2 },
    ],
    coupon: 'VALE10',
  }
  const output = await checkout.execute(input)
  expect(output.total).toBe(400)
})

test('Não deve fazer um pedido com quantidade negativa de item', async function () {
  const input = {
    cpf: '125.080.304-73',
    items: [{ idProduct: 1, quantity: -1 }],
  }
  await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid quantity"))
})

test('Não deve fazer um pedido com item duplicado', async function () {
  const input = {
    cpf: '125.080.304-73',
    items: [{ idProduct: 1, quantity: 1 }, { idProduct: 1, quantity: 1 }],
  }
  await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Duplicated item"))
})

test('Deve fazer um pedido com 3 itens calculando o frete', async function () {
  const input = {
    cpf: '125.080.304-73',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 2 },
    ],
    from: "88015600",
    to: "22030060"
  }
  const output = await checkout.execute(input)
  expect(output.freight).toBe(400.00000000000006)
  expect(output.total).toBe(800)
})

test('Deve fazer um pedido com 3 itens calculando o frete com preço mínimo', async function () {
  const input = {
    cpf: '125.080.304-73',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 4, quantity: 2 },
    ],
    from: "88015600",
    to: "22030060"
  }
  const output = await checkout.execute(input)
  expect(output.freight).toBe(400.00000000000006)
  expect(output.total).toBe(618)
})


test('Deve fazer um pedido com 1 item com stub', async function () {
  const productRepositoryStub = sinon.stub(CatalogHttpGateway.prototype, "getProduct").resolves(new Product(1,'product - 1',100,10,10,10,10,10,10))
  const input = {
    cpf: '125.080.304-73',
    items: [
      { idProduct: 1, quantity: 1 },
    ],
  }
  const output = await checkout.execute(input)
  expect(output.total).toBe(100)
  productRepositoryStub.restore()
})


test('Deve fazer um pedido, salvando no banco de dados', async function() {
  const idOrder = crypto.randomUUID();
  const input = {
    idOrder,
    cpf: '125.080.304-73',
    items: [
      { idProduct: 1, quantity: 1 },
    ]
  }
  await checkout.execute(input)
  const output = await getOrder.execute(idOrder)
  expect(parseInt(output.total)).toBe(100)
})

test.skip('Deve fazer um pedido, e gerar o código do pedido', async function() {
  const orderRepository = repositoryFactory.createOrderRepository()
  await orderRepository.clear()
  await checkout.execute({
    idOrder: crypto.randomUUID(),
    cpf: '125.080.304-73',
    items: [
      { idProduct: 1, quantity: 1 },
    ]
  })
  const idOrder = crypto.randomUUID()
  await checkout.execute({
    idOrder,
    cpf: '125.080.304-73',
    items: [
      { idProduct: 2, quantity: 1 },
    ]
  })
  const output = await getOrder.execute(idOrder)
  expect(output.code).toBe('202300000002')
})

afterEach(async () => {
  await connection.close()
})
import crypto from 'crypto'
import { Order } from '../../src/domain/entity/Order';
import { Product } from '../../src/domain/entity/Product';
import { Coupon } from '../../src/domain/entity/Coupon';

test("Não deve criar um pedido com cpf inválido", function() {
    const id = crypto.randomUUID();
    const cpf = '125.080.304-72';
    expect(() => new Order(id, cpf)).toThrow(new Error('Invalid cpf'));
})

test("Deve criar um pedido vazio", function() {
    const id = crypto.randomUUID();
    const cpf = '125.080.304-73';
    const order = new Order(id, cpf);
    expect(order.getTotal()).toBe(0)
})

test("Deve criar um pedido com 3 itens", function() {
    const id = crypto.randomUUID();
    const cpf = '125.080.304-73';
    const order = new Order(id, cpf);
    order.addItem(new Product(1,'product - 1',100,10,10,10,10), 1)
    order.addItem(new Product(2,'product - 2',100,10,10,10,10), 1)
    order.addItem(new Product(3,'product - 3',100,10,10,10,10), 3)
    expect(order.items.length).toBe(3)
    expect(order.getTotal()).toBe(500)
})

test("Não deve adicionar item duplicado", function() {
    const id = crypto.randomUUID();
    const cpf = '125.080.304-73';
    const order = new Order(id, cpf);
    order.addItem(new Product(1,'product - 1',100,10,10,10,10), 1)
    expect(() => order.addItem(new Product(1,'product - 1',100,10,10,10,10), 1)).toThrow(new Error('Duplicated item'))
})

test("Deve criar um pedido e gerar um código", function() {
    const id = crypto.randomUUID();
    const cpf = '125.080.304-73';
    const order = new Order(id, cpf, new Date(), 1);
    expect(order.code).toBe("202300000001")
})

test("Deve criar um pedido com 3 itens com desconto", function() {
    const id = crypto.randomUUID();
    const cpf = '125.080.304-73';
    const order = new Order(id, cpf);
    order.addItem(new Product(1,'product - 1',100,10,10,10,10), 1)
    order.addItem(new Product(2,'product - 2',100,10,10,10,10), 1)
    order.addItem(new Product(3,'product - 3',100,10,10,10,10), 3)
    order.addCoupon(new Coupon('VALE20', 20, new Date('2023-10-01T10:00:00')))
    expect(order.items.length).toBe(3)
    expect(order.getTotal()).toBe(400)
})
import { Item } from "../../src/domain/entity/Item"
import { Product } from "../../src/domain/entity/Product"

test("Não deve criar um item com quantidade inválida", function() {
    const product = new Product(1,'product - 1',100,10,10,10,10)
    expect(() => new Item(product.id, product.price, 0))
})
import { Coupon } from "./Coupon"
import { Cpf } from "./Cpf"
import { Item } from "./Item"
import { Product } from "./Product"

export class Order {
    cpf: Cpf
    items: Item[]
    code: string
    freight: number
    coupon?: Coupon 

    constructor(readonly id: string | undefined, cpf: string, readonly date: Date = new Date(), sequency: number = 1){
        this.cpf = new Cpf(cpf)
        this.items = []
        this.freight = 0
        this.code = `${date.getFullYear()}${new String(sequency).padStart(8, '0')}`
    }

    addItem(product: Product, quantity: number) {
        if (this.items.some(item => item.idProduct === product.id)) throw new Error('Duplicated item')
        this.items.push(new Item(product.id, product.price, quantity))
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isValid(this.date)) this.coupon = coupon
    }

    getTotal() {
        let total = 0;
        for (const item of this.items) {
            total += item.getTotal()
        }
        if (this.coupon) {
            total -= this.coupon.calculateDiscount(total)
        }
        total += this.freight
        return total
    }
}
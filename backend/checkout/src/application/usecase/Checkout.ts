import { CouponRepository } from '../repository/CouponRepository'
import { OrderRepository } from '../repository/OrderRepository'
import { Order } from '../../domain/entity/Order'
import { RepositoryFactory } from '../factory/RepositoryFactory'
import { GatewayFactory } from '../factory/GatewayFactory'
import { CatalogGateway } from '../gateway/CatalogGateway'
import { FreightGateway } from '../gateway/FreightGateway'

export class Checkout {
    orderRepository: OrderRepository
    couponRepository: CouponRepository
    catalogGateway: CatalogGateway
    freightGateway: FreightGateway

    constructor(repositoryFactory: RepositoryFactory, gatewayFactory: GatewayFactory){
        this.orderRepository = repositoryFactory.createOrderRepository()
        this.couponRepository = repositoryFactory.createCouponRepository()
        this.catalogGateway = gatewayFactory.createCatalogGateway()
        this.freightGateway = gatewayFactory.createFreightGateway()
    }

    async execute(input: Input) : Promise<Output> {
        const sequency = await this.orderRepository.count()
        const order = new Order(input.idOrder, input.cpf, input.date, sequency + 1)
        const inputFreight: any = {
            from: input.from,
            to: input.to,
            items:[]
        }
        for (const item of input.items) {
            const product = await this.catalogGateway.getProduct(item.idProduct)
            order.addItem(product, item.quantity);
            if (input.from && input.to) {
                inputFreight.items.push({volume: product.volume, density: product.density, quantity: item.quantity})
            }
        }
        if (input.from && input.to) {
            const output = await this.freightGateway.simulateFreight(inputFreight)
            order.freight = output.freight
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.get(input.coupon)
            if (coupon && coupon.isValid(input.date || new Date())) {
                order.addCoupon(coupon)
            }
        }
        await this.orderRepository.save(order)
        return {
            freight: order.freight,
            total: order.getTotal(),
        }
    }
}

type Input = {
    idOrder?: string
    cpf: string 
    items: { idProduct: number, quantity: number }[]
    from?: string 
    to?: string 
    coupon?: string
    email?:string
    date?: Date
}

type Output = {
    total: number
    freight: number
}
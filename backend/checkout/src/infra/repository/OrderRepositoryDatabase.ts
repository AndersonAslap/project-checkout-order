import { OrderRepository } from "../../application/repository/OrderRepository";
import { Order } from '../../domain/entity/Order';
import { DatabaseConnection } from '../database/DatabaseConnection';

export class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection : DatabaseConnection){
    }

    async save(order: Order): Promise<any> {
        await this.connection.query('insert into orders(id, code, cpf, total, freight) values ($1, $2, $3, $4, $5)', [
            order.id,
            order.code,
            order.cpf,
            order.getTotal(),
            order.freight
        ])
    }

    async get(idOrder: string): Promise<any> {
        const [orderData] = await this.connection.query('select * from orders where id = $1', [idOrder])
        return orderData
    }

    async clear(): Promise<void> {
        await this.connection.query('delete from orders', [])
    }

    async count(): Promise<number> {
        const [data] = await this.connection.query('select count(*) from orders', [])
        return data.count
    }
}
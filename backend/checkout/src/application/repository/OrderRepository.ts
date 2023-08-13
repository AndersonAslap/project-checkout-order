import { Order } from "../../domain/entity/Order"

export interface OrderRepository {
    save (order: Order): Promise<void>
    get (uuid: string): Promise<any>
    clear (): Promise<void>
    count (): Promise<number>
}
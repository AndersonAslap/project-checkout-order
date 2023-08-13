import { CouponRepository } from '../../application/repository/CouponRepository'
import { Coupon } from '../../domain/entity/Coupon'
import { DatabaseConnection } from '../database/DatabaseConnection'

export class CouponRepositoryDatabase implements CouponRepository {

    constructor(readonly connection: DatabaseConnection){}

    async get (code: string) : Promise<Coupon> {
        const [couponData,] = await this.connection.query('select * from coupons where code = $1', [code])
        return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date)
    }
}
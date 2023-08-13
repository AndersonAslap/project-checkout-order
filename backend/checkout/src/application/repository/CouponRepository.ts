import { Coupon } from "../../domain/entity/Coupon";

export interface CouponRepository {
    get(code:string) : Promise<Coupon>
}
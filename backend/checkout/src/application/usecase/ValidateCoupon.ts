import { CouponRepository } from "../repository/CouponRepository";
import { RepositoryFactory } from "../factory/RepositoryFactory";

export class ValidateCoupon {
    couponRepository: CouponRepository
    
    constructor (repositoryFactory: RepositoryFactory){
        this.couponRepository = repositoryFactory.createCouponRepository()
    }

    async execute(code: string) : Promise<Output> {
        const output = { isValid: false }
        const coupon = await this.couponRepository.get(code)
        output.isValid = coupon.isValid(new Date())
        return output
    }
}

type Output = {
    isValid: boolean
}

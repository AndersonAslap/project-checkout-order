export class Coupon {
    
    constructor(readonly code: string, readonly percentage: number, readonly expire_date: Date){
    }

    isValid(date: Date) {
        return this.expire_date.getTime() >= date.getTime()
    }

    calculateDiscount(amount: number) {
        return amount * this.percentage / 100
    }
}
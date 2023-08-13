import { Coupon } from "../../src/domain/entity/Coupon"

test("Deve testar se o cupom é válido", function() {
    const coupon = new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00"))
    expect(coupon.isValid(new Date("2023-03-01T10:00:00"))).toBeTruthy()
})

test("Deve calcular o disconto", function() {
    const coupon = new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00"))
    expect(coupon.calculateDiscount(1000)).toBe(200)
})

test("Deve testar se o cupom é inválido", function() {
    const coupon = new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00"))
    expect(coupon.isValid(new Date("2023-11-01T10:00:00"))).toBe(false)
})
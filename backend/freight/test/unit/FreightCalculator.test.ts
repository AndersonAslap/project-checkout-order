import { FreightCalculator } from "../../src/domain/entity/FreightCalculator"

test("Deve calcular o frete", async function() {
    const freight = FreightCalculator.calculate(1, 1, 1000)
    expect(freight).toBe(10)
})

test("Deve calcular o frete com frete mínimo", async function() {
    const freight = FreightCalculator.calculate(1, 1, 1000)
    expect(freight).toBe(10)
})
import { Cpf } from "../../src/domain/entity/Cpf"

test.each([
    "407.302.170-27",
    "684.053.160-00",
    "746.971.314-01"
])("Deve criar um cpf válido", function(cpf: string) {
    const cpfObject = new Cpf(cpf)
    expect(cpfObject).toBeDefined()
})

test.each([
    "111.111.111-11",
    "406.302.170",
    ""
])("Não deve criar um cpf inválido", function(cpf: string) {
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid cpf'))
})
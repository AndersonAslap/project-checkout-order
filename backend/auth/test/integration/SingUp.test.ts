import { SingIn } from "../../src/application/usecase/SingIn";
import { SingUp } from "../../src/application/usecase/SingUp"
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter"
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";

test("Deve fazer um SingUp", async function() {
    const input = {
        email: 'aslap@gmail.com',
        password: 'abc@123',
        date: new Date('2023-06-28T10:00:00'),
        password_type: 'plain'
    }
    const connection = new PgPromiseAdapter();
    await connection.connect()
    const repositoryFactory = new DatabaseRepositoryFactory(connection)
    const userRepository = repositoryFactory.createUserRepository();
    await userRepository.clear()
    const singup = new SingUp(repositoryFactory)
    await singup.execute(input)
    const singin = new SingIn(repositoryFactory)
    const output = await singin.execute(input)
    expect(output.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzbGFwQGdtYWlsLmNvbSIsImlhdCI6MTY4Nzk1NzIwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.nSZrTl8w3Eml7kn30Yrs53Gw-SEw6-wQDyRk93BnWds")
    await connection.close()
})
import { RepositoryFactory } from "../factory/RepositoryFactory"
import { UserRepository } from "../repository/UserRepository"
import { User } from "../../domain/entity/User"

export class SingUp {
    userRepository: UserRepository

    constructor(repositoryFactory: RepositoryFactory){
        this.userRepository = repositoryFactory.createUserRepository()
    }

    async execute(input: Input) : Promise<void> {
        const user = User.create(input.email, input.password, input.password_type)
        await this.userRepository.save(user)
    }
}

type Input = {
    email: string,
    password: string,
    password_type: string
}
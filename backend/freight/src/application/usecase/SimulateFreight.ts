import { DistanceCalculator } from "../../domain/entity/DistanceCalculator";
import { FreightCalculator } from "../../domain/entity/FreightCalculator";
import { RepositoryFactory } from "../factory/RepositoryFactory";
import { ZipCodeRepository } from "../repository/ZipCodeRepository";

export class SimulateFreight {
    zipCodeRepository: ZipCodeRepository

    constructor(repositoryFactory: RepositoryFactory){
        this.zipCodeRepository = repositoryFactory.createZipCodeRepository()
    }

    async execute(input: Input) : Promise<Output> {
        const output = {
            freight: 0
        }
        let distance = 1000
        if (input.from && input.to) {
            const from = await this.zipCodeRepository.get(input.from);
            const to = await this.zipCodeRepository.get(input.to);
            if (from && to) {
                distance = DistanceCalculator.calculate(from.coord, to.coord)
            }
        }
        for (const item of input.items) {
            const freight = FreightCalculator.calculate(item.volume, item.density, distance)
            output.freight += freight * item.quantity
        }
        return output
    }
}

type Input = {
    items: {volume:number, density: number, quantity:number}[],
    from?: string,
    to?: string
}

type Output = {
    freight: number
}
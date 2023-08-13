import { ZipCodeRepository } from "../../application/repository/ZipCodeRepository";
import { ZipCode } from "../../domain/entity/ZipCode";
import { DatabaseConnection } from "../database/DatabaseConnection";

export class ZipCodeRepositoryDatabase implements ZipCodeRepository {

    constructor(readonly connection: DatabaseConnection){
    }

    async get(code: string): Promise<ZipCode | undefined> {
        const [zipcodeData] = await this.connection.query("select * from zipcodes where code = $1", [code])
        if (!zipcodeData) return undefined
        return new ZipCode(zipcodeData.code, parseFloat(zipcodeData.lat), parseFloat(zipcodeData.long))
    }
}
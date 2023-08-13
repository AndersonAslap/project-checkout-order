import { ZipCode } from "../../domain/entity/ZipCode";

export interface ZipCodeRepository {
    get(code:string) : Promise<ZipCode | undefined>
}
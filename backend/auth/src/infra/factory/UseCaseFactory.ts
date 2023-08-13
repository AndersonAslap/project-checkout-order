import { SingUp } from "../../application/usecase/SingUp";

export interface UseCaseFactory {
    createSingUp(): SingUp
}
import { SimulateFreight } from "../../application/usecase/SimulateFreight";

export interface UseCaseFactory {
    createSimulateFreight(): SimulateFreight
}
import { Checkout } from "../../application/usecase/Checkout";

export interface UseCaseFactory {
    createCheckout(): Checkout
}
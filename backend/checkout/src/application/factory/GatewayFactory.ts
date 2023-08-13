import { CatalogGateway } from "../gateway/CatalogGateway";
import { FreightGateway } from "../gateway/FreightGateway";

export interface GatewayFactory {
    createCatalogGateway(): CatalogGateway
    createFreightGateway(): FreightGateway
}
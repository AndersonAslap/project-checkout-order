import pgp from 'pg-promise'
import { DatabaseConnection } from "./DatabaseConnection";

export class PgPromiseAdapter implements DatabaseConnection {
    connection: any
    
    async connect(): Promise<void> {
        this.connection = pgp()('postgres://root:root@localhost:5432/')
    }
    
    async query(statement: string, params: any): Promise<any> {
        return await this.connection.query(statement, params)
    }

    async close(): Promise<void> {
        await this.connection.$pool.end()
    }
}
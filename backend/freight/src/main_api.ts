
import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
import { DatabaseRepositoryFactory } from './infra/factory/DatabaseRepositoryFactory'
import { UseCaseFactoryAdapter } from './infra/factory/UseCaseFactoryAdapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { HapiAdapter } from './infra/http/HapiAdapter'
import { HttpController } from './infra/http/HttpController'

const connection = new PgPromiseAdapter()
connection.connect()
const repositoryFactory = new DatabaseRepositoryFactory(connection)

const useCasesFactory = new UseCaseFactoryAdapter(repositoryFactory) 

const httpServer = new ExpressAdapter()
//const httpServer = new HapiAdapter()
new HttpController(httpServer, useCasesFactory)
httpServer.listen(3002)
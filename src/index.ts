import { Express } from 'express'
import * as http from 'http'
import dotenv from 'dotenv'
import { config } from './config/index'
import { AppServerRouter } from './lib/server'
import UserController from './api/controllers/user.controller'
import DatabaseConnection from './lib/database/database.connection'

dotenv.config()
class Index {
  app: Express;
  server: http.Server;
  constructor() {
    DatabaseConnection.mongoDbConnection()
    this.app = AppServerRouter.routerConfiguration();
    this.server = new http.Server(this.app);
    this.routes();
  }

  public bootstrap() {
    this.server.listen(config.PORT, '0.0.0.0');
    this.server.on('error', (e: Error) => {
      console.log('Error starting server' + e)
    })

    this.server.on('listening', () => {
      console.log(
        `Server started on port ${config.PORT} on env ${process.env.NODE_ENV ||
        'dev'}`,
      )
    })

    process.on('uncaughtException', e => {
      console.log('UncaughtException Error', e)
      process.exit(1)
    })
    process.on('unhandledRejection', e => {
      console.log('UnhandledRejection Error', e)
      process.exit(1)
    })

  }
  routes() {
    this.app.post('/user',UserController.create);
  }

}
new Index().bootstrap();
import 'module-alias/register'
import express, { Express } from 'express'
import * as http from 'http'
import dotenv from 'dotenv'
import { config } from '@config/index';
import UserController from '@controllers/user.controller';
// import appServer from '@lib/server'
import DatabaseConnection from '@lib/database/database.connection';
import { AppServerRouter } from '@lib/server';

dotenv.config()
class Index {
  app: Express;
  server: http.Server;
  constructor() {
    DatabaseConnection.mongoDbConnection()
    this.app = AppServerRouter.routerConfiguration();
    this.app.use(express.static(__dirname + "/../public")); //useful to run scripts file from this directory after deployment
    this.server = new http.Server(this.app);
    this.routes();
  }

  public bootstrap() {
    this.server.listen(process.env.PORT || config.PORT)
    this.server.on('error', (e: Error) => {
      console.log('Error starting server' + e)
    })

    this.server.on('listening', () => {
      console.log(
        `Server started on port ${process.env.PORT || config.PORT} on env ${process.env.NODE_ENV ||
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
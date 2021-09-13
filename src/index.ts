import { Express } from 'express'
import * as http from 'http'
import dotenv from 'dotenv'
import DatabaseConnection from '@lib/database/database.connection';
import { AppServerRouter } from '@lib/server';
import { config } from '@config/index';
import UserController from '@controllers/user.controller';

dotenv.config()
class Index {
  app: Express;
  // server: http.Server;
  constructor() {
    DatabaseConnection.mongoDbConnection()
    this.app = AppServerRouter.routerConfiguration();
    // this.server = new http.Server(this.app);
    this.routes();
  }

  public bootstrap() {
    this.app.listen(process.env.PORT, () => {
      console.log(
        `Server started on port ${config.PORT} on env ${process.env.NODE_ENV ||
        'dev'}`,
      )
    });
    // this.app.on('error', () => {
    //   console.log('Error starting server')
    // })

    // this.app.on('listening', () => {
    // })

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
import express, { Request, Response } from 'express';
import cors = require('cors');
import helmet = require('helmet');
import { config } from '@config/index';
import * as useragent from 'express-useragent';
import bodyParser from 'body-parser'
export class AppServerRouter {
  public static routerConfiguration(): express.Express {
    const app: express.Express = express()
  
    app.use(cors(config.corsOptions))
    app.use(helmet())
    app.set('env', process.env.NODE_ENV);
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(useragent.express())
    app.use('/ping', (req: Request, res: Response) => {
      res.status(200).send('server is running');
    } )
    return app
  }
 
}
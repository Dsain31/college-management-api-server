import express from 'express';
import cors = require('cors');
import helmet = require('helmet');
import { config } from '@config/index';
import * as useragent from 'express-useragent';
import bodyParser from 'body-parser'
// export class AppServerRouter {
  
// }
export default function (): express.Express {
  const app: express.Express = express()

  app.use(cors(config.corsOptions))
  app.use(helmet())
  app.set('env', process.env.NODE_ENV);
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(useragent.express())
  app.use(function (err: any, _req: any, res: any, _next: any) {
      if (err.name === 'ACCESS_FORBIDDEN') {
          return res.status(403).json({ status: 'ACCESS_FORBIDDEN', messenge: 'Access is forbidden to the requested data.'})
      }
      console.error(err.stack)
      return res.status(500).send('Something broke!')
  })
  return app
}
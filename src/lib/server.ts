import express from 'express';
import cors = require('cors');
import helmet = require('helmet');
import { config } from '@config/index';

export class AppServerRouter {
    public static routerConfiguration(): express.Express {
        const app: express.Express = express();
        app.use(helmet());
        app.set('env', process.env.NODE_ENV);
        app.use(express.json())
      
        app.use(express.urlencoded({ extended: true }));
      
        app.use('/', (req, res) => {
          res.json({ status: 'OK' });
        })
      
        app.use(cors(config.corsOptions));
        return app
    }

}
import * as dotenv from 'dotenv'
import ProductionConfig from './production.config'
import LocalConfig from './local.config'
import { IConfig } from 'src/interfaces/IConfig';

dotenv.config()
console.log('process.env.NODE_ENV ===', process.env.NODE_ENV);
let getConfig: IConfig
switch (process.env.NODE_ENV) {
    case 'production':
        getConfig = new ProductionConfig()
        break;
    case 'local':
        getConfig = new LocalConfig()
        break;

    default:
        getConfig = new ProductionConfig()
        break;
}
export const config: IConfig = getConfig;

import { CorsOptions } from 'cors';
import { IConfig } from 'src/interfaces/IConfig';

export default class LocalConfig implements IConfig {
    public PORT = 3000
    public clientPort = 4200
    public HOST = 'http://localhost'
    public baseUrl = this.HOST + ':' + this.clientPort
    public corsOptions: CorsOptions = {
        origin: '*',
        methods: 'GET,POST,PUT,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }
    public mongoConnectionURL = 'mongodb://localhost:27017/management' // 'mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>'
    public BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12)
    public JWT_SECRET: string = process.env.JWT_SECRET || 'asdjl;jkljraas}asdkhjas{hahkliweui'
    public JWT_EXPIRESIN: string = process.env.JWT_EXPIRESIN || '24h'

}

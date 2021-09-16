import { CorsOptions } from 'cors';
import { IConfig } from 'src/interfaces/IConfig';

export default class ProductionConfig implements IConfig {
    public PORT = 3000
    public corsOptions: CorsOptions = {
        origin: '*',
        methods: 'GET,POST,PUT,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }
    public mongoConnectionURL = 'mongodb+srv://deepaksain:sain.deepak21@cluster0.hmzaa.mongodb.net/management?retryWrites=true&w=majority'
    public BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12)
}

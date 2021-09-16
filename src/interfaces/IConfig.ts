import { CorsOptions } from 'cors';

export interface IConfig {
    PORT: number
    corsOptions: CorsOptions
    mongoConnectionURL: string
    BCRYPT_SALT_ROUNDS: number
}

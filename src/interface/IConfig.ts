import { CorsOptions } from 'cors';

export interface IConfig {
    PORT: number
    HOST: string
    clientPort?: number
    baseUrl: string
    corsOptions: CorsOptions
    mongoConnectionURL: string
    BCRYPT_SALT_ROUNDS: number
    JWT_SECRET: string
    JWT_EXPIRESIN: string
}

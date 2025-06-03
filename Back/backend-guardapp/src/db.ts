import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_CONFIG = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "guardappdb",
    username: "yhon",
    password: "yhon"
};


export const AppDataSource = new DataSource({
    type:       "mysql",
    host:       process.env.DB_HOST         || DEFAULT_CONFIG.host,
    port:       Number(process.env.DB_PORT) || DEFAULT_CONFIG.port,
    username:   process.env.DB_USER         || DEFAULT_CONFIG.username,
    password:   process.env.DB_PASSWORD     || DEFAULT_CONFIG.password,
    database:   process.env.DB_NAME         || DEFAULT_CONFIG.database,
    synchronize: process.env.E_PRODUCTION === 'true' || true,
    logging:    false,
    entities:   ["src/entities/*.ts"]
});
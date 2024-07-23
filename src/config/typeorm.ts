import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv';
import { registerAs } from "@nestjs/config";


dotenvConfig({path: '.development.env'});
const config = {
    type: 'postgres',
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT as unknown as number,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
    // dropSchema: true,
    logging: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
};
export default registerAs('typeorm', () => config);//la clave para acceder a las variables de entorno
export const connectionSource = new DataSource(config as DataSourceOptions); //conecta a la base de datos 

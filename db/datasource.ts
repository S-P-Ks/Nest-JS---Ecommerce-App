import { DataSource, DataSourceOptions } from "typeorm"
import { config } from "dotenv"
import { UserEntity } from "src/users/entities/user.entity"

config()

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    migrations: ["dist/db/migrations/*{.ts,.js}"],
    logging: true,
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
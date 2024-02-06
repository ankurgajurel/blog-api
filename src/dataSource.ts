import "reflect-metadata"
import { DataSource } from "typeorm"
import { Author } from "./entity/Author"
import { Blog } from "./entity/Blog"

export const DatabaseConfig = new DataSource({
    type: "postgres",
    host: `${process.env.DB_HOST}`,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`,
    entities: [Author, Blog],
    synchronize: true
})
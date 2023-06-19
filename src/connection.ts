import {createConnection} from "typeorm";
import User from "./models/User";
import Book from "./models/Book";

export default createConnection({
    host: "localhost",
    type: "postgres",
    database: 'nodeTest',
    port: 5432,
    username: 'postgres',
    password: 'root',
    entities: [User, Book],
    synchronize: true,
    logging: true,
})

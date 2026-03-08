import { DataSource } from 'typeorm';
import { config } from './env';
import User from '../models/User';
import Book from '../models/Book';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    synchronize: config.env !== 'production', // Don't synchronize in production!
    logging: config.env === 'development',
    entities: [User, Book],
    migrations: [],
    subscribers: [],
});

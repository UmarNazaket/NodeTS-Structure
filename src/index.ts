import 'dotenv/config'; // Must be first
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { AppDataSource } from './config/database';
import { config } from './config/env';
import { globalErrorHandler } from './middlewares/error.middleware';
import { AppError } from './types';

const app: Express = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
    origin: config.cors.origin,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Built-in Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Database Connection & Server Startup
AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');
        app.listen(config.port, () => {
            console.log(`The server is running on port ${config.port} in ${config.env} mode`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1);
    });

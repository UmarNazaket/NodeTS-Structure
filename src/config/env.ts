import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('1d'),
    CORS_ORIGIN: Joi.string().default('*')
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    db: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        username: envVars.DB_USERNAME,
        password: envVars.DB_PASSWORD,
        name: envVars.DB_NAME,
    },
    jwt: {
        secret: envVars.JWT_SECRET_KEY,
        expiresIn: envVars.JWT_EXPIRES_IN,
    },
    cors: {
        origin: envVars.CORS_ORIGIN,
    }
};

import { Request } from 'express';
import { JwtPayload as BaseJwtPayload } from 'jsonwebtoken';
import User from '../models/User';

export interface AuthRequest extends Request {
    user?: User | null;
}

export interface AppJwtPayload extends BaseJwtPayload {
    id: number;
    email: string;
}

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

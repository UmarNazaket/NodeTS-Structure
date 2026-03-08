import { NextFunction, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { AppError, AuthRequest, AppJwtPayload } from '../types';
import { config } from '../config/env';
import User from '../models/User';

export const isAuthentication = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('Authentication failed: No token provided.', 401);
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jsonwebtoken.verify(token, config.jwt.secret) as AppJwtPayload;

        // Check if user still exists
        const user = await User.findOneBy({ id: decoded.id });
        if (!user) {
            throw new AppError('The user belonging to this token no longer exists.', 401);
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (e: any) {
        next(e); // Pass error to global error handler
    }
};

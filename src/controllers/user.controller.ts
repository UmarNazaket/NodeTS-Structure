import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { sendSuccessResponse } from '../utils/response.util';
import { AuthRequest } from '../types';

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.register(req.body);
            sendSuccessResponse(res, result, 'User registered successfully', 201);
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.login(req.body);
            sendSuccessResponse(res, result, 'Login successful');
        } catch (error) {
            next(error);
        }
    }

    static async getUserProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            // User id is guaranteed to be present from auth middleware
            const result = await UserService.getUserProfile(req.user!.id);
            sendSuccessResponse(res, result, 'Profile retrieved successfully');
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;

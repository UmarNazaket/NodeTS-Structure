import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User';
import { AppError } from '../types';
import { config } from '../config/env';

export class UserService {
    static async register(userData: any) {
        const { email, password } = userData;

        // Check if user exists
        const existingUser = await User.findOneBy({ email });
        if (existingUser) {
            throw new AppError('Email already in use', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.create({
            email,
            password: hashedPassword
        });

        await user.save();

        return this.generateTokenResponse(user);
    }

    static async login(userData: any) {
        const { email, password } = userData;

        const user = await User.findOneBy({ email });
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401);
        }

        return this.generateTokenResponse(user);
    }

    static async getUserProfile(userId: number) {
        const user = await User.findOne({
            where: { id: userId },
            relations: ['books']
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Don't leak the password hash in the response
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    private static generateTokenResponse(user: User) {
        // DO NOT INCLUDE THE PASSWORD HASH IN THE PAYLOAD
        const payload = { id: user.id, email: user.email };
        const token = jsonwebtoken.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn
        });

        // Safe user object for response
        const { password, ...safeUser } = user;

        return {
            token,
            user: safeUser
        };
    }
}

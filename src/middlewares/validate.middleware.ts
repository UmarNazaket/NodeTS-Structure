import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { AppError } from '../types';

export const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return next(new AppError(errorMessage, 400));
        }

        req.body = value;
        next();
    };
};

import { Response } from 'express';

export const sendSuccessResponse = (
    res: Response,
    body: any = {},
    message: string = 'Request was successfully resolved',
    status: number = 200,
) => {
    return res.status(status).json({
        status,
        message,
        data: body
    });
};

export const sendErrorResponse = (
    res: Response,
    message: string = 'Error Generated: Request could not be entertained',
    description: any = {},
    status: number = 500
) => {
    return res.status(status).json({
        status,
        message,
        errors: description
    });
};

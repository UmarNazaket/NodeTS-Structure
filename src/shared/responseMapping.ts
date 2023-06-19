import {Response} from "express";

export default {
    sendSuccessMessage: (
        res: Response,
        body:any = {},
        message: string = "Request was successfully resolved",
        status: number = 200,
    ) => {
        return res.send({body, message, status})
    },
    sendErrorMessage: (
        res: Response,
        description = {},
        message: string = "Error Generated: Reqest could not be entertained",
        status: number = 500
    ) => {
        return res.send({description, message, status})
    }
}
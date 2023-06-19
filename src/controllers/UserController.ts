import {Request, Response} from "express";
import User from "../models/User";
import {UserSchema} from "../shared/userValidator";
import RequestResponseMappings from "../shared/responseMapping";
import UserController from "./UserController";
import jsonwebtoken from 'jsonwebtoken';
import Joi from "joi";
import bcrypt from 'bcrypt';
require('dotenv').config();

interface _User {
    email: string;
    password: string;
}

export default {
    getUser: async (req: Request, res: Response) => {
        let user=await User.findOne({
            where:
                {
                    email:req.body.user.email
                },
            relations:
                {
                    books:true
                }
        }
        );
        return RequestResponseMappings.sendSuccessMessage(res, user)
    },
    register: async (req: Request, res: Response) => {
        debugger;
        try {
            let userValidationError: Joi.ValidationError | undefined = UserController.errorValidateUserSchema(req.body)
            if (userValidationError && "detail" in userValidationError) {
                return RequestResponseMappings
                    .sendErrorMessage(
                        res,
                        userValidationError.details
                    )
            }
            let user = User.create(
                {
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
                });
            await user.save();
            return UserController.sendTokenWithPayload(res, user);
        }catch (e:any) {
            return RequestResponseMappings.sendErrorMessage(res,{},e.message)
        }
    },
    loginUser: async (req: Request, res: Response) => {
        let user = await User.findOneBy({email: req.body.email});
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            return UserController.sendTokenWithPayload(res, user);
        }
        return RequestResponseMappings.sendErrorMessage(res)
    },
    errorValidateUserSchema: (incomingUser: any):  Joi.ValidationError | undefined => {
        let userValidationError = UserSchema.validate(incomingUser).error
        if (!userValidationError) {
            return
        }
        return userValidationError;
    },
    sendTokenWithPayload: (res: Response, user: _User) => {
        return RequestResponseMappings.sendSuccessMessage(res, {
            token: jsonwebtoken.sign(
                {email: user.email, password: user.password},
                process.env.JWT_SECRET_KEY!),
            user: user
        })
    },
}

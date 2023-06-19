import Joi from "joi";

export const UserSchema = Joi.object({
    password: Joi
        .string().required().min(5).max(20),
    email: Joi.string().email().required(),
})
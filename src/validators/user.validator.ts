import Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Provide a valid email address`,
        'any.required': `Email is a required field`
    }),
    password: Joi.string().min(5).max(20).required().messages({
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.max': `Password should have a maximum length of {#limit}`,
        'any.required': `Password is a required field`
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

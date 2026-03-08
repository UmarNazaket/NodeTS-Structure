import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthentication } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validators/user.validator';

const router: Router = express.Router();

// Public routes
router.post('/', validate(registerSchema), UserController.register);
router.post('/login', validate(loginSchema), UserController.login);

// Protected routes
router.get('/', isAuthentication, UserController.getUserProfile);

export default router;

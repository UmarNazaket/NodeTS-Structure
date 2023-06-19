import express, {Express} from 'express';
import UserController from "../controllers/UserController";
import AuthenticationMiddleware from "../shared/middleware/authentication";

const userRouter: Express = express();
userRouter.get('/',AuthenticationMiddleware.isAuthentication, UserController.getUser)
userRouter.post('/', UserController.register)
userRouter.post('/login',AuthenticationMiddleware.isAuthentication, UserController.loginUser)



export default userRouter;
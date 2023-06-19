import express,{Express} from 'express';
import userRoutes from './userRoutes';

const router: Express = express();


router.use('/users', userRoutes);

export default router;
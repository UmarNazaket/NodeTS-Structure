import express,{Express} from 'express';
import userRoutes from '../src/routes/userRoutes';

const router: Express = express();


router.use('/users', userRoutes);

export default router;
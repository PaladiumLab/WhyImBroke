import { Router }from "express";
import authMiddleware from "../middlewares/authMiddleware";

import { signupController, loginController, getMyProfile } from '../controllers/authController';

const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/me', authMiddleware, getMyProfile);

export default router;
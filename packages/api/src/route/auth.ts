import { Router } from 'express';
import AuthController from '../controller/AuthController';
import { checkJwt } from '../middleware/checkJwt';

const router = Router();
// Login route
router.post('/login', AuthController.login);

// Change password
router.post('/change-password', [checkJwt], AuthController.changePassword);

// Forgot password
router.post('/reset-password', [checkJwt], AuthController.resetPassword);

// Reset password
router.post('/forgot-password', [checkJwt], AuthController.forgotPassword);

export default router;
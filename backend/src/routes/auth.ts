import express, { Request, Response } from 'express';
import { login, register, verify } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes
router.get('/verify', authMiddleware, verify);

export default router;

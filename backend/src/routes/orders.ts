import express from 'express';
import { authMiddleware } from '../middleware/auth';
import * as orderController from '../controllers/orderController';

const router = express.Router();

router.use(authMiddleware);

// GET routes
router.get('/', orderController.getAllOrders);
router.get('/pending', orderController.getPendingOrders);
router.get('/:id', orderController.getOrderById);

// POST routes
router.post('/', orderController.createOrder);

// PUT routes
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/complete', orderController.completeOrder);

export default router;

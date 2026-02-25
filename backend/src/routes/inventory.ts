import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth';
import * as inventoryController from '../controllers/inventoryController';

const router = express.Router();

router.use(authMiddleware);

// GET routes
router.get('/', inventoryController.getAllProducts);
router.get('/low-stock', inventoryController.getLowStockItems);
router.get('/:id', inventoryController.getProductById);

// POST routes
router.post('/', requireRole('admin', 'manager'), inventoryController.createProduct);
router.post('/:id/deduct', inventoryController.deductProduct);

// PUT routes
router.put('/:id', requireRole('admin', 'manager'), inventoryController.updateProduct);

// DELETE routes
router.delete('/:id', requireRole('admin'), inventoryController.deleteProduct);

export default router;

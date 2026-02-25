import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth';
import * as analyticsController from '../controllers/analyticsController';

const router = express.Router();

router.use(authMiddleware);

// GET routes
router.get('/dashboard', analyticsController.getDashboardMetrics);
router.get('/recipes/profitability', requireRole('admin', 'manager'), analyticsController.getRecipeProfitability);
router.get('/suppliers', requireRole('admin', 'manager'), analyticsController.getSupplierAnalytics);
router.get('/sales/report', requireRole('admin', 'manager'), analyticsController.getDailySalesReport);
router.get('/inventory/value', requireRole('admin', 'manager'), analyticsController.getInventoryValue);

export default router;

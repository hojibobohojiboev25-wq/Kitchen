import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { analyticsService } from '../services/analyticsService';

export const getDashboardMetrics = async (req: AuthRequest, res: Response) => {
  try {
    const metrics = await analyticsService.getDashboardMetrics();
    res.json(metrics);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeProfitability = async (req: AuthRequest, res: Response) => {
  try {
    const data = await analyticsService.getRecipeProfitability();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSupplierAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const data = await analyticsService.getSupplierAnalytics();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getDailySalesReport = async (req: AuthRequest, res: Response) => {
  try {
    const { days = 30 } = req.query;
    const data = await analyticsService.getDailySalesReport(parseInt(days as string));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInventoryValue = async (req: AuthRequest, res: Response) => {
  try {
    const data = await analyticsService.getInventoryValue();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

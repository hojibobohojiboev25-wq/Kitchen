import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { inventoryService } from '../services/inventoryService';

export const getAllProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await inventoryService.getAllProducts();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLowStockItems = async (req: AuthRequest, res: Response) => {
  try {
    const items = await inventoryService.getLowStockItems();
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const product = await inventoryService.getProductById(req.params.id);
    res.json(product);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await inventoryService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await inventoryService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deductProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { quantity, reason } = req.body;
    const product = await inventoryService.deductProduct(
      req.params.id,
      quantity,
      reason
    );
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    await inventoryService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

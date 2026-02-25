import { db } from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '../types';

export class InventoryService {
  async getAllProducts() {
    const result = await db.query('SELECT * FROM products ORDER BY name');
    return result.rows;
  }

  async getLowStockItems() {
    const result = await db.query(
      'SELECT * FROM products WHERE current_quantity <= min_quantity ORDER BY current_quantity'
    );
    return result.rows;
  }

  async getProductById(id: string) {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);
    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }
    return result.rows[0];
  }

  async createProduct(product: Partial<IProduct>) {
    const id = uuidv4();
    await db.query(
      `INSERT INTO products (id, name, unit, current_quantity, min_quantity, max_quantity, price_per_unit, supplier_id, expiry_date, category, photo_url, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())`,
      [
        id,
        product.name,
        product.unit,
        product.current_quantity,
        product.min_quantity,
        product.max_quantity,
        product.price_per_unit,
        product.supplier_id,
        product.expiry_date,
        product.category,
        product.photo_url,
      ]
    );
    return this.getProductById(id);
  }

  async updateProduct(id: string, updates: Partial<IProduct>) {
    await db.query(
      `UPDATE products SET current_quantity = $1, price_per_unit = $2, expiry_date = $3, updated_at = NOW()
       WHERE id = $4`,
      [updates.current_quantity, updates.price_per_unit, updates.expiry_date, id]
    );
    return this.getProductById(id);
  }

  async deductProduct(productId: string, quantity: number, reason: string) {
    // Вычитание продукта при продаже блюда с логированием
    const product = await this.getProductById(productId);

    if (product.current_quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    const newQuantity = product.current_quantity - quantity;
    
    await db.query(
      'UPDATE products SET current_quantity = $1, updated_at = NOW() WHERE id = $2',
      [newQuantity, productId]
    );

    // Log to inventory movement history
    await db.query(
      `INSERT INTO inventory_movements (id, product_id, quantity, reason, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [uuidv4(), productId, -quantity, reason]
    );

    return this.getProductById(productId);
  }

  async deleteProduct(id: string) {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
  }
}

export const inventoryService = new InventoryService();

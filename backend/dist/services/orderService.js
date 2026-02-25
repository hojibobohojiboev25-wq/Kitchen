"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.OrderService = void 0;
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class OrderService {
    async getAllOrders(limit = 50) {
        const result = await database_1.db.query(`SELECT o.*, json_agg(json_build_object('id', oi.id, 'recipe_id', oi.recipe_id, 'quantity', oi.quantity, 'status', oi.status)) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       GROUP BY o.id
       ORDER BY o.created_at DESC
       LIMIT $1`, [limit]);
        return result.rows;
    }
    async getOrderById(id) {
        const result = await database_1.db.query('SELECT * FROM orders WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Order not found');
        }
        return result.rows[0];
    }
    async createOrder(order) {
        const orderId = (0, uuid_1.v4)();
        await database_1.db.query(`INSERT INTO orders (id, order_number, customer_name, table_number, status, total_cost, total_price, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`, [
            orderId,
            `ORD-${Date.now()}`,
            order.customer_name,
            order.table_number,
            'pending',
            order.total_cost || 0,
            order.total_price || 0,
        ]);
        // Add items
        for (const item of order.items || []) {
            await database_1.db.query(`INSERT INTO order_items (id, order_id, recipe_id, quantity, special_instructions, status)
         VALUES ($1, $2, $3, $4, $5, 'pending')`, [(0, uuid_1.v4)(), orderId, item.recipe_id, item.quantity, item.special_instructions]);
        }
        return this.getOrderById(orderId);
    }
    async updateOrderStatus(orderId, status) {
        await database_1.db.query('UPDATE orders SET status = $1 WHERE id = $2', [
            status,
            orderId,
        ]);
        return this.getOrderById(orderId);
    }
    async updateItemStatus(itemId, status) {
        await database_1.db.query('UPDATE order_items SET status = $1 WHERE id = $2', [
            status,
            itemId,
        ]);
    }
    async getPendingOrders() {
        const result = await database_1.db.query(`SELECT * FROM orders WHERE status IN ('pending', 'preparing') ORDER BY created_at ASC`);
        return result.rows;
    }
    async completeOrder(orderId) {
        await database_1.db.query('UPDATE orders SET status = $1, completed_at = NOW() WHERE id = $2', ['served', orderId]);
        return this.getOrderById(orderId);
    }
}
exports.OrderService = OrderService;
exports.orderService = new OrderService();

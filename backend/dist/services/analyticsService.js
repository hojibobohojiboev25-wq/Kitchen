"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = exports.AnalyticsService = void 0;
const database_1 = require("../config/database");
class AnalyticsService {
    async getDashboardMetrics() {
        const lowStockQuery = await database_1.db.query('SELECT * FROM products WHERE current_quantity <= min_quantity LIMIT 10');
        const pendingOrdersQuery = await database_1.db.query(`SELECT * FROM orders WHERE status IN ('pending', 'preparing') LIMIT 10`);
        const staffQuery = await database_1.db.query(`SELECT * FROM staff WHERE DATE(hire_date) = CURRENT_DATE`);
        const costQuery = await database_1.db.query(`SELECT COALESCE(SUM(total_cost), 0) as daily_cost FROM orders WHERE DATE(created_at) = CURRENT_DATE`);
        const revenueQuery = await database_1.db.query(`SELECT COALESCE(SUM(total_price), 0) as daily_revenue FROM orders WHERE DATE(created_at) = CURRENT_DATE AND status = 'served'`);
        const daily_cost = costQuery.rows[0].daily_cost;
        const daily_revenue = revenueQuery.rows[0].daily_revenue;
        return {
            low_stock_items: lowStockQuery.rows,
            pending_orders: pendingOrdersQuery.rows,
            staff_on_duty: staffQuery.rows,
            daily_cost,
            daily_revenue,
            daily_profit: daily_revenue - daily_cost,
        };
    }
    async getRecipeProfitability() {
        const result = await database_1.db.query(`SELECT 
        r.id, r.name, r.cost, r.price, r.profit_margin,
        COUNT(oi.id) as times_ordered,
        SUM(r.price - r.cost) as total_profit
       FROM recipes r
       LEFT JOIN order_items oi ON r.id = oi.recipe_id
       GROUP BY r.id
       ORDER BY total_profit DESC`);
        return result.rows;
    }
    async getSupplierAnalytics() {
        const result = await database_1.db.query(`SELECT 
        s.id, s.name, s.phone, s.email,
        COUNT(p.id) as product_count,
        AVG(p.price_per_unit) as avg_price
       FROM suppliers s
       LEFT JOIN products p ON s.id = p.supplier_id
       GROUP BY s.id`);
        return result.rows;
    }
    async getDailySalesReport(days = 30) {
        const result = await database_1.db.query(`SELECT 
        DATE(created_at) as date,
        COUNT(*) as orders_count,
        SUM(CASE WHEN status = 'served' THEN total_price ELSE 0 END) as revenue,
        SUM(total_cost) as cost
       FROM orders
       WHERE created_at >= NOW() - INTERVAL '${days} days'
       GROUP BY DATE(created_at)
       ORDER BY date DESC`);
        return result.rows;
    }
    async getInventoryValue() {
        const result = await database_1.db.query(`SELECT 
        COALESCE(SUM(current_quantity * price_per_unit), 0) as total_value,
        COUNT(*) as total_items
       FROM products`);
        return result.rows[0];
    }
}
exports.AnalyticsService = AnalyticsService;
exports.analyticsService = new AnalyticsService();

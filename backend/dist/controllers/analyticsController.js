"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventoryValue = exports.getDailySalesReport = exports.getSupplierAnalytics = exports.getRecipeProfitability = exports.getDashboardMetrics = void 0;
const analyticsService_1 = require("../services/analyticsService");
const getDashboardMetrics = async (req, res) => {
    try {
        const metrics = await analyticsService_1.analyticsService.getDashboardMetrics();
        res.json(metrics);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getDashboardMetrics = getDashboardMetrics;
const getRecipeProfitability = async (req, res) => {
    try {
        const data = await analyticsService_1.analyticsService.getRecipeProfitability();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getRecipeProfitability = getRecipeProfitability;
const getSupplierAnalytics = async (req, res) => {
    try {
        const data = await analyticsService_1.analyticsService.getSupplierAnalytics();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSupplierAnalytics = getSupplierAnalytics;
const getDailySalesReport = async (req, res) => {
    try {
        const { days = 30 } = req.query;
        const data = await analyticsService_1.analyticsService.getDailySalesReport(parseInt(days));
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getDailySalesReport = getDailySalesReport;
const getInventoryValue = async (req, res) => {
    try {
        const data = await analyticsService_1.analyticsService.getInventoryValue();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getInventoryValue = getInventoryValue;

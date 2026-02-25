"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeOrder = exports.updateOrderStatus = exports.getPendingOrders = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const orderService_1 = require("../services/orderService");
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService_1.orderService.getAllOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await orderService_1.orderService.getOrderById(req.params.id);
        res.json(order);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.getOrderById = getOrderById;
const createOrder = async (req, res) => {
    try {
        const order = await orderService_1.orderService.createOrder(req.body);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createOrder = createOrder;
const getPendingOrders = async (req, res) => {
    try {
        const orders = await orderService_1.orderService.getPendingOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPendingOrders = getPendingOrders;
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderService_1.orderService.updateOrderStatus(req.params.id, status);
        res.json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const completeOrder = async (req, res) => {
    try {
        const order = await orderService_1.orderService.completeOrder(req.params.id);
        res.json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.completeOrder = completeOrder;

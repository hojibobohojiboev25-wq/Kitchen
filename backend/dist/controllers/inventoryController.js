"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.deductProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getLowStockItems = exports.getAllProducts = void 0;
const inventoryService_1 = require("../services/inventoryService");
const getAllProducts = async (req, res) => {
    try {
        const products = await inventoryService_1.inventoryService.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllProducts = getAllProducts;
const getLowStockItems = async (req, res) => {
    try {
        const items = await inventoryService_1.inventoryService.getLowStockItems();
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getLowStockItems = getLowStockItems;
const getProductById = async (req, res) => {
    try {
        const product = await inventoryService_1.inventoryService.getProductById(req.params.id);
        res.json(product);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const product = await inventoryService_1.inventoryService.createProduct(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const product = await inventoryService_1.inventoryService.updateProduct(req.params.id, req.body);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateProduct = updateProduct;
const deductProduct = async (req, res) => {
    try {
        const { quantity, reason } = req.body;
        const product = await inventoryService_1.inventoryService.deductProduct(req.params.id, quantity, reason);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deductProduct = deductProduct;
const deleteProduct = async (req, res) => {
    try {
        await inventoryService_1.inventoryService.deleteProduct(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteProduct = deleteProduct;

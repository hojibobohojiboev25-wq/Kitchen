"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const errorHandler_1 = require("./middleware/errorHandler");
// Routes
const recipes_1 = __importDefault(require("./routes/recipes"));
const inventory_1 = __importDefault(require("./routes/inventory"));
const orders_1 = __importDefault(require("./routes/orders"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)(config_1.config.cors));
// Routes
app.use('/api/recipes', recipes_1.default);
app.use('/api/inventory', inventory_1.default);
app.use('/api/orders', orders_1.default);
app.use('/api/analytics', analytics_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});
// Error handling
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    try {
        // Try to connect to database, but allow server to run without it
        try {
            await (0, database_1.initDatabase)();
            console.log('✓ Database connected');
        }
        catch (dbError) {
            console.warn('⚠ Database connection failed - running in memory mode');
            console.warn(dbError);
        }
        app.listen(config_1.config.port, () => {
            console.log(`🍳 KitchenPro server running on port ${config_1.config.port}`);
            console.log(`Environment: ${config_1.config.environment}`);
            console.log(`📡 http://localhost:${config_1.config.port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;

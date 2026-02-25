import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config';
import { initDatabase } from './config/database';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Routes
import authRouter from './routes/auth';
import recipesRouter from './routes/recipes';
import inventoryRouter from './routes/inventory';
import ordersRouter from './routes/orders';
import analyticsRouter from './routes/analytics';

const app = express();

// Middleware
app.use(express.json());
app.use(cors(config.cors));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/analytics', analyticsRouter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    // Try to connect to database, but allow server to run without it
    try {
      await initDatabase();
      console.log('✓ Database connected');
    } catch (dbError) {
      console.warn('⚠ Database connection failed - running in memory mode');
      console.warn(dbError);
    }
    
    app.listen(config.port, () => {
      console.log(`🍳 KitchenPro server running on port ${config.port}`);
      console.log(`Environment: ${config.environment}`);
      console.log(`📡 http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

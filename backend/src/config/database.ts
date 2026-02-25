import { Pool, PoolClient } from 'pg';
import { config } from './index';

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      host: 'localhost',
      port: 5432,
      database: 'kitchenpro',
      user: 'postgres',
      password: 'password',
    });

pool.on('error', (err: Error) => {
  console.error('Pool error:', err);
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
  getClient: () => pool.connect(),
};

export const initDatabase = async () => {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Database connected:', result.rows[0]);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

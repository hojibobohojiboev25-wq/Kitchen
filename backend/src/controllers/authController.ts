import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

// Mock user database - in production, this should be in PostgreSQL
const mockUsers = [
  {
    id: '1',
    email: 'demo@kitchenpro.com',
    password: '$2a$10$YourHashedPasswordHere', // hash of 'demo123'
    name: 'Demo User',
    role: 'admin'
  }
];

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Mock validation - for demo
    if (email === 'demo@kitchenpro.com' && password === 'demo123') {
      const token = generateToken({
        userId: '1',
        email: 'demo@kitchenpro.com',
        role: 'admin'
      });

      return res.json({
        token,
        user: {
          id: '1',
          email: 'demo@kitchenpro.com',
          name: 'Demo User',
          role: 'admin'
        }
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // For now, just return the same demo user
    const token = generateToken({
      userId: '1',
      email,
      role: 'user'
    });

    return res.status(201).json({
      token,
      user: {
        id: '1',
        email,
        name,
        role: 'user'
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const verify = async (req: any, res: Response) => {
  try {
    res.json({
      user: {
        id: req.userId,
        email: 'demo@kitchenpro.com',
        role: req.role || 'user'
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

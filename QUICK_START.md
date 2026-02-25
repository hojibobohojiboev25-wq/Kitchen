# 🚀 KitchenPro Quick Start Guide

## Prerequisites

Before you start, make sure you have:
- ✅ Node.js (v16 or higher)
- ✅ npm (v7 or higher)
- ⚠️ PostgreSQL (optional - app will run in limited mode without it)

## Quick Start (30 seconds)

### Option 1: Windows (Recommended)
```powershell
# Open PowerShell and run:
cd C:\Users\Asus\Desktop\KitchenPro
.\start.ps1
```

### Option 2: Mac/Linux
```bash
cd ~/Desktop/KitchenPro
chmod +x start.sh
./start.sh
```

### Option 3: Manual Start (in two terminals)
```bash
# Terminal 1
cd c:\Users\Asus\Desktop\KitchenPro\backend
npm run dev

# Terminal 2 (new terminal)
cd c:\Users\Asus\Desktop\KitchenPro\frontend
npm run dev
```

## Where to Access

Once started, open your browser:

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:5173 | Main application |
| Backend API | http://localhost:5000 | API server |
| Health Check | http://localhost:5000/health | Server status |

## Login Credentials

```
Email: demo@kitchenpro.com
Password: demo123
```

Note: In development mode, you can enter any email and password to login.

## Available Scripts

### Backend
```bash
cd backend

# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Run production build
npm start

# Initialize database (requires PostgreSQL)
npm run db:init
```

### Frontend
```bash
cd frontend

# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
KitchenPro/
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth, error handling
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── types/       # TypeScript interfaces
│   │   └── utils/       # Utility functions
│   └── package.json
├── frontend/             # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client
│   │   ├── store/       # Zustand state
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utilities
│   └── package.json
├── database/             # Database schema
│   ├── schema.sql       # PostgreSQL schema
│   └── init.js          # Initialization script
└── docs/                # Documentation
```

## Common Issues & Solutions

### Issue: Port already in use
**Solution:** Check if another process is using port 5000 or 5173
```powershell
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Mac/Linux
lsof -i :5000
lsof -i :5173
```

### Issue: npm command not found
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Cannot find module" errors
**Solution:** Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Issue: Database connection error
**Solution:** The app works without PostgreSQL in demo mode. To use full features, install PostgreSQL and run:
```bash
node database/init.js
```

### Issue: Build fails
**Solution:** Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

## Features to Try

1. **Dashboard** - View daily metrics and orders
2. **Inventory** - Add and manage products
3. **Recipes** - Create recipes with ingredients
4. **Orders** - Track customer orders
5. **Analytics** - View sales reports

## Configuration

Edit these files to customize:
- `.env` - Environment variables
- `firebase.config.js` - Firebase configuration (if using)
- `tailwind.config.js` - Tailwind CSS customization
- `vite.config.ts` - Frontend build configuration

## Production Deployment

Before deploying to production:

1. **Update environment variables**
```bash
# In backend/.env and frontend/.env
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
JWT_SECRET=your-long-random-secret-key
DB_PASSWORD=strong-password
```

2. **Build for production**
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

3. **Deploy**
- Deploy backend to Node.js server
- Deploy frontend/dist to static hosting
- Update database connection strings
- Enable HTTPS

## Useful Links

- [Project README](./README.md)
- [API Documentation](./docs/API_DOCS.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

## Need Help?

1. Check the `/docs` folder for detailed documentation
2. Review error messages in the terminal
3. Ensure all prerequisites are installed
4. Try restarting the services

---

**Happy cooking with KitchenPro! 🍳**

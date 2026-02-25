# 🚀 KitchenPro Installation & Setup Guide

Complete setup guide for KitchenPro - a comprehensive kitchen management system for restaurants, cafes, and food services.

## Table of Contents

1. [System Requirements](#-system-requirements)
2. [Installation](#-installation)
3. [Quick Start](#-quick-start)
4. [Configuration](#-configuration)
5. [Running the Application](#-running-the-application)
6. [Demo Credentials](#-demo-credentials)
7. [Troubleshooting](#-troubleshooting)

---

## 💻 System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Node.js**: 18.0+ (Get it from https://nodejs.org)
- **npm**: 9.0+
- **PostgreSQL**: 12.0+ or Docker

### Recommended
- **RAM**: 4GB+ for development
- **Disk Space**: 2GB+ for project and node_modules
- **Node.js**: 20.x LTS
- **PostgreSQL**: 15+ or 16+

### Verify Installation

```powershell
# Check versions
node --version      # Should be v18+ (e.g. v20.10.0)
npm --version       # Should be 9+ (e.g. 10.2.3)
```

---

## 🔧 Installation

### Step 1: Install PostgreSQL

#### Option A: Native Installation (Windows)
1. Download: https://www.postgresql.org/download/windows/
2. Run installer
3. Keep settings as default or customize:
   - Password for postgres user: `password` (or your choice)
   - Port: `5432`
4. After installation, add PostgreSQL to PATH:
   - `C:\Program Files\PostgreSQL\16\bin`

#### Option B: Docker (Recommended for Development)
```powershell
# Install Docker Desktop from https://www.docker.com/products/docker-desktop

# Run PostgreSQL container
docker run --name kitchenpro-db `
  -e POSTGRES_PASSWORD=password `
  -e POSTGRES_DB=kitchenpro `
  -p 5432:5432 `
  -d postgres:16
```

#### Option C: WSL (Windows Subsystem for Linux)
```powershell
# Install WSL2 if not already installed
wsl --install

# Inside WSL bash
wsl bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

#### Verify PostgreSQL Installation
```powershell
psql --version
# Output: psql (PostgreSQL 16.0)
```

### Step 2: Clone/Download Project

```powershell
# Navigate to your projects directory
cd c:\Users\Asus\Desktop

# If cloning from Git
git clone <repository-url> KitchenPro
cd KitchenPro

# Or if you have the folder already
cd KitchenPro
```

### Step 3: Install Dependencies

The `.env` files and dependencies are already configured. Dependencies were installed when the project was created.

**Verify** that npm packages are installed:
```powershell
# Backend
cd backend
npm list --depth=0 | head -20

# Frontend (in new terminal)
cd frontend
npm list --depth=0 | head -20
```

If not installed, run:
```powershell
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

## ⚡ Quick Start

### The Fastest Way (5 minutes)

#### 1. Make sure PostgreSQL is running
```powershell
# Test connection
psql -U postgres -c "SELECT version();"
```

#### 2. Initialize the Database
```powershell
# From project root
cd c:\Users\Asus\Desktop\KitchenPro
node database/init.js
```

**Expected output:**
```
✅ PostgreSQL найден: psql (PostgreSQL 16.0)
✅ База данных готова
✅ Схема инициализирована успешно!
✅ Соединение с базой данных проверено!
```

#### 3. Start Backend (API Server)
```powershell
cd backend
npm run dev
```

**Expected output:**
```
[INFO] Server is running on http://localhost:5000
[INFO] Database connected successfully
[INFO] Listening on port 5000
```

#### 4. Start Frontend (in new PowerShell window)
```powershell
cd frontend
npm run dev
```

**Expected output:**
```
VITE v5.0.0  ready in XXX ms

Local:    http://localhost:3000/
```

#### 5. Open Application
- **URL:** http://localhost:3000
- **Email:** admin@kitchenpro.local
- **Password:** admin123

---

## ⚙️ Configuration

### Backend Configuration (.env)

Create/edit `backend/.env`:

```env
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kitchenpro
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration (.env)

Create/edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=KitchenPro
VITE_APP_VERSION=1.0.0
```

---

## 🚀 Running the Application

### Option 1: Manual (Two Terminal Windows)

**Terminal 1 - Backend:**
```powershell
cd c:\Users\Asus\Desktop\KitchenPro\backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd c:\Users\Asus\Desktop\KitchenPro\frontend
npm run dev
```

### Option 2: Automated (Windows PowerShell)

```powershell
# From project root
.\start.ps1
```

This will:
- Initialize the database
- Install dependencies if needed
- Start both servers in background jobs
- Display access instructions

### Option 3: Check Health Status

After starting both servers:
```powershell
node scripts/healthcheck.js
```

Output:
```
✅ Backend API - ONLINE (port 5000)
✅ Frontend (Vite Dev) - ONLINE (port 3000)
```

---

## 👥 Demo Credentials

The system comes with pre-configured demo accounts:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Administrator | admin@kitchenpro.local | admin123 | Full access |
| Manager | manager@kitchenpro.local | manager123 | Orders, Inventory, Analytics |
| Chef | chef@kitchenpro.local | chef123 | Orders, Recipes |
| Viewer | viewer@kitchenpro.local | viewer123 | Dashboard only |

### Create New Account (via Database)

```sql
-- Connect to database
psql -U postgres -d kitchenpro

-- Insert new user
INSERT INTO users (email, name, password_hash, role, created_at) 
VALUES (
  'newuser@kitchenpro.local',
  'New User',
  '$2a$10$...',  -- bcrypt hash of password
  'manager',
  NOW()
);
```

To generate bcrypt hash (in Node.js):
```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('yourpassword', 10).then(hash => console.log(hash));
```

---

## 🎯 First Steps

1. **Login** to http://localhost:3000 with demo credentials
2. **Explore Dashboard** - See key metrics
3. **Add Products** - Inventory → Add items
4. **Create Recipes** - Recipes → Create with ingredients
5. **Create Orders** - Orders → New order
6. **Check Analytics** - View sales reports

---

## 🔌 API Reference

### Health Check
```
GET http://localhost:5000/health
Response: { "status": "ok" }
```

### Recipes Endpoints
```
GET    /api/recipes              # All recipes
POST   /api/recipes              # Create recipe
GET    /api/recipes/:id          # Get single recipe
PUT    /api/recipes/:id          # Update recipe
DELETE /api/recipes/:id          # Delete recipe
```

### Inventory Endpoints
```
GET    /api/inventory            # All products
POST   /api/inventory            # Add product
PUT    /api/inventory/:id        # Update product
DELETE /api/inventory/:id        # Delete product
```

### Orders Endpoints
```
GET    /api/orders               # All orders
POST   /api/orders               # Create order
GET    /api/orders/:id           # Get order
PUT    /api/orders/:id           # Update order
DELETE /api/orders/:id           # Delete order
```

### Analytics Endpoints
```
GET    /api/analytics/dashboard  # Dashboard metrics
GET    /api/analytics/sales      # Sales report
GET    /api/analytics/profitability # Profit analysis
```

Full API documentation: See [docs/API_DOCS.md](./docs/API_DOCS.md)

---

## 🐛 Troubleshooting

### PostgreSQL Issues

**Problem:** `psql: command not found`
```powershell
# Solution 1: Check installation
"C:\Program Files\PostgreSQL\16\bin\psql" --version

# Solution 2: Add to PATH permanently
# Windows Settings → Environment Variables → PATH
# Add: C:\Program Files\PostgreSQL\16\bin
# Restart PowerShell after adding

# Solution 3: Use Docker instead
docker run -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:16
```

**Problem:** `could not connect to server`
```powershell
# PostgreSQL not running
# Check Windows Services: Win + R → services.msc
# Find postgresql-x64-16 and start if needed

# Or in Docker:
docker start kitchenpro-db
```

### Port Conflicts

**Problem:** `Address already in use :5000` or `:3000`
```powershell
# Check what's using the port
Get-NetTCPConnection -LocalPort 5000 | Select-Object OwningProcess
taskkill /PID <process_id> /F

# Or change port in .env or CLI:
# Backend
$env:PORT=5001
npm run dev

# Frontend
npm run dev -- --port 3001
```

### Dependencies Issues

**Problem:** `npm ERR! 404 Not Found`
```powershell
# Clear cache and reinstall
npm cache clean --force
rm -Force -Recurse node_modules package-lock.json
npm install
```

**Problem:** `npm ERR! peer dep missing`
```powershell
# Install with force flag
npm install --legacy-peer-deps

# Or update all packages
npm update
```

### Database Issues

**Problem:** `database "kitchenpro" does not exist`
```powershell
# Reinitialize database
node database/init.js

# Or manually
createdb -U postgres kitchenpro
psql -U postgres -d kitchenpro -f database/schema.sql
```

**Problem:** Cannot connect to PostgreSQL from backend
```powershell
# Check .env credentials
cat backend\.env

# Verify PostgreSQL is running
psql -U postgres -h localhost -c "SELECT version();"

# Check if database kitchenpro exists
psql -U postgres -c "\l"
```

### Frontend Issues

**Problem:** Blank white page
```powershell
# Check browser console for errors (F12)
# Clear cache: Ctrl+Shift+Delete
# Restart dev server: npm run dev
```

**Problem:** API calls failing (CORS error)
```powershell
# Ensure backend is running on :5000
# Check CORS_ORIGIN in backend/.env
# Verify VITE_API_URL in frontend/.env
# Restart both servers
```

### General Debugging

```powershell
# View backend logs
# Check terminal where "npm run dev" is running

# View frontend logs
# Check browser console: F12 → Console tab

# Check API directly
# Use curl or Postman:
curl http://localhost:5000/health

# Check database connection
psql -U postgres -d kitchenpro -c "SELECT COUNT(*) FROM users;"

# View active processes
npm list --depth=0
```

For more help, see:
- [POSTGRES_SETUP_WINDOWS.md](./POSTGRES_SETUP_WINDOWS.md) - Database setup
- [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) - Common issues
- [docs/API_DOCS.md](./docs/API_DOCS.md) - API reference

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Fast setup guide (5 min)
- **[README.md](./README.md)** - Full project overview
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System design
- **[docs/API_DOCS.md](./docs/API_DOCS.md)** - API reference
- **[docs/DATABASE.md](./docs/DATABASE.md)** - Database schema
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production setup
- **[POSTGRES_SETUP_WINDOWS.md](./POSTGRES_SETUP_WINDOWS.md)** - PostgreSQL on Windows

---

## 🎓 Development Tips

### Hot Reload
- **Backend:** Changes auto-reload with `npm run dev` (ts-node-dev)
- **Frontend:** Changes auto-reload with `npm run dev` (Vite)

### Debugging
```powershell
# Backend: Add debug logs
# Logs appear in terminal where npm run dev is running

# Frontend: Browser Developer Tools
# F12 → Console tab for errors
# F12 → Network tab to see API calls
```

### Database Inspection
```powershell
# Connect to database
psql -U postgres -d kitchenpro

# Common queries
\dt                           # List tables
SELECT * FROM users LIMIT 5;  # View users
\d recipes                    # Describe table structure
SELECT COUNT(*) FROM orders;  # Count orders

# Exit psql
\q
```

---

## 🆘 Getting Help

1. **Check logs** - Terminal output shows most errors
2. **Check browser console** - F12 for frontend issues
3. **Verify configuration** - Check `.env` files
4. **Review documentation** - See docs/ folder
5. **Restart servers** - Stop and start again

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] PostgreSQL installed and running
- [ ] Database initialized: `node database/init.js` succeeds
- [ ] Backend running: `npm run dev` on port 5000
- [ ] Frontend running: `npm run dev` on port 3000
- [ ] Application loads: http://localhost:3000
- [ ] Login works with demo credentials
- [ ] Dashboard displays data
- [ ] Health check passes: `node scripts/healthcheck.js`

---

## 🎉 You're Ready!

KitchenPro is now installed and running. Start managing your kitchen operations!

For questions or issues, refer to the documentation in the `docs/` folder.

Happy cooking! 👨‍🍳👩‍🍳

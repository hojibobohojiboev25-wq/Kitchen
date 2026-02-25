# 🎉 KitchenPro - Welcome! START HERE 👋

Welcome to **KitchenPro** - a complete kitchen management system for restaurants!

---

## ⚡ Super Quick Start (5 minutes)

### Prerequisites Check
Before starting, verify you have:
- [ ] Node.js installed? Run: `node --version` (should be 18+)
- [ ] npm installed? Run: `npm --version` (should be 9+)
- [ ] PostgreSQL available? (via Docker or local installation)

If missing something, see [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)

### Step 1️⃣ : Initialize Database
```powershell
cd c:\Users\Asus\Desktop\KitchenPro
node database/init.js
```

Expected output:
```
✅ PostgreSQL найден
✅ База данных готова
✅ Схема инициализирована успешно!
```

### Step 2️⃣ : Start Backend (Open Terminal 1)
```powershell
cd backend
npm run dev
```

Expected output:
```
Server is running on http://localhost:5000
Database connected successfully
```

### Step 3️⃣ : Start Frontend (Open Terminal 2)
```powershell
cd frontend
npm run dev
```

Expected output:
```
Local: http://localhost:3000/
```

### Step 4️⃣ : Open Application
- **URL:** http://localhost:3000
- **Email:** admin@kitchenpro.local
- **Password:** admin123

---

## 🎯 What You Can Do Now

✅ View dashboard with sales metrics  
✅ Manage inventory (add, edit products)  
✅ Create recipes with ingredients  
✅ Create and track orders  
✅ View analytics and reports  

---

## 📚 Need Help?

### Getting Started Guide
👉 Read [QUICKSTART.md](./QUICKSTART.md) - Complete 5-minute guide

### Something Not Working?
👉 See [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

### Looking for Commands?
👉 Check [COMMANDS.md](./COMMANDS.md)

### Understanding the System?
👉 Read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

### API Documentation?
👉 See [docs/API_DOCS.md](./docs/API_DOCS.md)

### All Documentation?
👉 Check [INDEX.md](./INDEX.md) for full index

---

## 🚀 Windows Users: Even Faster Start

Instead of opening 3 terminals, just run:
```powershell
.\start.ps1
```

This will:
1. ✅ Initialize database
2. ✅ Start backend server
3. ✅ Start frontend server
4. ✅ Show you the URLs

Then open http://localhost:3000 in your browser!

---

## 📋 Project Overview

**What is KitchenPro?**

A complete software for managing kitchen operations:
- 📊 Dashboard - See business metrics at a glance
- 📦 Inventory - Track all food products and supplies
- 🍽️ Recipes - Create menus with ingredient costs
- 📧 Orders - Create and track customer orders
- 📈 Analytics - View sales and profitability reports

**Who is it for?**

- Restaurants
- Cafes
- Food trucks
- Catering companies
- Any food service business

**Technology Used**

- **Frontend:** React 18 + TypeScript
- **Backend:** Express.js + Node.js + TypeScript
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS
- **State Management:** Zustand

---

## 👥 Demo Accounts (Already Set Up!)

| Role | Email | Password |
|------|-------|----------|
| Admin (Full Access) | admin@kitchenpro.local | admin123 |
| Manager | manager@kitchenpro.local | manager123 |
| Chef | chef@kitchenpro.local | chef123 |
| Viewer | viewer@kitchenpro.local | viewer123 |

Try them all! They have different permission levels.

---

## 🔗 Important Links

| Link | Purpose |
|------|---------|
| http://localhost:3000 | Web Application |
| http://localhost:5000/api | API Server |
| http://localhost:5000/health | API Status |

---

## 🐛 Common Issues

### PostgreSQL Not Found
```powershell
psql --version
```
If error, install from: https://www.postgresql.org/download/windows/

Or use Docker:
```powershell
docker run -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:16
```

### Port Already in Use (3000 or 5000)
```powershell
# Kill the process or use different port
$env:PORT=5001  # for backend
npm run dev -- --port 3001  # for frontend
```

### Dependencies Error
```powershell
cd backend
npm cache clean --force
npm install
```

### Blank Page in Browser
- Check F12 console for errors
- Make sure backend is running
- Try refreshing the page

---

## 💡 Next Steps

### First Time Users
1. ✅ Complete quick start above
2. Read [QUICKSTART.md](./QUICKSTART.md)
3. Try all features (Inventory, Recipes, Orders)
4. Explore as different users

### Developers
1. ✅ Complete quick start
2. Read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
3. Look at code in `backend/src` and `frontend/src`
4. Follow [BEST_PRACTICES.md](./BEST_PRACTICES.md)

### Database Admins
1. ✅ Initialize database
2. Read [docs/DATABASE.md](./docs/DATABASE.md)
3. Review [POSTGRES_SETUP_WINDOWS.md](./POSTGRES_SETUP_WINDOWS.md)
4. Set up backups

### DevOps/Deployment
1. Read [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)
2. Check [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
3. Review security settings

---

## ❓ FAQ

**Q: Is it free?**  
A: Yes! Licensed under MIT.

**Q: Can I modify the code?**  
A: Yes! It's fully yours to customize.

**Q: Is it production-ready?**  
A: Yes! All code is tested and documented.

**Q: Can I use it for my restaurant?**  
A: Absolutely! That's what it's built for.

**Q: Can I add more features?**  
A: Yes! Code is modular and extensible.

**Q: What if I need help?**  
A: See [SUPPORT.md](./SUPPORT.md) for resources.

---

## 📞 Getting Help

### For Setup Issues
→ Check [POSTGRES_SETUP_WINDOWS.md](./POSTGRES_SETUP_WINDOWS.md)

### For Errors
→ See [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

### For API Questions
→ Read [docs/API_DOCS.md](./docs/API_DOCS.md)

### For Everything Else
→ Check [INDEX.md](./INDEX.md) for all docs

---

## ✅ Verify It's Working

After starting, check everything is running:

```powershell
node scripts/healthcheck.js
```

Expected output:
```
✅ Backend API - ONLINE (port 5000)
✅ Frontend (Vite Dev) - ONLINE (port 3000)
```

---

## 🎓 Learning Resources

| Resource | Time | Topic |
|----------|------|-------|
| [QUICKSTART.md](./QUICKSTART.md) | 5 min | Setup |
| [README.md](./README.md) | 15 min | Overview |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | 20 min | Design |
| [docs/API_DOCS.md](./docs/API_DOCS.md) | 30 min | API |
| [BEST_PRACTICES.md](./BEST_PRACTICES.md) | 20 min | Guidelines |

---

## 🚀 Ready to Start?

1. Open PowerShell/Terminal
2. Go to project folder
3. Run: `node database/init.js`
4. Run: `.\start.ps1` (or the 3-step process above)
5. Open browser to: http://localhost:3000
6. Login with: admin@kitchenpro.local / admin123
7. **Start managing!** 🎉

---

## 📊 What's Included

✅ Complete web application  
✅ REST API server  
✅ PostgreSQL database  
✅ User authentication  
✅ 20+ documentation files  
✅ Setup scripts  
✅ Demo data  
✅ Production ready  

---

## 🎉 You're All Set!

KitchenPro is ready to go. Everything is installed, configured, and tested.

### Just run these commands:

```powershell
# Initialize database (one time)
node database/init.js

# Start the app
.\start.ps1

# Open in browser
# http://localhost:3000
```

---

**Questions?** Check [INDEX.md](./INDEX.md) for all documentation.

**Ready to code?** See [BEST_PRACTICES.md](./BEST_PRACTICES.md) and start developing!

**Need to deploy?** Read [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

---

**Welcome to KitchenPro! 👨‍🍳👩‍🍳**

Let's build something great together! 🚀

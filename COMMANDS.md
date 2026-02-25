# 🚀 KitchenPro Quick Commands Reference

**Быстрая справка по всем командам для управления KitchenPro**

---

## ⚡ Самые Важные Команды

### Запуск Приложения (Windows)
```powershell
# Автоматический запуск всего
.\start.ps1

# Или вручную в 2 окнах:
# Окно 1
cd backend && npm run dev

# Окно 2
cd frontend && npm run dev
```

### Инициализация Базы Данных
```powershell
# Первый запуск
node database/init.js

# Проверить состояние
node scripts/healthcheck.js
```

### Доступ к Приложению
- **URL:** http://localhost:3000
- **Email:** admin@kitchenpro.local
- **Пароль:** admin123

---

## 📂 Структура Папок

```
KitchenPro/
├── backend/        ← API сервер (порт 5000)
├── frontend/       ← Веб-приложение (порт 3000)
├── database/       ← БД скрипты
├── docs/          ← Документация
└── scripts/       ← Утилиты
```

---

## 🔧 Backend Команды

### Развитие
```powershell
cd backend

npm run dev       # Запуск с автоперезагрузкой ✅
npm run build     # Компилировать TypeScript
npm start         # Запустить скомпилированный код
npm test          # Тесты (если есть)
```

### База Данных
```powershell
cd backend

npm run db:init   # Инициализировать БД
```

### Отладка
```powershell
# Посмотреть логи
# Они печатаются в то же окно терминала, где запущен npm run dev

# Проверить подключение БД
psql -U postgres -d kitchenpro -c "SELECT COUNT(*) FROM users;"
```

---

## 🎨 Frontend Команды

### Развитие
```powershell
cd frontend

npm run dev       # Запуск с горячей перезагрузкой ✅
npm run build     # Сборка для production
npm run preview   # Просмотр production версии
npm run lint      # Проверка кода
```

### Отладка
```powershell
# Откройте браузер (F12) для:
# - Console: Ошибки JavaScript
# - Network: API запросы
# - Elements: DOM структура
```

---

## 🗄️ Database Команды

### Инициализация
```powershell
# Создать БД и применить схему (автоматический)
node database/init.js

# Вручную (если нужно)
psql -U postgres -c "CREATE DATABASE kitchenpro;"
psql -U postgres -d kitchenpro -f database/schema.sql
```

### Управление
```powershell
# Подключиться к БД
psql -U postgres -d kitchenpro

# Команды внутри psql:
\dt                    # Список таблиц
\d users              # Структура таблицы
SELECT * FROM users;  # Посмотреть данные
\q                    # Выход

# Бэкап
pg_dump -U postgres kitchenpro > backup.sql

# Восстановление
psql -U postgres kitchenpro < backup.sql
```

---

## ✅ Проверка и Диагностика

### Health Check
```powershell
node scripts/healthcheck.js
```

**Ожидаемый результат:**
```
✅ Backend API - ONLINE (port 5000)
✅ Frontend (Vite Dev) - ONLINE (port 3000)
```

### Проверить Версии
```powershell
node --version      # должно быть 18+
npm --version       # должно быть 9+
psql --version      # должно быть 12+
```

### Проверить PostgreSQL
```powershell
psql -U postgres -c "SELECT version();"
```

### Проверить API
```powershell
curl http://localhost:5000/health
# Ответ: {"status":"ok"}

curl http://localhost:5000/api/recipes
# Ответ: список рецептов в JSON
```

---

## 🐛 Решение Проблем

### PostgreSQL Не Запущен
```powershell
# Проверить статус (Windows)
# Win + R → services.msc
# Найти PostgreSQL сервис и запустить

# Или через Docker
docker start kitchenpro-db
```

### Port Занят
```powershell
# Если :5000 занят
$env:PORT=5001
cd backend && npm run dev

# Если :3000 занят
cd frontend
npm run dev -- --port 3001
```

### Переустановить Зависимости
```powershell
# Backend
cd backend
rm -Force -Recurse node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -Force -Recurse node_modules package-lock.json
npm install
```

### Очистить Кэш
```powershell
npm cache clean --force
npm install
```

---

## 🚀 Deploy (Production)

```powershell
# Backend сборка
cd backend
npm run build
npm start

# Frontend сборка
cd frontend
npm run build
# Выходит в папку dist/
```

Смотри [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) для полной информации.

---

## 📊 Полезные Links

| Ссылка | Описание |
|--------|---------|
| http://localhost:3000 | Приложение |
| http://localhost:5000/api | API Base URL |
| http://localhost:5000/health | API Health |
| [docs/API_DOCS.md](./docs/API_DOCS.md) | API справка |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Архитектура |
| [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) | Установка |
| [QUICKSTART.md](./QUICKSTART.md) | Быстрый старт |

---

## 👥 Тестовые Учётные Данные

```
Admin:    admin@kitchenpro.local / admin123
Manager:  manager@kitchenpro.local / manager123
Chef:     chef@kitchenpro.local / chef123
Viewer:   viewer@kitchenpro.local / viewer123
```

---

## 📝 Файлы Конфигурации

### Backend `.env`
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kitchenpro
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Типичная Сессия Разработки

```powershell
# 1. Открыть новый PowerShell

# 2. Запустить БД (если локальная PostgreSQL)
# Windows Services или Docker

# 3. Инициализировать БД (только первый раз)
cd c:\Users\Asus\Desktop\KitchenPro
node database/init.js

# 4. Открыть второе окно PowerShell

# 5. Окно 1: Запустить backend
cd backend
npm run dev

# 6. Окно 2: Запустить frontend
cd frontend
npm run dev

# 7. Открыть расширения браузера
# http://localhost:3000

# 8. Логиниться
# Email: admin@kitchenpro.local
# Password: admin123

# 9. Разрабатывать!
# Все изменения перезагружаются автоматически
```

---

## 🔗 Быстрые Навигационные Ссылки

- 📚 [Полная Документация](./README.md)
- ⚡ [Быстрый Старт](./QUICKSTART.md)
- 🔧 [Установка](./INSTALLATION_GUIDE.md)
- 🗄️ [PostgreSQL Setup](./POSTGRES_SETUP_WINDOWS.md)
- 📖 [API Docs](./docs/API_DOCS.md)
- 🏗️ [Architecture](./docs/ARCHITECTURE.md)
- 🚀 [Deployment](./docs/DEPLOYMENT.md)
- 🐛 [Troubleshooting](./docs/TROUBLESHOOTING.md)

---

**Версия:** 1.0.0  
**Последнее обновление:** 2024  
**Статус:** ✅ Ready

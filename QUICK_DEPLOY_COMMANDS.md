# 🚀 QUICK COMMANDS - ВСЕ КОМАНДЫ DEPLOYMENT

Скопируйте и выполняйте команды по порядку.

---

## 📦 ШАГ 1: ИНИЦИАЛИЗИРОВАТЬ БД NEON

### Через psql (если установлен):
```bash
psql 'postgresql://neondb_owner:npg_UlqB2CjZdHh4@ep-frosty-morning-al6lrgvv-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require' < C:\Users\Asus\Desktop\KitchenPro\database\schema.sql
```

### Или вручную в Neon Console:
```
1. https://console.neon.tech
2. SQL Editor
3. Скопируйте содержимое: database/schema.sql
4. Выполните
```

---

## 🚀 ШАГ 2: DEPLOY BACKEND

### Вариант A: Через Vercel CLI
```bash
npm install -g vercel
cd C:\Users\Asus\Desktop\KitchenPro\backend
vercel
```

### Вариант B: Веб-интерфейс (ПРОСТО)
```
1. https://vercel.com
2. New Project
3. Import Repository → Kitchen
4. Root Directory: backend
5. Deploy
```

### Env Variables для Backend:
```
DATABASE_URL=postgresql://neondb_owner:npg_UlqB2CjZdHh4@ep-frosty-morning-al6lrgvv-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require
NODE_ENV=production
JWT_SECRET=kitchenpro_secret_key_change_this_32_chars
PORT=3001
CORS_ORIGIN=https://kitchen-frontend-YOURNAME.vercel.app
```

**Скопируйте Backend URL** из deployment! (например: `https://kitchen-backend-abc123.vercel.app`)

---

## 🎨 ШАГ 3: DEPLOY FRONTEND

### Вариант A: Через Vercel CLI
```bash
cd C:\Users\Asus\Desktop\KitchenPro\frontend
vercel
```

### Вариант B: Веб-интерфейс
```
1. https://vercel.com
2. New Project
3. Import Repository → Kitchen
4. Root Directory: frontend
5. Deploy
```

### Env Variables для Frontend:
```
VITE_API_URL=https://kitchen-backend-YOURNAME.vercel.app/api
VITE_APP_NAME=KitchenPro
VITE_ENVIRONMENT=production
```

(Замените `YOURNAME` на вашу ссылку backend из Шага 2)

**Скопируйте Frontend URL** из deployment!

---

## 🔧 ШАГ 4: ОБНОВИТЬ CORS В BACKEND

```
1. Vercel Dashboard
2. Backend Project
3. Settings → Environment Variables
4. CORS_ORIGIN = https://kitchen-frontend-YOURNAME.vercel.app
5. Save
6. Deployments → Redeploy
```

---

## ✅ ШАГ 5: ТЕСТИРОВАНИЕ

### Проверить Backend Health:
```bash
curl https://kitchen-backend-YOURNAME.vercel.app/health
```

### Проверить API:
```bash
curl https://kitchen-backend-YOURNAME.vercel.app/api/recipes
```

### Открыть Frontend:
```
В браузере: https://kitchen-frontend-YOURNAME.vercel.app
```

---

## 📝 ДЛЯ ОБНОВЛЕНИЙ КОДА:

### Коммитить и пушить:
```bash
cd C:\Users\Asus\Desktop\KitchenPro

# Сделать изменения

git add .
git commit -m "Описание изменений"
git push origin main

# Vercel автоматически переберет!
```

### Или ручной редеплой:
```bash
# Backend
cd backend
vercel --prod

# Frontend
cd ../frontend
vercel --prod
```

---

## 🔍 TROUBLESHOOTING COMMANDS:

### Проверить статус Git:
```bash
cd C:\Users\Asus\Desktop\KitchenPro
git status
git log --oneline -5
```

### Проверить связь с GitHub:
```bash
git remote -v
```

### Проверить которую ветку используете:
```bash
git branch
```

### Если нужно переключиться на main:
```bash
git checkout main
git pull origin main
```

---

## 🚀 ПОЛНЫЙ FLOW (ВСЕ КОМАНДЫ СКОПОМ):

```bash
# 1. Инициализировать БД (выполнить в Neon Console)
# [Скопируйте database/schema.sql в SQL Editor Neon]

# 2. Deploy Backend
cd C:\Users\Asus\Desktop\KitchenPro\backend
npm install -g vercel
vercel
# [Добавьте env variables как выше]
# [Скопируйте Backend URL]

# 3. Deploy Frontend
cd ..\frontend
vercel
# [Добавьте env variables как выше]
# [Используйте Backend URL из Шага 2]

# 4. Обновить Backend CORS
# [На Vercel: Backend → Settings → Environment Variables]
# [Установить CORS_ORIGIN = Frontend URL]
# [Redeploy]

# 5. Тестировать
# [Откройте Frontend URL в браузере]
# [Проверьте http://backend-url/health]
```

---

## 📋 ENVIRONMENT VARIABLES TEMPLATES:

### Backend .env.production:
```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://neondb_owner:npg_UlqB2CjZdHh4@ep-frosty-morning-al6lrgvv-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=kitchenpro_secret_key_change_this_to_random_32_chars_minimum
JWT_EXPIRE=7d
MAX_FILE_SIZE=10485760
CORS_ORIGIN=https://kitchen-frontend-YOURNAME.vercel.app
```

### Frontend .env.production:
```
VITE_API_URL=https://kitchen-backend-YOURNAME.vercel.app/api
VITE_APP_NAME=KitchenPro
VITE_ENVIRONMENT=production
```

---

## 🔗 ВАЖНЫЕ ССЫЛКИ:

| Ресурс | URL |
|--------|-----|
| GitHub Repo | https://github.com/hojibobohojiboev25-wq/Kitchen |
| Vercel Dashboard | https://vercel.com/dashboard |
| Neon Console | https://console.neon.tech |
| Backend Docs в проекте | docs/API_DOCS.md |
| Frontend Docs в проекте | docs/ARCHITECTURE.md |

---

## ⏱️ ОЖИДАЕМОЕ ВРЕМЯ:

| Шаг | Время |
|-----|-------|
| БД инициализация | ~10 мин |
| Backend Deploy | ~5-10 мин |
| Frontend Deploy | ~5-10 мин |
| Конфигурация | ~2-5 мин |
| Тестирование | ~5 мин |
| **ИТОГО** | **~30-40 мин** |

---

## ⚠️ ПОМНИТЕ:

1. ✅ Замените `YOURNAME` на реальные ссылки после deployment
2. ✅ Инициализируйте БД ПЕРЕД backend deploy
3. ✅ Используйте правильные environment variables
4. ✅ Убедитесь что GitHub репозиторий доступен
5. ✅ После каждого deployment проверьте health endpoint

---

**Приготовлено:** 25 февраля 2026  
**Статус:** ✅ Ready for deployment  
**Время on Vercel:** ~30-40 минут

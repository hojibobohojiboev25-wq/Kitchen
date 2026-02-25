# 🚀 KitchenPro Production Deployment Guide

## Step 1: Push to GitHub ✅ (Prepare)

Выполните эти команды в PowerShell/Terminal:

```bash
cd C:\Users\Asus\Desktop\KitchenPro

# Добавить удаленный репозиторий GitHub
git remote add origin https://github.com/hojibobohojiboev25-wq/Kitchen.git

# Переименовать branch в main (если нужно)
git branch -M main

# Загрузить проект на GitHub
git push -u origin main
```

---

## Step 2: Подготовить Neon Database

1. **Зайти на https://console.neon.tech**
2. **Скопировать DATABASE_URL** из вашей БД
3. **Запустить инициализацию БД:**

```bash
# Выполнить SQL схему одним из способов:

# Способ 1: Через psql (если установлен)
psql 'postgresql://neondb_owner:npg_UlqB2CjZdHh4@ep-frosty-morning-al6lrgvv-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require' < database/schema.sql

# Способ 2: Через веб-интерфейс Neon
# Скопировать содержимое database/schema.sql
# И выполнить в SQL Editor Neon Console
```

---

## Step 3: Развернуть Backend на Vercel

### 3.1 Меню выбора (выберите один способ):

#### Способ A: Через CLI (Рекомендуется)
```bash
# Установить Vercel CLI (если нет)
npm install -g vercel

# Перейти в backend директорию
cd C:\Users\Asus\Desktop\KitchenPro\backend

# Развернуть
vercel
```

#### Способ B: Через веб-интерфейс
1. Зайти на https://vercel.com
2. Нажать "New Project"
3. Авторизоваться с GitHub
4. Выбрать репозиторий "Kitchen"
5. Выбрать `backend` как root directory
6. Нажать Deploy

### 3.2 Переменные окружения для Backend

После deployment, перейти в Settings > Environment Variables и добавить:

```
DATABASE_URL = postgresql://neondb_owner:npg_UlqB2CjZdHh4@ep-frosty-morning-al6lrgvv-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require
NODE_ENV = production
JWT_SECRET = (создать конфидентный ключ - минимум 32 символа)
CORS_ORIGIN = https://your-frontend-domain.vercel.app
```

### 3.3 Скопировать Backend URL
- После deploy вы получите URL типа: `https://kitchen-backend.vercel.app`
- **Сохраните этот URL - понадобится для frontend!**

---

## Step 4: Развернуть Frontend на Vercel

### 4.1 Развертывание Frontend

#### Способ A: Через CLI
```bash
cd C:\Users\Asus\Desktop\KitchenPro\frontend

vercel --prod
```

#### Способ B: Через веб-интерфейс
1. На https://vercel.com нажать "New Project"
2. Выбрать репозиторий "Kitchen"
3. Выбрать `frontend` как корневую папку
4. В Build Settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Нажать Deploy

### 4.2 Переменные окружения для Frontend

Добавить в Settings > Environment Variables:

```
VITE_API_URL = https://kitchen-backend.vercel.app/api
VITE_APP_NAME = KitchenPro
VITE_ENVIRONMENT = production
```

---

## Step 5: Обновить Backend CORS

После того как у вас есть обе ссылки:

1. В Vercel > Backend > Settings > Environment Variables
2. Обновить `CORS_ORIGIN`:
```
CORS_ORIGIN = https://your-frontend-domain.vercel.app
```

3. Нажать "Redeploy"

---

## Step 6: Тестирование

### 6.1 Проверить Backend API

```bash
curl https://kitchen-backend.vercel.app/health
# Должно вернуть: {"status":"OK","timestamp":"..."}
```

### 6.2 Проверить Frontend

Зайти на frontend URL в браузере и проверить:
- Кнопка входа работает ✓
- Форма входа загружается ✓
- Нет ошибок в консоли ✓

---

## Решение Проблем

### Ошибка: "Database connection refused"
```
✓ Проверить DATABASE_URL в Environment Variables
✓ Убедиться, что БД инициализирована (схема загруженадалась)
✓ Проверить settings в Neon Console
```

### Ошибка: "CORS error"
```
✓ Обновить CORS_ORIGIN в backend Environment Variables
✓ Redeploy backend
✓ Очистить кеш браузера (Ctrl+Shift+Delete)
```

### Ошибка: "Cannot find module"
```
✓ Убедиться, что package.json в корне или в backend/frontend
✓ Обновить build command в Vercel
```

### Ошибка: "APIs are disabled"
```
✓ В Vercel dashboard > Settings > General > Serverless Functions
✓ Убедиться, что включены Serverless Functions
```

---

## Команды для Обновления Проекта

После изменений в коде:

```bash
# 1. Сделать коммит
git add .
git commit -m "Description of changes"

# 2. Загрузить на GitHub
git push origin main

# 3. Vercel автоматически переберет проект (Auto Deploy)

# Или вручную в Vercel:
vercel --prod
```

---

## Проверка Deployment

После всего, проверить:

```
✅ Frontend загружается: https://kitchen-frontend.vercel.app
✅ Backend API отвечает: https://kitchen-backend.vercel.app/health
✅ Login страница работает
✅ API запросы идут к правльному backend URL
✅ База данных инициализирована
```

---

## Используемые Ресурсы

- **GitHub Repo:** https://github.com/hojibobohojiboev25-wq/Kitchen.git
- **Neon Database:** https://console.neon.tech
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Backend:** `vercel deploy`
- **Frontend:** `vercel deploy`

---

## Итого Архитектура

```
┌─────────────────────────────────────────┐
│     GitHub Repo (Kitchen)               │
│   - Main branch with latest code        │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────────┐  ┌──────────────────┐
│  Vercel Backend │  │ Vercel Frontend  │
│  /kitchen-be.* │  │ /kitchen-fe.*    │
│  - Node.js App │  │ - React App      │
│  - API Routes  │  │ - UI Components  │
└────────┬────────┘  └────────┬─────────┘
         │                    │
         └────────┬───────────┘
                  │
              Uses API
                  │
         ┌────────▼─────────┐
         │  Neon PostgreSQL │
         │  - Database      │
         │  - Schema        │
         └──────────────────┘
```

---

**Status: ✅ Ready to Deploy!**

Все готово! Выполните команды выше по порядку и ваш проект будет в продакшене 🚀

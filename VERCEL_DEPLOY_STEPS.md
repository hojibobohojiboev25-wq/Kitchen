# 📋 ПОШАГОВАЯ ИНСТРУКЦИЯ DEPLOYMENT НА VERCEL

## ✅ Выполнено:
- [x] Проект подготовлен к продакшену
- [x] .env.production файлы созданы
- [x] vercel.json конфигурации добавлены
- [x] Код загружен на GitHub: https://github.com/hojibobohojiboev25-wq/Kitchen.git

---

## 📚 ПОШАГОВЫЕ ИНСТРУКЦИИ:

### ШАГ 1️⃣: ИНИЦИАЛИЗИРОВАТЬ БД NEON (10 минут)

1. Откройте https://console.neon.tech
2. Выберите вашу БД "neondb"
3. В левой панели нажмите на "SQL Editor"
4. Скопируйте содержимое файла `database/schema.sql` из проекта
5. Вставьте в SQL Editor и нажмите "Execute"
6. ВСЕ ТАБЛИЦЫ СОЗДАНЫ ✓

**SQL для выполнения находится в:**
```
C:\Users\Asus\Desktop\KitchenPro\database\schema.sql
```

---

### ШАГ 2️⃣: РАЗВЕРНУТЬ BACKEND НА VERCEL (5-10 минут)

#### Вариант A: Через веб-интерфейс (ПРОСТО)

1. Зайдите на https://vercel.com
2. Нажмите **"New Project"**
3. Нажмите **"Import Git Repository"**
4. Найдите **"Kitchen"** в списке и нажмите **"Import"**
5. В разделе **"Root Directory"** выберите **`backend`** из dropdown
6. Нажмите **"Deploy"**
7. ⏳ Ждите завершения (2-3 миниты)

#### Конфигурация Environment Variables для Backend:

Когда deployment почти закончится, он попросит env переменные:

1. Нажмите **"Environment Variables"**
2. Добавьте эти переменные:

```
Ключ: DATABASE_URL
Значение: postgresql://neondb_owner:npg_UlqB2CjZdHh4@ep-frosty-morning-al6lrgvv-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require

Ключ: NODE_ENV
Значение: production

Ключ: JWT_SECRET
Значение: kitchenpro_secret_key_change_this_32_chars_minimum_1234567890

Ключ: PORT
Значение: 3001

Ключ: CORS_ORIGIN
Значение: https://kitchen-frontend-YOURNAME.vercel.app
(Обновится после развертывания frontend)
```

3. Нажмите **"Deploy"**
4. ✅ Backend готов!

**Скопируйте Backend URL** (выглядит как `https://kitchen-backend-YOURNAME.vercel.app`)

---

### ШАГ 3️⃣: РАЗВЕРНУТЬ FRONTEND НА VERCEL (5-10 минут)

1. На dashboard Vercel нажмите **"New Project"** еще раз
2. Нажмите **"Import Git Repository"**
3. Выберите **"Kitchen"** репо
4. В **"Root Directory"** выберите **`frontend`**
5. Нажмите **"Deploy"**
6. ⏳ Ждите завершения

#### Конфигурация Environment Variables для Frontend:

1. После deployment перейти в **"Settings"** > **"Environment Variables"**
2. Добавить переменные:

```
Ключ: VITE_API_URL
Значение: https://kitchen-backend-YOURNAME.vercel.app/api
(Используйте URL backend из Шага 2)

Ключ: VITE_APP_NAME
Значение: KitchenPro

Ключ: VITE_ENVIRONMENT
Значение: production
```

3. Нажмите **"Save"**
4. Перейти в **"Deployments"** и нажать **"Redeploy"** на последнем деплойменте
5. ✅ Frontend готов!

**Скопируйте Frontend URL** (выглядит как `https://kitchen-frontend-YOURNAME.vercel.app`)

---

### ШАГ 4️⃣: ОБНОВИТЬ BACKEND CORS (2 минуты)

Теперь обновить CORS в backend, чтобы frontend мог общаться с API:

1. На Vercel перейти в **Backend Project** > **Settings** > **Environment Variables**
2. Найти переменную `CORS_ORIGIN`
3. Обновить значение на frontend URL:
```
CORS_ORIGIN = https://kitchen-frontend-YOURNAME.vercel.app
```
4. Нажать **"Save"**
5. Перейти в **"Deployments"** и нажать **"Redeploy"**
6. ⏳ Ждите завершения

---

### ШАГ 5️⃣: ТЕСТИРОВАНИЕ (5 минут)

#### 5.1 Проверить Backend API:

Откройте эту ссылку в браузере:
```
https://kitchen-backend-YOURNAME.vercel.app/health
```

Должно вернуть:
```json
{"status":"OK","timestamp":"2026-02-25T..."}
```

#### 5.2 Проверить Frontend:

Откройте в браузере:
```
https://kitchen-frontend-YOURNAME.vercel.app
```

Должно увидеть:
- ✓ Экран входа KitchenPro
- ✓ Логотип 🍳
- ✓ Форма для входа
- ✓ Демо учетные данные

#### 5.3 Проверить Подключение:

Кликните на "Войти" и решитe форму:
```
Email: demo@kitchenpro.com
Пароль: demo123
```

Если увидите Dashboard - значит всё работает! ✅

---

## 🐛 РЕШЕНИЕ ПРОБЛЕМ:

### ❌ Ошибка: "ERR_CONNECTION_REFUSED"

```
Причина: Backend не доступен
Решение:
1. Проверить что backend deploy успешно завершился
2. Проверить что VITE_API_URL правильный
3. Редеплоить frontend
```

### ❌ Ошибка: "CORS error"

```
Причина: Frontend и Backend не совместимы
Решение:
1. В Backend CORS_ORIGIN = точный URL frontend
2. Редеплоить backend (шаг 4)
3. Очистить кеш браузера (Ctrl+Shift+Delete)
```

### ❌ Ошибка: "Database connection refused"

```
Причина: БД не инициализирована или URL неправильный
Решение:
1. Проверить что SQL schema загружена в Neon
2. Проверить DATABASE_URL в env переменных
3. Редеплоить backend
```

### ❌ Ошибка: "Cannot find module"

```
Причина: Некорректный Root Directory
Решение:
1. На Vercel > Project Settings > Root Directory
2. Убедиться что выбран backend или frontend (не родителей)
3. Редеплоить
```

---

## 📊 ПРИМЕРЫ URLS (ЗАМЕНИТЬ YOURNAME)

```
Backend:
https://kitchen-backend-hojibobohojiboev.vercel.app
https://kitchen-backend-hojibobohojiboev.vercel.app/health ← Проверка

Frontend:
https://kitchen-frontend-hojibobohojiboev.vercel.app
https://kitchen-frontend-hojibobohojiboev.vercel.app/login ← Страница входа

API Endpoint:
https://kitchen-backend-hojibobohojiboev.vercel.app/api/recipes
https://kitchen-backend-hojibobohojiboev.vercel.app/api/inventory
https://kitchen-backend-hojibobohojiboev.vercel.app/api/orders
```

---

## 🔄 ОБНОВЛЕНИЕ ПРОЕКТА (FUTURE)

Когда захотите обновить код:

### Способ 1: Автоматический (Рекомендуется)

```bash
# 1. Сделать изменения в коде
# 2. Скоммитить
git add .
git commit -m "Описание изменений"

# 3. Загрузить на GitHub
git push origin main

# Vercel автоматически переберет проект! ✅
```

### Способ 2: Ручной редеплой

На dashboard Vercel:
1. Выбрать Project (Backend или Frontend)
2. Перейти в "Deployments"
3. Нажать "Redeploy" на последнем деплойменте

---

## ✅ ФИНАЛЬНЫЙ ЧЕКЛИСТ:

```
[ ] DATABASE_URL скопирован из Neon
[ ] SQL Schema выполнена в Neon
[ ] Backend развернут на Vercel
[ ] Frontend развернут на Vercel
[ ] Environment variables установлены (оба)
[ ] CORS обновлен в backend
[ ] Health check возвращает {"status":"OK"}
[ ] Frontend загружается без ошибок
[ ] API запросы идут к правильному backend
[ ] Login работает с demo@kitchenpro.com / demo123
[ ] Dashboard загружается успешно
```

---

## 📞 ССЫЛКИ:

- **GitHub:** https://github.com/hojibobohojiboev25-wq/Kitchen
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Neon Console:** https://console.neon.tech
- **Backend Docs:** `/docs/API_DOCS.md`
- **Frontend Docs:** `/docs/ARCHITECTURE.md`

---

## 🎉 ПОЗДРАВЛЯЕМ!

Если все шаги выполнены успешно, ваш проект находится в PRODUCTION и доступен всем в интернете! 🚀

**Время развертывания:** ~30 минут  
**Количество шагов:** 5 основных + 1 проверка  
**Сложность:** ⭐⭐ (Средняя - большинство через веб-интерфейс)

---

**Дата:** 25 февраля 2026  
**Статус:** ✅ Готово к развертыванию

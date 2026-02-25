# 🍳 KitchenPro Backend

REST API сервер для системы управления кухней, построенный на Express.js и TypeScript с PostgreSQL базой данных.

## 🚀 Быстрый старт

### Установка

```bash
npm install
cp .env.example .env
```

### Настройка .env

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kitchenpro
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

### Инициализация БД

```bash
psql -U postgres -d kitchenpro -f ../database/schema.sql
```

### Запуск в режиме разработки

```bash
npm run dev
```

Сервер будет запущен на `http://localhost:5000`

## 📋 Доступные скрипты

- `npm run dev` - Запуск в режиме разработки с hot reload
- `npm run build` - Компиляция TypeScript в JavaScript
- `npm start` - Запуск скомпилированного кода
- `npm test` - Запуск тестов

## 📁 Структура папок

```
src/
├── config/          # Конфигурация приложения
├── controllers/     # Логика обработки запросов
├── middleware/      # Middleware функции
├── routes/          # API маршруты
├── services/        # Бизнес-логика
├── types/           # TypeScript интерфейсы
├── utils/           # Утилиты
└── index.ts         # Точка входа
```

## 🔌 API Routes

### Здоровье сервера
- `GET /health` - Проверить статус сервера

### Рецепты
- `GET /api/recipes` - Получить все рецепты
- `GET /api/recipes/:id` - Получить рецепт по ID
- `POST /api/recipes` - Создать рецепт
- `PUT /api/recipes/:id` - Обновить рецепт
- `DELETE /api/recipes/:id` - Удалить рецепт
- `POST /api/recipes/:id/scale` - Масштабировать рецепт

### Инвентарь
- `GET /api/inventory` - Получить все товары
- `GET /api/inventory/low-stock` - Товары с низким уровнем
- `GET /api/inventory/:id` - Получить товар по ID
- `POST /api/inventory` - Создать товар
- `PUT /api/inventory/:id` - Обновить товар
- `POST /api/inventory/:id/deduct` - Вычесть товар
- `DELETE /api/inventory/:id` - Удалить товар

### Заказы
- `GET /api/orders` - Получить все заказы
- `GET /api/orders/pending` - Получить активные заказы
- `GET /api/orders/:id` - Получить заказ по ID
- `POST /api/orders` - Создать заказ
- `PUT /api/orders/:id/status` - Обновить статус заказа
- `PUT /api/orders/:id/complete` - Завершить заказ

### Аналитика
- `GET /api/analytics/dashboard` - Получить метрики dashboard
- `GET /api/analytics/recipes/profitability` - Анализ просибыльности
- `GET /api/analytics/suppliers` - Анализ поставщиков
- `GET /api/analytics/sales/report` - Отчет о продажах
- `GET /api/analytics/inventory/value` - Стоимость инвентаря

## 🔐 Аутентификация

Backend использует JWT для аутентификации:

```
Authorization: Bearer <token>
```

## 📚 Дополнительная информация

- Полная API документация: [API_DOCS.md](../docs/API_DOCS.md)
- Документация по развертыванию: [DEPLOYMENT.md](../docs/DEPLOYMENT.md)
- Главный README: [README.md](../README.md)

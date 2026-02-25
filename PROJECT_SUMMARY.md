# 📊 KitchenPro - Сводка проекта

## 🎯 Что создано?

Полнофункциональное веб-приложение для управления кухней с:
- ✅ Express.js REST API backend
- ✅ React фронтенд с интуитивным UI
- ✅ PostgreSQL база данных
- ✅ JWT аутентификация
- ✅ Role-based доступ
- ✅ Полная документация

## 📁 Структурапроекта

```
KitchenPro/
├── backend/                 # Express.js API сервер
│   ├── src/
│   │   ├── config/         # Конфигурация
│   │   ├── controllers/    # Обработчики запросов
│   │   ├── middleware/     # Middleware слой
│   │   ├── routes/         # API маршруты
│   │   ├── services/       # Бизнес-логика
│   │   ├── types/          # TypeScript типы
│   │   └── utils/          # Утилиты
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                # React Vite приложение
│   ├── src/
│   │   ├── components/     # UI компоненты
│   │   ├── pages/          # Страницы
│   │   ├── services/       # API клиент
│   │   ├── store/          # Zustand stores
│   │   ├── types/          # TypeScript типы
│   │   ├── utils/          # Утилиты
│   │   └── App.tsx         # Главный компонент
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
│
├── database/
│   └── schema.sql          # SQL схема БД
│
├── docs/                   # Документация
│   ├── API_DOCS.md         # API документация
│   ├── ARCHITECTURE.md     # Архитектура
│   ├── DEPLOYMENT.md       # Развертывание
│   ├── TESTING.md          # Тестирование
│   ├── INTEGRATIONS.md     # Интеграции
│   ├── KDS.md              # Kitchen Display
│   ├── TROUBLESHOOTING.md  # Решение проблем
│   ├── FEATURES.md         # Функции
│   └── CHANGELOG.md        # История
│
├── README.md               # Главная документация
├── QUICKSTART.md           # Быстрый старт
├── ROADMAP.md              # Дорожная карта
├── TECH_STACK.md           # Технологический стек
├── CONTRIBUTING.md         # Правила контрибьютства
├── BEST_PRACTICES.md       # Лучшие практики
├── LICENSE                 # Лицензия MIT
├── .gitignore              # Git ignore
├── setup.sh                # Setup скрипт (Linux/Mac)
├── setup.ps1               # Setup скрипт (Windows)
└── TODO.md                 # План развития
```

## 🚀 Быстрый старт

### Windows (PowerShell от администратора)
```powershell
.\setup.ps1
```

### Linux / Mac
```bash
bash setup.sh
```

### Или вручную

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend (в новом терминале):**
```bash
cd frontend
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 🎯 Основные функции

### 📊 Dashboard
- Метрики себестоимости и прибыли
- Активные заказы
- Товары с низким уровнем
- Информация о персонале

### 📦 Управление складом
- Просмотр и редактирование товаров
- Отслеживание низкого уровня
- История движения товаров
- Категоризация

### 🍽️ Управление рецептами
- Создание и редактирование блюд
- Расчет себестоимости
- Масштабирование рецепта
- Управление ингредиентами

### 📧 Управление заказами
- Создание заказов
- Просмотр статуса
- Live обновление
- История заказов

### 📊 Аналитика
- Метрики dashboard
- Анализ прибыльности
- Отчеты о продажах
- Стоимость инвентаря

## 🔐 Безопасность

- JWT аутентификация
- Role-based доступ (admin, manager, chef, viewer)
- Валидация данных
- Защита endpoints

## 📚 Документация

- **[README.md](./README.md)** - Полная документация
- **[QUICKSTART.md](./QUICKSTART.md)** - Быстрый старт (5 минут)
- **[docs/API_DOCS.md](./docs/API_DOCS.md)** - API документация
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Архитектура системы
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Развертывание
- **[ROADMAP.md](./ROADMAP.md)** - План развития
- **[TECH_STACK.md](./TECH_STACK.md)** - Технологический стек

## 🛠️ Технологии

### Backend
- Node.js + Express.js
- TypeScript
- PostgreSQL
- JWT для аутентификации

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Zustand для состояния
- Vite для сборки

## 📊 API Endpoints

```
GET    /api/recipes                    - Все рецепты
POST   /api/recipes                    - Создать рецепт
GET    /api/inventory                  - Все товары
POST   /api/inventory                  - Создать товар
GET    /api/orders                     - Все заказы
POST   /api/orders                     - Создать заказ
GET    /api/analytics/dashboard        - Метрики dashboard
```

Полный список: [docs/API_DOCS.md](./docs/API_DOCS.md)

## 🤝 Контрибьютство

Вклады приветствуются! Прочитайте [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 Лицензия

MIT License - см. [LICENSE](./LICENSE)

## 🎉 История создания

Этот проект был разработан как полнофункциональная система управления кухней:

- **Версия 1.0.0** - MVP с основными функциями
- **В разработке** - KDS, Mobile App, AI features

---

## 📞 Поддержка

- 📖 Прочитайте документацию
- 🐛 Откройте Issue если нашли баг
- 💬 Свяжитесь через проект

---

**Спасибо за выбор KitchenPro!** 🍳✨

Система готова к использованию. Начните с [QUICKSTART.md](./QUICKSTART.md)!

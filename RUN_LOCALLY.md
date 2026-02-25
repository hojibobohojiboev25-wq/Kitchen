# Запуск KitchenPro локально

## Способ 1: Быстрый запуск (Рекомендуется)

### Windows:
```powershell
# Откройте PowerShell в папке KitchenPro и введите:
.\setup-quick.bat
```

### Linux/Mac:
```bash
chmod +x setup-quick.sh
./setup-quick.sh
```

---

## Способ 2: Ручной запуск

### Шаг 1 - Откройте первый терминал (Backend)
```powershell
cd backend
npm run dev
```
Вы должны увидеть:
```
🍳 KitchenPro server running on port 5000
```

### Шаг 2 - Откройте второй терминал (Frontend)
```powershell
cd frontend
npm run dev
```
Вы должны увидеть:
```
VITE v5.0.8  ready in 200 ms
Local:    http://localhost:3000/
```

### Шаг 3 - Откройте браузер
```
http://localhost:3000
```

### Шаг 4 - Введите учётные данные
- **Email**: demo@kitchenpro.com
- **Пароль**: demo123

---

## Для Vercel Deployment

### Backend
```bash
# В папке backend
npm run build
vercel deploy
```

### Frontend
```bash
# В папке frontend
npm run build
vercel deploy
```

---

## Если по-прежнему ошибка 404

1. **Проверьте URL Backend в Frontend**
   - Откройте `frontend/src/services/api.ts`
   - Убедитесь, что `baseURL` указывает на ваш backend URL

2. **Проверьте CORS**
   - Backend должен разрешать запросы с frontend домена

3. **Проверьте Logs**
   - Backend: `npm run dev` (смотрите консоль)
   - Frontend: `npm run dev` (смотрите консоль браузера F12)

---

## Команды разработки

```bash
# Backend
cd backend
npm run dev        # Запуск с автоперезагрузкой
npm run build      # Компиляция TypeScript
npm start          # Запуск из dist

# Frontend
cd frontend
npm run dev        # Vite dev сервер
npm run build      # Оптимизированная сборка
npm run preview    # Локальный просмотр build версии
```

---

## Переменные окружения

### Backend (.env.development или .env.production)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.development или .env.production)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Troubleshooting

| Problema | Решение |
|----------|--------|
| Порт 5000 занят | `netstat -ano \| findstr :5000` и убить процесс |
| Ошибка 404 | Проверьте, работает ли backend (нажмите http://localhost:5000/health) |
| CORS ошибка | Убедитесь, что `CORS_ORIGIN` в backend соответствует frontend URL |
| node_modules не найдены | Выполните `npm install` в обеих папках |
| TypeScript ошибки | Выполните `npm install` заново |


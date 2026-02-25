# 🐛 Часто встречаемые ошибки и их решение

## Backend
### 1. "Error: Cannot find module 'dotenv'"
**Решение:**
```bash
cd backend
npm install
```

### 2. "Error: Database connection failed"
**Решение:**
- Убедитесь, что PostgreSQL запущен
- Проверьте .env конфиг
- Проверьте учетные данные БД

```bash
# Проверить подключение
psql -U postgres -h localhost -d kitchenpro
```

### 3. "Port 5000 already in use"
**Решение:**
- Измените PORT в .env
- ИЛИ остановите процесс на порте 5000

```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### 4. "TypeScript compilation errors"
**Решение:**
```bash
npm run build
# или переустановите зависимости
rm -rf node_modules package-lock.json
npm install
```

## Frontend

### 1. "Blank page / 404"
**Решение:**
- Убедитесь, что backend запущен
- Проверьте VITE_API_URL в .env
- Откройте в http://localhost:3000

### 2. "CORS error"
**Решение:**
Проверьте backend .env:
```env
CORS_ORIGIN=http://localhost:3000
```

### 3. "npm dependency conflicts"
**Решение:**
```bash
npm install --legacy-peer-deps
# или очистите кэш
npm cache clean --force
```

### 4. "Vite port 3000 already in use"
**Решение:**
```bash
# Измените порт в vite.config.ts
server: {
  port: 3001
}
```

## Database

### 1. "Database already exists"
**Решение:**
```bash
dropdb kitchenpro  # удалить старую БД
createdb kitchenpro  # создать новую
psql -U postgres -d kitchenpro -f schema.sql
```

### 2. "Password authentication failed"
**Решение:**
- Проверьте пароль PostgreSQL
- Попробуйте:
  ```bash
  psql -U postgres
  ```

### 3. "Relation "products" does not exist"
**Решение:**
- Примените миграции заново
  ```bash
  psql -U postgres -d kitchenpro -f database/schema.sql
  ```

## Git & Version Control

### 1. "Permission denied" на deploy
**Решение:**
```bash
chmod +x setup.sh
./setup.sh
```

### 2. "Cannot push to repository"
**Решение:**
- Проверьте SSH ключи
- Убедитесь, что у вас есть доступ
- Используйте HTTPS вместо SSH

---

## 📞 Остальные проблемы?

1. Проверьте логи:
   ```bash
   # Backend logs
   npm run dev  # смотрите вывод в консоль
   
   # Frontend logs
   # Смотрите Browser Console (Ctrl+Shift+I)
   ```

2. Очистите кэш:
   ```bash
   # npm
   npm cache clean --force
   
   # node_modules
   rm -rf node_modules
   npm install
   ```

3. Перезагрузитесь:
   - Перезагрузите браузер
   - Перезагрузите backend сервер
   - Перезагрузите компьютер (в крайний случай)

4. Проверьте версии:
   ```bash
   node -v  # должен быть 16+
   npm -v   # должен быть 7+
   ```

---

Если проблема остается, откройте Issue на GitHub! 🐛

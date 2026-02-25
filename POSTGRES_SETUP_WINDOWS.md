# PostgreSQL Setup для Windows

## Вариант 1: Стандартная установка

### Шаг 1: Скачайте PostgreSQL
1. Перейдите на https://www.postgresql.org/download/windows/
2. Скачайте последнюю версию (PostgreSQL 16+ рекомендуется)
3. Запустите установщик и следуйте инструкциям

### Шаг 2: Конфигурация при установке
- **Пароль для postgres**: Установите `password` или запомните свой пароль
- **Port**: Оставьте по умолчанию `5432`
- **Locale**: Выберите желаемое локаль
- **Additional components**: Убедитесь, что выбран `pgAdmin4`

### Шаг 3: Добавьте PostgreSQL в PATH
PostgreSQL должен добавить себя автоматически. Если нет:

1. Откройте Environment Variables:
   - Windows 10/11: Нажмите `Win + X`, выберите "System"
   - Перейдите: Advanced System Settings → Environment Variables
   
2. В "System variables" найдите `PATH`
3. Нажмите "Edit" и добавьте: `C:\Program Files\PostgreSQL\16\bin`
   (замените 16 на вашу версию)

4. Проверьте установку в PowerShell:
   ```powershell
   psql --version
   ```

### Шаг 4: Запустите KitchenPro Setup
```powershell
cd c:\Users\Asus\Desktop\KitchenPro
.\setup-windows.bat
```

---

## Вариант 2: Docker (рекомендуется для разработки)

### Установите Docker Desktop
1. Скачайте https://www.docker.com/products/docker-desktop
2. Установите и перезагрузитесь

### Запустите PostgreSQL в контейнере
```powershell
docker run --name kitchenpro-db `
  -e POSTGRES_PASSWORD=password `
  -e POSTGRES_DB=kitchenpro `
  -p 5432:5432 `
  -d postgres:16
```

### Инициализируйте схему
```powershell
# Копируем schema внутрь контейнера и применяем её
docker exec -i kitchenpro-db psql -U postgres -d kitchenpro < database/schema.sql
```

### Проверьте подключение
```powershell
docker exec -it kitchenpro-db psql -U postgres -d kitchenpro -c "SELECT * FROM users LIMIT 0;"
```

---

## Вариант 3: WSL (Windows Subsystem for Linux)

Если у вас установлен WSL2:

```bash
# Установите PostgreSQL в WSL
wsl sudo apt update
wsl sudo apt install postgresql postgresql-contrib

# Запустите сервис
wsl sudo service postgresql start

# Инициализируйте базу (из Windows PowerShell)
wsl psql -U postgres -d kitchenpro -f database/schema.sql
```

---

## Тестирование подключения

После установки проверьте подключение:

```powershell
# PowerShell
psql -U postgres -d kitchenpro -c "SELECT version();"
```

Если успешно, вы увидите версию PostgreSQL.

---

## Решение проблем

### Ошибка: "psql: command not found"
- Проверьте PATH в Environment Variables
- Перезагрузите PowerShell/CMD после добавления PATH

### Ошибка: "could not connect to database server"
- Убедитесь, что PostgreSQL сервис запущен:
  - Windows Services (Win + R → services.msc)
  - Найдите "postgresql-x64-16" и убедитесь, что статус "Running"

### Ошибка: "password authentication failed"
- Проверьте пароль в `.env` файле бэкенда
- Сброс пароля:
  ```powershell
  # Запустите pgAdmin4 (установлен с PostgreSQL)
  # Или используйте команду:
  psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'newpassword';"
  ```

### Ошибка: "database kitchenpro does not exist"
- Запустите скрипт инициализации заново:
  ```powershell
  .\setup-windows.bat
  ```

---

## Запуск приложения после установки

```powershell
# 1. Инициализируйте базу
.\setup-windows.bat

# 2. Запустите бэкенд
cd backend
npm run dev

# 3. В новом PowerShell окне запустите фронтенд
cd frontend
npm run dev

# 4. Откройте http://localhost:3000
```

Демо учётные данные:
- **Email**: admin@kitchenpro.local
- **Password**: admin123

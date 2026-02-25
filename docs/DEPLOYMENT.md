# Документация по развертыванию

## Production Environment

### Backend

#### Docker образ

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY dist ./dist

EXPOSE 5000

CMD ["npm", "start"]
```

Сборка:
```bash
docker build -t kitchenpro-backend .
docker run -p 5000:5000 --env-file .env kitchenpro-backend
```

#### Environment переменные

```env
NODE_ENV=production
PORT=5000
DB_HOST=db.example.com
DB_PORT=5432
DB_NAME=kitchenpro
DB_USER=kitchenpro_user
DB_PASSWORD=strong_password
JWT_SECRET=very_long_random_string_here
CORS_ORIGIN=https://yourdomain.com
```

### Frontend

#### Docker образ

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Docker Compose

```docker-compose.yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: kitchenpro
      POSTGRES_USER: kitchenpro_user
      POSTGRES_PASSWORD: strong_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DB_HOST: db
      DB_PORT: 5432
      DB_NAME: kitchenpro
      DB_USER: kitchenpro_user
      DB_PASSWORD: strong_password
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

Запуск:
```bash
docker-compose up -d
```

## мониторинг

### Логи

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Проверка здоровья

```bash
curl http://localhost:5000/health
```

## Безопасность

1. ✅ Использовать HTTPS в production
2. ✅ Установить сильные пароли в .env
3. ✅ Использовать переменные среды для секретов
4. ✅ Регулярно обновлять зависимости
5. ✅ Настроить CORS для вашего домена
6. ✅ Использовать аутентификацию и авторизацию

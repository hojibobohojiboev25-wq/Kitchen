# API Документация KitchenPro

## Базовый URL

```
http://localhost:5000/api
```

## Аутентификация

Все защищённые routes требуют JWT token в header:

```
Authorization: Bearer <your_jwt_token>
```

## Статус коды

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Рецепты / Recipes

### Получить все рецепты
```
GET /recipes
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "name": "Спагетти Болоньезе",
    "description": "Классическое итальянское блюдо",
    "portion_size": 1,
    "unit": "порция",
    "cost": 5.00,
    "price": 15.00,
    "profit_margin": 66.67,
    "category": "Паста",
    "ingredients": [...]
  }
]
```

### Получить рецепт по ID
```
GET /recipes/{id}
```

### Создать рецепт
```
POST /recipes
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Новое блюдо",
  "description": "Описание",
  "portion_size": 1,
  "unit": "порция",
  "price": 20.00,
  "category": "Категория",
  "ingredients": [
    {
      "product_id": "uuid",
      "quantity": 100,
      "unit": "г"
    }
  ]
}
```

### Масштабировать рецепт
```
POST /recipes/{id}/scale
Content-Type: application/json
```

**Body:**
```json
{
  "portions": 50
}
```

---

## Инвентарь / Inventory

### Получить все товары
```
GET /inventory
```

### Получить товары с низким уровнем
```
GET /inventory/low-stock
```

### Создать товар
```
POST /inventory
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Помидоры",
  "unit": "kg",
  "current_quantity": 50,
  "min_quantity": 10,
  "max_quantity": 100,
  "price_per_unit": 2.50,
  "supplier_id": "uuid",
  "category": "Овощи"
}
```

### Обновить товара
```
PUT /inventory/{id}
Authorization: Bearer <token>
```

### Вычесть товар
```
POST /inventory/{id}/deduct
Authorization: Bearer <token>
```

**Body:**
```json
{
  "quantity": 10,
  "reason": "Использовано в блюде"
}
```

### Удалить товар
```
DELETE /inventory/{id}
Authorization: Bearer <token>
Role: admin
```

---

## Заказы / Orders

### Получить все заказы
```
GET /orders
```

### Получить активные заказы
```
GET /orders/pending
```

### Создать заказ
```
POST /orders
```

**Body:**
```json
{
  "customer_name": "Иван Петров",
  "table_number": 5,
  "items": [
    {
      "recipe_id": "uuid",
      "quantity": 2,
      "special_instructions": "Без лука"
    }
  ]
}
```

### Обновить статус заказа
```
PUT /orders/{id}/status
```

**Body:**
```json
{
  "status": "preparing"
}
```

Допустимые статусы: `pending`, `preparing`, `ready`, `served`, `cancelled`

### Завершить заказ
```
PUT /orders/{id}/complete
```

---

## Аналитика / Analytics

### Метрики Dashboard
```
GET /analytics/dashboard
Authorization: Bearer <token>
```

**Ответ:**
```json
{
  "low_stock_items": [...],
  "pending_orders": [...],
  "daily_cost": 250.00,
  "daily_revenue": 1200.00,
  "daily_profit": 950.00
}
```

### Прибыльность блюд
```
GET /analytics/recipes/profitability
Authorization: Bearer <token>
Role: admin, manager
```

### Аналитика поставщиков
```
GET /analytics/suppliers
Authorization: Bearer <token>
Role: admin, manager
```

### Отчет о продажах
```
GET /analytics/sales/report?days=30
Authorization: Bearer <token>
Role: admin, manager
```

### Стоимость инвентаря
```
GET /analytics/inventory/value
Authorization: Bearer <token>
Role: admin, manager
```

---

## Коды ошибок

```json
{
  "error": "Описание ошибки"
}
```

## Примеры curl

### Получить рецепты
```bash
curl http://localhost:5000/api/recipes
```

### Создать товар (с token)
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Помидоры",
    "unit": "kg",
    "current_quantity": 50,
    "price_per_unit": 2.50
  }'
```

### Создать заказ
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Иван",
    "table_number": 5,
    "items": [{"recipe_id": "...", "quantity": 2}]
  }'
```

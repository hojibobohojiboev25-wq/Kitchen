# 📚 Примеры использования KitchenPro

## 📌 Примеры API вызовов (curl)

### 1. Получить все рецепты
```bash
curl -X GET http://localhost:5000/api/recipes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Создать новый рецепт
```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Паста Карбонара",
    "description": "Классическое итальянское блюдо",
    "portion_size": 1,
    "unit": "порция",
    "price": 25.00,
    "category": "Паста",
    "ingredients": [
      {
        "product_id": "uuid-1",
        "quantity": 100,
        "unit": "g",
        "cost": 2.50
      },
      {
        "product_id": "uuid-2",
        "quantity": 50,
        "unit": "g",
        "cost": 1.50
      }
    ]
  }'
```

### 3. Получить товары с низким уровнем
```bash
curl -X GET http://localhost:5000/api/inventory/low-stock \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Создать товар на складе
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Помидоры",
    "unit": "kg",
    "current_quantity": 50,
    "min_quantity": 10,
    "max_quantity": 100,
    "price_per_unit": 2.50,
    "supplier_id": "uuid-supplier",
    "category": "Овощи"
  }'
```

### 5. Создать заказ
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Иван Петров",
    "table_number": 5,
    "items": [
      {
        "recipe_id": "uuid-recipe-1",
        "quantity": 2,
        "special_instructions": "Без лука"
      },
      {
        "recipe_id": "uuid-recipe-2",
        "quantity": 1,
        "special_instructions": ""
      }
    ]
  }'
```

### 6. Обновить статус заказа
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "preparing"
  }'
```

### 7. Получить метрики dashboard
```bash
curl -X GET http://localhost:5000/api/analytics/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 8. Масштабировать рецепт на 50 порций
```bash
curl -X POST http://localhost:5000/api/recipes/RECIPE_ID/scale \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "portions": 50
  }'
```

## 📱 Примеры использования в TypeScript

### Получить все рецепты
```typescript
import { recipeApi } from '../services/api';

const loadRecipes = async () => {
  try {
    const response = await recipeApi.getAll();
    console.log('Recipes:', response.data);
  } catch (error) {
    console.error('Error loading recipes:', error);
  }
};
```

### Создать novo заказ
```typescript
import { orderApi } from '../services/api';

const createNewOrder = async () => {
  const order = {
    customer_name: 'Иван',
    table_number: 3,
    items: [
      {
        recipe_id: 'recipe-123',
        quantity: 2,
        special_instructions: 'Без специй'
      }
    ]
  };

  try {
    const response = await orderApi.create(order);
    console.log('Order created:', response.data);
  } catch (error) {
    console.error('Error creating order:', error);
  }
};
```

### Получить товары с низким уровнем
```typescript
import { inventoryApi } from '../services/api';

const checkLowStock = async () => {
  try {
    const response = await inventoryApi.getLowStock();
    response.data.forEach(product => {
      console.log(`⚠️ Low stock: ${product.name} - ${product.current_quantity}${product.unit}`);
    });
  } catch (error) {
    console.error('Error checking inventory:', error);
  }
};
```

### Масштабировать рецепт
```typescript
import { recipeApi } from '../services/api';

const getRecipeForPortions = async (recipeId: string, portions: number) => {
  try {
    const response = await recipeApi.scale(recipeId, portions);
    console.log('Scaled recipe:', response.data);
    console.log(`Cost for ${portions} portions: $${response.data.cost}`);
  } catch (error) {
    console.error('Error scaling recipe:', error);
  }
};
```

### Получить аналитику
```typescript
import { analyticsApi } from '../services/api';

const getAnalytics = async () => {
  try {
    const dashboard = await analyticsApi.getDashboard();
    const profitability = await analyticsApi.getRecipeProfitability();
    
    console.log('Daily profit:', dashboard.data.daily_profit);
    console.log('Most profitable dishes:', profitability.data);
  } catch (error) {
    console.error('Error getting analytics:', error);
  }
};
```

## 🔐 Аутентификация

### Получить и сохранить токен
```typescript
import { useAuthStore } from '../store';

const handleLogin = async (email: string, password: string) => {
  const { setToken } = useAuthStore();
  
  try {
    // Вызов API логина (когда будет реализован)
    const response = await axios.post('/api/auth/login', {
      email,
      password
    });
    
    setToken(response.data.token);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Использование токена в запросах
```typescript
// Автоматически добавляется в каждом запросе через axios interceptor
// в services/api.ts

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🚀 Advanced примеры

### Создание пакета из нескольких блюд
```typescript
const createMealPackage = async () => {
  const recipes = [
    { id: 'soup-123', portions: 10 },
    { id: 'main-456', portions: 10 },
    { id: 'dessert-789', portions: 10 }
  ];

  const scaledRecipes = await Promise.all(
    recipes.map(recipe => 
      recipeApi.scale(recipe.id, recipe.portions)
    )
  );

  console.log('Total cost for 10 servings:', 
    scaledRecipes.reduce((sum, r) => sum + r.data.cost, 0)
  );
};
```

### Экспорт заказов за день
```typescript
const getDailyOrders = async () => {
  const orders = await orderApi.getAll();
  const today = new Date().toDateString();
  
  const todaysOrders = orders.data.filter(order => 
    new Date(order.created_at).toDateString() === today
  );

  const totalRevenue = todaysOrders.reduce((sum, order) => 
    sum + order.total_price, 0
  );

  console.log(`Orders today: ${todaysOrders.length}`);
  console.log(`Total revenue: $${totalRevenue}`);
};
```

---

Нужны еще примеры? Обратитесь к [API_DOCS.md](./docs/API_DOCS.md)! 📖

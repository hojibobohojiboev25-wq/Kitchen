# Руководство по тестированию KitchenPro

## Backend тесты

### Настройка

```bash
cd backend
npm test
```

### Структура тестов

```
backend/src/__tests__/
├── services/
│   ├── recipeService.test.ts
│   ├── inventoryService.test.ts
│   └── orderService.test.ts
├── controllers/
│   └── recipeController.test.ts
└── middleware/
    └── auth.test.ts
```

### Пример теста

```typescript
import { recipeService } from '../services/recipeService';

describe('RecipeService', () => {
  describe('getAllRecipes', () => {
    it('should return all recipes', async () => {
      const recipes = await recipeService.getAllRecipes();
      expect(recipes).toBeDefined();
      expect(Array.isArray(recipes)).toBe(true);
    });
  });
});
```

## Frontend тесты

```bash
cd frontend
npm test
```

### Компоненты для тестирования

```typescript
// src/components/__tests__/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  it('should render dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText(/KitchenPro Dashboard/i)).toBeInTheDocument();
  });
});
```

## E2E тесты (Cypress)

```bash
npm install --save-dev cypress
npx cypress open
```

## Тестирование API

### curl примеры

```bash
# Получить рецепты
curl -X GET http://localhost:5000/api/recipes

# Создать рецепт
curl -X POST http://localhost:5000/api/recipes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Новое блюдо", "price": 20}'
```

### Postman коллекция

Импортируйте `docs/postman_collection.json` в Postman для удобного тестирования API.

## Покрытие кода

Минимальное требование покрытия: 80%

```bash
npm test -- --coverage
```

## CI/CD тестирование

Тесты запускаются автоматически при:
- Push в любой branch
- Pull Request
- Перед release

---

Убедитесь, что все тесты проходят перед отправкой PR! ✅

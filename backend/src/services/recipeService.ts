import { db } from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { IRecipe, IRecipeIngredient } from '../types';

export class RecipeService {
  async getAllRecipes() {
    const result = await db.query(
      'SELECT * FROM recipes ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async getRecipeById(id: string) {
    const result = await db.query('SELECT * FROM recipes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      throw new Error('Recipe not found');
    }

    const recipe = result.rows[0];
    const ingredientsResult = await db.query(
      `SELECT ri.*, p.name, p.unit, p.price_per_unit FROM recipe_ingredients ri
       JOIN products p ON ri.product_id = p.id
       WHERE ri.recipe_id = $1`,
      [id]
    );

    return {
      ...recipe,
      ingredients: ingredientsResult.rows,
    };
  }

  async createRecipe(recipe: Partial<IRecipe>) {
    const id = uuidv4();
    const cost = this.calculateRecipeCost(recipe.ingredients || []);
    const profit_margin =
      ((recipe.price! - cost) / recipe.price!) * 100;

    await db.query(
      `INSERT INTO recipes (id, name, description, portion_size, unit, cost, price, profit_margin, category, photo_url, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())`,
      [
        id,
        recipe.name,
        recipe.description,
        recipe.portion_size,
        recipe.unit,
        cost,
        recipe.price,
        profit_margin,
        recipe.category,
        recipe.photo_url,
      ]
    );

    // Add ingredients
    for (const ingredient of recipe.ingredients || []) {
      await db.query(
        `INSERT INTO recipe_ingredients (id, recipe_id, product_id, quantity, unit, cost)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          uuidv4(),
          id,
          ingredient.product_id,
          ingredient.quantity,
          ingredient.unit,
          ingredient.cost,
        ]
      );
    }

    return this.getRecipeById(id);
  }

  async updateRecipe(id: string, updates: Partial<IRecipe>) {
    const cost = this.calculateRecipeCost(updates.ingredients || []);
    const profit_margin =
      ((updates.price! - cost) / updates.price!) * 100;

    await db.query(
      `UPDATE recipes SET name = $1, description = $2, price = $3, profit_margin = $4, cost = $5, updated_at = NOW()
       WHERE id = $6`,
      [
        updates.name,
        updates.description,
        updates.price,
        profit_margin,
        cost,
        id,
      ]
    );

    return this.getRecipeById(id);
  }

  async deleteRecipe(id: string) {
    await db.query('DELETE FROM recipe_ingredients WHERE recipe_id = $1', [
      id,
    ]);
    await db.query('DELETE FROM recipes WHERE id = $1', [id]);
  }

  private calculateRecipeCost(ingredients: IRecipeIngredient[]) {
    return ingredients.reduce((sum, ing) => sum + (ing.cost || 0), 0);
  }

  async scaleRecipe(id: string, portions: number) {
    // Масштабирование рецепта на определенное количество порций
    const recipe = await this.getRecipeById(id);
    const scaled = {
      ...recipe,
      ingredients: recipe.ingredients.map((ing: any) => ({
        ...ing,
        quantity: ing.quantity * (portions / recipe.portion_size),
      })),
      cost: recipe.cost * (portions / recipe.portion_size),
    };
    return scaled;
  }
}

export const recipeService = new RecipeService();

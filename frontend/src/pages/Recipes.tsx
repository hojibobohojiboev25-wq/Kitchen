import React, { useEffect, useState } from 'react';
import { recipeApi } from '../services/api';
import { IRecipe } from '../types';

export const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeApi.getAll();
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">🍽️ Меню и рецепты</h1>

        {loading ? (
          <p className="text-gray-600">Загрузка рецептов...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                {recipe.photo_url && (
                  <img
                    src={recipe.photo_url}
                    alt={recipe.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-lg font-bold text-gray-900">{recipe.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-xs">Себестоимость</p>
                    <p className="text-lg font-bold text-red-600">${recipe.cost}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Цена</p>
                    <p className="text-lg font-bold text-green-600">${recipe.price}</p>
                  </div>
                </div>
                <p className="text-sm text-blue-600 font-semibold">
                  Прибыль: {recipe.profit_margin.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;

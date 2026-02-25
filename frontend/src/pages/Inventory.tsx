import React, { useEffect, useState } from 'react';
import { inventoryApi } from '../services/api';
import { IProduct } from '../types';
import { AlertCircle } from 'lucide-react';

export const Inventory: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await inventoryApi.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">📦 Управление складом</h1>

        {loading ? (
          <p className="text-gray-600">Загрузка товаров...</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Название
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Категория
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Количество
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Цена за единицу
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.current_quantity} {product.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${product.price_per_unit}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.current_quantity <= product.min_quantity ? (
                        <span className="flex items-center text-red-600 font-semibold">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Заканчивается
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">OK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;

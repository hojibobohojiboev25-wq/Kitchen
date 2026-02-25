import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, AlertCircle, Users } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🍳 KitchenPro Dashboard
          </h1>
          <p className="text-gray-600">Полный контроль кухни в одном месте</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Себестоимость дня</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">$0</p>
              </div>
              <TrendingUp className="w-12 h-12 text-red-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Прибыль дня</p>
                <p className="text-3xl font-bold text-green-600 mt-2">$0</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Заказов в очереди</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
              </div>
              <BarChart3 className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Товаров заканчиваются</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">0</p>
              </div>
              <AlertCircle className="w-12 h-12 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/orders')}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-8 text-center transition"
          >
            <h3 className="text-2xl font-bold mb-2">📦 Заказы</h3>
            <p className="text-blue-100">Управление заказами клиентов</p>
          </button>

          <button
            onClick={() => navigate('/inventory')}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-8 text-center transition"
          >
            <h3 className="text-2xl font-bold mb-2">🏪 Склад</h3>
            <p className="text-green-100">Контроль остатков продуктов</p>
          </button>

          <button
            onClick={() => navigate('/recipes')}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-8 text-center transition"
          >
            <h3 className="text-2xl font-bold mb-2">🍽️ Меню</h3>
            <p className="text-purple-100">Рецепты и блюда</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

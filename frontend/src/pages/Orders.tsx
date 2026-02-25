import React, { useEffect, useState } from 'react';
import { orderApi } from '../services/api';
import { IOrder } from '../types';
import { Clock, CheckCircle } from 'lucide-react';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
    // Refresh orders every 10 seconds
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'served':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳ Ожидание';
      case 'preparing':
        return '👨‍🍳 Готовится';
      case 'ready':
        return '✅ Готово';
      case 'served':
        return '🍽️ Подано';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">📧 Управление заказами</h1>

        {loading ? (
          <p className="text-gray-600">Загрузка заказов...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 text-center py-12">Нет заказов</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Заказ #{order.order_number}
                    </h3>
                    {order.table_number && (
                      <p className="text-gray-600 text-sm">
                        Стол: {order.table_number}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-4 py-2 rounded-lg font-semibold ${statusColor(
                      order.status
                    )}`}
                  >
                    {statusLabel(order.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Себестоимость</p>
                    <p className="text-lg font-bold text-gray-900">
                      ${order.total_cost}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Сумма</p>
                    <p className="text-lg font-bold text-green-600">
                      ${order.total_price}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

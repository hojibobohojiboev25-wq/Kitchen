import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalyticsProps {
  data: Array<{
    date: string;
    revenue: number;
    cost: number;
  }>;
}

export const SalesChart: React.FC<AnalyticsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Продажи (последние 30 дней)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            name="Выручка"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="cost"
            stroke="#ef4444"
            name="Себестоимость"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;

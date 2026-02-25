import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from './store';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Recipes from './pages/Recipes';
import Orders from './pages/Orders';
import Login from './pages/Login';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { token, logout } = useAuthStore();

  if (!token) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold">🍳 KitchenPro</h1>
          </div>

          <nav className="space-y-2 px-4">
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              onClick={() => setIsOpen(false)}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/inventory"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              onClick={() => setIsOpen(false)}
            >
              📦 Склад
            </Link>
            <Link
              to="/recipes"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              onClick={() => setIsOpen(false)}
            >
              🍽️ Меню
            </Link>
            <Link
              to="/orders"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              onClick={() => setIsOpen(false)}
            >
              📧 Заказы
            </Link>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-red-700 transition text-left mt-8"
            >
              <LogOut size={18} className="mr-2" />
              Выход
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white shadow">
            <div className="flex items-center justify-between px-6 py-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-gray-700"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-semibold text-gray-900 flex-1 text-center">
                Система управления кухней
              </h2>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

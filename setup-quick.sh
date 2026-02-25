#!/bin/bash

# KitchenPro Startup Script for Linux/Mac

echo ""
echo "==============================================="
echo "  🍳 KitchenPro - Kitchen Management System"
echo "==============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен! Пожалуйста, установите Node.js с https://nodejs.org"
    exit 1
fi

echo "✅ Node.js найден"
echo ""

# Install dependencies
echo "📦 Установка зависимостей..."
echo ""

cd backend
echo "Установка backend зависимостей..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка при установке backend зависимостей"
    exit 1
fi
cd ..

cd frontend
echo "Установка frontend зависимостей..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка при установке frontend зависимостей"
    exit 1
fi
cd ..

echo ""
echo "✅ Все зависимости успешно установлены!"
echo ""
echo "==============================================="
echo ""
echo "Для запуска приложения:"
echo ""
echo "1️⃣  Откройте два терминала и укажите:"
echo ""
echo "Терминал 1 (Backend):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Терминал 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "2️⃣  Откройте браузер на http://localhost:3000"
echo ""
echo "3️⃣  Введите учётные данные:"
echo "  Email: demo@kitchenpro.com"
echo "  Пароль: demo123"
echo ""
echo "==============================================="
echo ""

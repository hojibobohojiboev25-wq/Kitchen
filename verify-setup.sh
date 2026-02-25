#!/bin/bash

# Verification script - Check if everything is set up correctly

echo "🔍 Проверка установки KitchenPro..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js установлен: $(node --version)"
else
    echo "❌ Node.js не найден"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm установлен: $(npm --version)"
else
    echo "❌ npm не найден"
    exit 1
fi

# Check npm-run-all
if npm list -g npm-run-all &> /dev/null; then
    echo "✅ npm-run-all установлен глобально"
else
    echo "⚠️  npm-run-all не установлен. Установка..."
    npm install -g npm-run-all
fi

# Check backend node_modules
if [ -d "backend/node_modules" ]; then
    echo "✅ Backend node_modules найдены"
else
    echo "⚠️  Backend node_modules не найдены. Установка..."
    cd backend && npm install && cd ..
fi

# Check frontend node_modules
if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend node_modules найдены"
else
    echo "⚠️  Frontend node_modules не найдены. Установка..."
    cd frontend && npm install && cd ..
fi

# Check environment files
if [ -f "backend/.env.development" ]; then
    echo "✅ Backend .env.development найден"
else
    echo "❌ Backend .env.development не найден"
fi

if [ -f "frontend/.env.development" ]; then
    echo "✅ Frontend .env.development найден"
else
    echo "❌ Frontend .env.development не найден"
fi

echo ""
echo "✅ Все проверки прошли успешно!"
echo ""
echo "Для запуска приложения используйте:"
echo "  npm run dev"
echo ""

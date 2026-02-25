#!/bin/bash

# One-Click Start for KitchenPro

echo ""
echo "==============================================="
echo "   🍳 KITCHENPRO ЗАПУСК"
echo "==============================================="
echo ""

# Check if npm-run-all is installed
npm list -g npm-run-all >/dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "📦 Установка npm-run-all..."
    npm install -g npm-run-all
fi

echo ""
echo "✅ Запуск Backend и Frontend..."
echo ""
echo "⏳ Ждите 10-15 секунд перед открытием браузера"
echo ""

npm run dev

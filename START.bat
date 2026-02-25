@echo off
REM One-Click Start for KitchenPro

echo.
echo ===============================================
echo   🍳 KITCHENPRO ЗАПУСК
echo ===============================================
echo.

REM Check if npm-run-all is installed
npm list -g npm-run-all >nul 2>&1
if errorlevel 1 (
    echo 📦 Установка npm-run-all...
    npm install -g npm-run-all
)

echo.
echo ✅ Запуск Backend и Frontend...
echo.
echo ⏳ Ждите 10-15 секунд перед открытием браузера
echo.

npm run dev

pause

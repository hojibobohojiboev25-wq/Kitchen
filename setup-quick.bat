@echo off
REM KitchenPro Startup Script for Windows

echo.
echo ===============================================
echo   🍳 KitchenPro - Kitchen Management System
echo ===============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js не установлен! Пожалуйста, установите Node.js с https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js найден
echo.

REM Install dependencies
echo 📦 Установка зависимостей...
echo.

cd backend
echo Установка backend зависимостей...
call npm install
if errorlevel 1 (
    echo ❌ Ошибка при установке backend зависимостей
    pause
    exit /b 1
)
cd ..

cd frontend
echo Установка frontend зависимостей...
call npm install
if errorlevel 1 (
    echo ❌ Ошибка при установке frontend зависимостей
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ Все зависимости успешно установлены!
echo.
echo ===============================================
echo.
echo Для запуска приложения:
echo.
echo 1️⃣  Откройте PowerShell и укажите две команды:
echo.
echo Командная строка 1 (Backend):
echo   cd backend
echo   npm run dev
echo.
echo Командная строка 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo 2️⃣  Откройте браузер на http://localhost:3000
echo.
echo 3️⃣  Введите учётные данные:
echo   Email: demo@kitchenpro.com
echo   Пароль: demo123
echo.
echo ===============================================
echo.
pause

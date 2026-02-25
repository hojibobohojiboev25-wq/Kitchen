@echo off

REM Verification script - Check if everything is set up correctly

echo.
echo 🔍 Проверка установки KitchenPro...
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js не найден
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js установлен: %NODE_VERSION%
)

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm не найден
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm установлен: %NPM_VERSION%
)

REM Check npm-run-all
npm list -g npm-run-all >nul 2>&1
if errorlevel 1 (
    echo ⚠️  npm-run-all не установлен. Установка...
    call npm install -g npm-run-all
) else (
    echo ✅ npm-run-all установлен глобально
)

REM Check backend node_modules
if exist "backend\node_modules" (
    echo ✅ Backend node_modules найдены
) else (
    echo ⚠️  Backend node_modules не найдены. Установка...
    cd backend
    call npm install
    cd ..
)

REM Check frontend node_modules
if exist "frontend\node_modules" (
    echo ✅ Frontend node_modules найдены
) else (
    echo ⚠️  Frontend node_modules не найдены. Установка...
    cd frontend
    call npm install
    cd ..
)

REM Check environment files
if exist "backend\.env.development" (
    echo ✅ Backend .env.development найден
) else (
    echo ❌ Backend .env.development не найден
)

if exist "frontend\.env.development" (
    echo ✅ Frontend .env.development найден
) else (
    echo ❌ Frontend .env.development не найден
)

echo.
echo ✅ Все проверки прошли успешно!
echo.
echo Для запуска приложения используйте:
echo   npm run dev
echo   или
echo   .\START.bat
echo.
pause

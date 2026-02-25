@echo off
REM KitchenPro Setup Script for Windows

echo ======================================
echo KitchenPro Setup on Windows
echo ======================================

REM Check if PostgreSQL is installed
echo Checking for PostgreSQL...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo PostgreSQL is not installed or not in PATH
    echo.
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    echo.
    echo After installation:
    echo 1. Make sure PostgreSQL is running
    echo 2. Add PostgreSQL bin folder to PATH (usually C:\Program Files\PostgreSQL\16\bin)
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

echo PostgreSQL found!
echo.

REM Create database
echo Creating database...
psql -U postgres -c "CREATE DATABASE kitchenpro;" 2>nul
if %errorlevel% equ 0 (
    echo Database created successfully (or already exists)
) else (
    echo Warning: Could not create database (it may already exist)
)

echo.
echo Initializing schema...
psql -U postgres -d kitchenpro -f database\schema.sql
if %errorlevel% equ 0 (
    echo Schema initialized successfully!
) else (
    echo Error: Failed to initialize schema
    pause
    exit /b 1
)

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Next steps:
echo 1. Start the backend: cd backend && npm run dev
echo 2. Start the frontend: cd frontend && npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
pause

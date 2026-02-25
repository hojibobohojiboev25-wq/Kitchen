#!/bin/bash

# Windows Setup Script for KitchenPro
# Запустите это в PowerShell от администратора

Write-Host "🍳 KitchenPro Setup Script for Windows" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Проверка Node.js
Write-Host "`nChecking Node.js installation..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js version: $(node -v)" -ForegroundColor Green
Write-Host "✅ npm version: $(npm -v)" -ForegroundColor Green

# Проверка PostgreSQL
Write-Host "`nChecking PostgreSQL..." -ForegroundColor Yellow
if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  PostgreSQL not found. You'll need it." -ForegroundColor Yellow
    Write-Host "   Download from: https://www.postgresql.org/download/" -ForegroundColor Yellow
}

# Setup Backend
Write-Host "`nSetting up backend..." -ForegroundColor Yellow
Set-Location backend
npm install
Copy-Item .env.example .env -Force
Write-Host "✅ Backend setup complete" -ForegroundColor Green

# Setup Frontend
Write-Host "`nSetting up frontend..." -ForegroundColor Yellow
Set-Location ../frontend
npm install
Copy-Item .env.example .env -Force
Write-Host "✅ Frontend setup complete" -ForegroundColor Green

# Summary
Write-Host "`n🎉 Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Update backend\.env with your database credentials" -ForegroundColor White
Write-Host "2. Create database: createdb kitchenpro" -ForegroundColor White
Write-Host "3. Apply migrations: psql -U postgres -d kitchenpro -f ..\database\schema.sql" -ForegroundColor White
Write-Host "4. Start backend: cd backend && npm run dev" -ForegroundColor White
Write-Host "5. Start frontend: cd frontend && npm run dev" -ForegroundColor White
Write-Host "6. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "`nNeed help? Check README.md for detailed instructions." -ForegroundColor Cyan

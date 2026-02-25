#!/bin/bash

# KitchenPro Setup Script

echo "🍳 KitchenPro Setup Script"
echo "=========================="

# Check prerequisites
echo ""
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. You'll need it for the database."
    echo "  Download from: https://www.postgresql.org/download/"
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Setup Backend
echo ""
echo "Setting up backend..."
cd backend
npm install
cp .env.example .env
echo "✅ Backend setup complete"

# Ask for database setup
echo ""
read -p "Do you want to set up PostgreSQL database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Creating database..."
    createdb kitchenpro 2>/dev/null || echo "Database might already exist"
    psql -U postgres -d kitchenpro -f ../database/schema.sql
    echo "✅ Database setup complete"
fi

# Setup Frontend
cd ../frontend
echo ""
echo "Setting up frontend..."
npm install
echo "✅ Frontend setup complete"

# Summary
echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd ../frontend && npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "Need help? Check README.md for detailed instructions."

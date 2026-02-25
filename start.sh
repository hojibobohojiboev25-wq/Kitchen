#!/bin/bash

# KitchenPro Startup Script for Unix/Linux/Mac

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "Starting KitchenPro from: $PROJECT_ROOT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to test if port is in use
test_port_in_use() {
    local port=$1
    if nc -zv localhost "$port" 2>/dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to wait for a server to start
wait_for_server() {
    local server_name=$1
    local port=$2
    local max_attempts=${3:-30}
    
    echo -e "${YELLOW}Waiting for $server_name on port $port...${NC}"
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if test_port_in_use "$port"; then
            echo -e "${GREEN}$server_name is ready!${NC}"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 1
    done
    
    echo -e "${RED}$server_name failed to start${NC}"
    return 1
}

# Check prerequisites
echo -e "${CYAN}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js not found${NC}"
    exit 1
fi

echo -e "${GREEN}Node.js $(node --version) found${NC}"

# Stop any existing processes
echo -e "${CYAN}Cleaning up old processes...${NC}"
pkill -f "npm run dev" || true

# Start backend and frontend
echo -e "${CYAN}Starting services...${NC}"

cd "$PROJECT_ROOT/backend"
npm run dev > "$PROJECT_ROOT/backend.log" 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

cd "$PROJECT_ROOT/frontend"
npm run dev > "$PROJECT_ROOT/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Wait for servers to be ready
wait_for_server "Backend" 5000 || exit 1
wait_for_server "Frontend" 5173 || exit 1

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}KitchenPro Started!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${CYAN}Backend:  http://localhost:5000${NC}"
echo -e "${CYAN}Frontend: http://localhost:5173${NC}"
echo -e "${YELLOW}Login: demo@kitchenpro.com / demo123${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Save PIDs to file for cleanup
echo "$BACKEND_PID" > "$PROJECT_ROOT/.backend.pid"
echo "$FRONTEND_PID" > "$PROJECT_ROOT/.frontend.pid"

# Cleanup function
cleanup() {
    echo -e "${YELLOW}Shutting down...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    rm -f "$PROJECT_ROOT/.backend.pid" "$PROJECT_ROOT/.frontend.pid"
    echo -e "${GREEN}Stopped${NC}"
}

# Trap SIGINT and SIGTERM
trap cleanup SIGINT SIGTERM

# Wait for background processes
wait

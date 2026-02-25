#!/usr/bin/env node

/**
 * KitchenPro Database Initialization Script
 * 
 * This script initializes the PostgreSQL database with the KitchenPro schema.
 * 
 * Prerequisites:
 * - PostgreSQL must be installed and running
 * - PostgreSQL must be accessible via psql command
 * - Create .env file in backend directory with database credentials
 * 
 * Usage:
 *   node database/init.js
 * 
 * Or from backend directory:
 *   npm run init:db
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCHEMA_FILE = path.join(__dirname, 'schema.sql');
const ENV_FILE = path.join(__dirname, '..', 'backend', '.env');

// Color output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Load environment variables
function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) {
    logWarning(`.env file not found. Using default credentials.`);
    return {
      DB_HOST: 'localhost',
      DB_PORT: '5432',
      DB_NAME: 'kitchenpro',
      DB_USER: 'postgres',
      DB_PASSWORD: 'password',
    };
  }

  const env = {};
  const content = fs.readFileSync(ENV_FILE, 'utf8');
  const lines = content.split('\n');

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      env[key.trim()] = valueParts.join('=').trim();
    }
  });

  return env;
}

// Check if PostgreSQL is installed
function checkPostgreSQL(callback) {
  exec('psql --version', (error, stdout) => {
    if (error) {
      logError('PostgreSQL is not installed or not in PATH');
      logInfo('Please install PostgreSQL from: https://www.postgresql.org/download/');
      process.exit(1);
    }
    logSuccess(`PostgreSQL found: ${stdout.trim()}`);
    callback();
  });
}

// Create database
function createDatabase(env, callback) {
  const cmd = `psql -U ${env.DB_USER} -h ${env.DB_HOST} -p ${env.DB_PORT} -c "CREATE DATABASE ${env.DB_NAME};"`;
  
  logInfo(`Creating database "${env.DB_NAME}"...`);
  
  exec(cmd, (error) => {
    if (error && !error.message.includes('already exists')) {
      logWarning(`Could not create database (it may already exist)`);
    } else {
      logSuccess(`Database ready`);
    }
    callback();
  });
}

// Initialize schema
function initializeSchema(env, callback) {
  logInfo(`Initializing schema from ${SCHEMA_FILE}...`);

  const cmd = `psql -U ${env.DB_USER} -h ${env.DB_HOST} -p ${env.DB_PORT} -d ${env.DB_NAME} -f "${SCHEMA_FILE}"`;

  exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
    if (error) {
      logError(`Failed to initialize schema: ${stderr}`);
      process.exit(1);
    }

    logSuccess(`Schema initialized successfully!`);
    
    // Count tables created
    const tableMatches = stdout.match(/CREATE TABLE/g);
    if (tableMatches) {
      logSuccess(`Created ${tableMatches.length} tables`);
    }

    callback();
  });
}

// Verify database connection
function verifyConnection(env, callback) {
  logInfo('Verifying database connection...');

  const cmd = `psql -U ${env.DB_USER} -h ${env.DB_HOST} -p ${env.DB_PORT} -d ${env.DB_NAME} -c "SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema='public';"`;

  exec(cmd, (error, stdout) => {
    if (error) {
      logError(`Could not connect to database: ${error}`);
      process.exit(1);
    }

    logSuccess(`Database connection verified!`);
    logInfo(stdout);
    callback();
  });
}

// Main initialization sequence
async function init() {
  log('\n╔════════════════════════════════════════╗', 'blue');
  log('║   KitchenPro Database Initialization   ║', 'blue');
  log('╚════════════════════════════════════════╝\n', 'blue');

  const env = loadEnv();

  logInfo(`Configuration:`);
  logInfo(`  Host: ${env.DB_HOST}`);
  logInfo(`  Port: ${env.DB_PORT}`);
  logInfo(`  Database: ${env.DB_NAME}`);
  logInfo(`  User: ${env.DB_USER}\n`);

  checkPostgreSQL(() => {
    createDatabase(env, () => {
      initializeSchema(env, () => {
        verifyConnection(env, () => {
          log('\n╔════════════════════════════════════════╗', 'green');
          log('║   ✅ Initialization Complete!         ║', 'green');
          log('╚════════════════════════════════════════╝\n', 'green');

          logSuccess('KitchenPro database is ready!\n');
          logInfo('Next steps:');
          logInfo('  1. Start the backend:   cd backend && npm run dev');
          logInfo('  2. Start the frontend:  cd frontend && npm run dev');
          logInfo('  3. Open http://localhost:3000 in your browser\n');

          logInfo('Demo credentials:');
          logInfo('  Email:    admin@kitchenpro.local');
          logInfo('  Password: admin123\n');
        });
      });
    });
  });
}

// Run initialization
init();

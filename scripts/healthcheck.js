#!/usr/bin/env node

/**
 * KitchenPro Health Check Script
 * 
 * Проверяет, что все компоненты работают корректно
 * 
 * Usage:
 *   node scripts/healthcheck.js
 */

const http = require('http');
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

function checkService(name, url, port, timeout = 5000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      log(`  ❌ ${name} - OFFLINE (не отвечает)`, 'red');
      resolve(false);
    }, timeout);

    const req = http.get(url, (res) => {
      clearTimeout(timer);
      
      if (res.statusCode >= 200 && res.statusCode < 300) {
        log(`  ✅ ${name} - ONLINE (порт ${port})`, 'green');
        resolve(true);
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        log(`  ✅ ${name} - ONLINE (редирект, порт ${port})`, 'green');
        resolve(true);
      } else {
        log(`  ⚠️  ${name} - HTTP ${res.statusCode}`, 'yellow');
        resolve(true);
      }
    });

    req.on('error', (err) => {
      clearTimeout(timer);
      if (err.code === 'ECONNREFUSED') {
        log(`  ❌ ${name} - OFFLINE (порт ${port} недоступен)`, 'red');
      } else {
        log(`  ❌ ${name} - Ошибка: ${err.message}`, 'red');
      }
      resolve(false);
    });
  });
}

async function runHealthCheck() {
  log('\n╔════════════════════════════════════════╗', 'blue');
  log('║      KitchenPro Health Check          ║', 'blue');
  log('╚════════════════════════════════════════╝\n', 'blue');

  log('Проверяю компоненты приложения...\n', 'blue');

  const results = {
    backend: await checkService(
      'Backend API',
      'http://localhost:5000/health',
      5000
    ),
    frontend: await checkService(
      'Frontend (Vite Dev)',
      'http://localhost:3000/',
      3000
    ),
  };

  const backendOk = results.backend;
  const frontendOk = results.frontend;

  log('');

  if (backendOk && frontendOk) {
    log('╔════════════════════════════════════════╗', 'green');
    log('║   ✅ Все компоненты работают!        ║', 'green');
    log('╚════════════════════════════════════════╝\n', 'green');

    log('Приложение готово:', 'green');
    log('  🌐 Frontend:  http://localhost:3000');
    log('  🔌 API:       http://localhost:5000/api\n');

    log('Демо учётные данные:', 'blue');
    log('  📧 Email:    admin@kitchenpro.local');
    log('  🔐 Password: admin123\n');
  } else {
    log('╔════════════════════════════════════════╗', 'red');
    log('║   ⚠️  Некоторые компоненты offline   ║', 'red');
    log('╚════════════════════════════════════════╝\n', 'red');

    if (!backendOk) {
      log('✗ Backend API не запущен', 'red');
      log('  Запустите:  cd backend && npm run dev\n');
    }

    if (!frontendOk) {
      log('✗ Frontend не запущен', 'red');
      log('  Запустите:  cd frontend && npm run dev\n');
    }
  }

  process.exit(backendOk && frontendOk ? 0 : 1);
}

// Run the health check
runHealthCheck().catch(console.error);

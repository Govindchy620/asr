import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, getDatabaseStatus } from './db/connection.js';
import { seedInitialDataIfEmpty } from './db/seed.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load environment variables (.env)
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
  } else {
    process.loadEnvFile();
  }
} catch (e) {
  // Native fallback if already loaded or not found
}

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().split('T')[1].replace('Z', '');
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// 3. Mount Routes
// Primary Zoho CRM REST API v8 routes
app.use('/api/v1', apiRouter);
// Direct alias for backward-compatibility
app.use('/api', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Zoho CRM Full Backend API Engine',
    version: '1.0.0',
    port: PORT,
    database: getDatabaseStatus(),
    documentation: {
      health: `http://localhost:${PORT}/api/v1/health`,
      leads: `http://localhost:${PORT}/api/v1/leads`,
      contacts: `http://localhost:${PORT}/api/v1/contacts`,
      accounts: `http://localhost:${PORT}/api/v1/accounts`,
      deals: `http://localhost:${PORT}/api/v1/deals`,
      workqueue: `http://localhost:${PORT}/api/v1/workqueue`,
      workqueueSummary: `http://localhost:${PORT}/api/v1/workqueue/summary`,
      leadConversion: `POST http://localhost:${PORT}/api/v1/leads/:id/convert`,
    },
  });
});

// 4. Server Initialization & MongoDB Connection
async function startServer() {
  console.log('====================================================');
  console.log('🚀 Starting Zoho CRM Enterprise Backend Server...');
  console.log(`📡 Port: ${PORT}`);
  console.log('====================================================');

  try {
    const conn = await connectDB();
    if (conn) {
      await seedInitialDataIfEmpty();
    }
  } catch (err) {
    console.error('Database connection warning:', err.message);
  }

  const server = app.listen(PORT, () => {
    console.log(`\n✅ CRM Backend Server is actively running on: http://localhost:${PORT}`);
    console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/v1/health`);
    console.log(`📋 Workqueue API: http://localhost:${PORT}/api/v1/workqueue`);
    console.log(`👥 Leads API:     http://localhost:${PORT}/api/v1/leads`);
    console.log(`🏢 Accounts API:  http://localhost:${PORT}/api/v1/accounts`);
    console.log(`📇 Contacts API:  http://localhost:${PORT}/api/v1/contacts`);
    console.log(`💼 Deals API:     http://localhost:${PORT}/api/v1/deals`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Error: Port ${PORT} is already in use by another process!`);
      console.error(`👉 Solution: Port ${PORT} par chal rahe process ko band karein ya PORT env variable badlein.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();

import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows DNS ECONNREFUSED with MongoDB SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not permitted
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log('Using existing MongoDB Atlas connection');
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('⚠️ WARNING: MONGODB_URI is not defined in environment variables! Running in memory/offline mode.');
    return null;
  }

  try {
    const opts = {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    };

    console.log('Connecting to MongoDB Atlas cluster...');
    const conn = await mongoose.connect(uri, opts);
    isConnected = true;
    console.log(`✅ MongoDB Atlas Connected Successfully: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Reconnecting...');
      isConnected = false;
    });

    return conn;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error.message);
    console.warn('⚠️ Please verify your IP is whitelisted in MongoDB Atlas Network Access (e.g. 0.0.0.0/0).');
    return null;
  }
}

export function getDatabaseStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const state = mongoose.connection.readyState;
  return {
    state: states[state] || 'unknown',
    isConnected: state === 1,
    host: mongoose.connection.host || null,
    dbName: mongoose.connection.name || null,
  };
}

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/db.js';
import adminAuthRoutes from './routes/adminAuth.js';
import authRoutes from './routes/auth.js';
import customerProductsRoutes from './routes/customerProducts.js';
import customerRoutes from './routes/customers.js';
import distributorAuthRoutes from './routes/distributorAuth.js';
import distributorsRoutes from './routes/distributors.js';
import inventoryProductsRoutes from './routes/inventoryProducts.js';
import serviceRequestsRoutes from './routes/serviceRequests.js';
import retailerAuthRoutes from './routes/retailerAuth.js';
import retailersRoutes from './routes/retailers.js';
import subAdminAuthRoutes from './routes/subAdminAuth.js';
import subAdminsRoutes from './routes/subadmins.js';
import { syncAdminAccount } from './utils/seedAdmin.js';
import { syncInventoryProductsCatalog } from './utils/seedInventoryProducts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const parsedPort = Number.parseInt(process.env.PORT || '5000', 10);
const port = Number.isFinite(parsedPort) ? parsedPort : 5000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(
  cors({
    origin: corsOrigin,
  }),
);
app.use(express.json());

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

app.get('/', (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'Kitchen Appliance backend is running.',
  });
});

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'Backend is healthy.',
    databaseState: mongoose.connection.readyState,
  });
});

app.use('/api/admin', adminAuthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customer-products', customerProductsRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/distributor', distributorAuthRoutes);
app.use('/api/distributors', distributorsRoutes);
app.use('/api/inventory-products', inventoryProductsRoutes);
app.use('/api/service-requests', serviceRequestsRoutes);
app.use('/api/retailer', retailerAuthRoutes);
app.use('/api/retailers', retailersRoutes);
app.use('/api/subadmin', subAdminAuthRoutes);
app.use('/api/subadmins', subAdminsRoutes);

const startServer = async () => {
  try {
    await connectDatabase();
    await syncAdminAccount();
    await syncInventoryProductsCatalog();

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

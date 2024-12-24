import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import kurikulumRoutes from './routes/kurikulum.route.js';
import kursusRoutes from './routes/kursus.route.js';
import pengajarRoutes from './routes/pengajar.route.js';
import siswaRoutes from './routes/siswa.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, '/client/dist')));

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/kurikulum', kurikulumRoutes);
app.use('/api/kursus', kursusRoutes);
app.use('/api/pengajar', pengajarRoutes);
app.use('/api/siswa', siswaRoutes);

// Catch-all to serve client app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

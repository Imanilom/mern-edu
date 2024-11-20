import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import curriculumRoutes from './routes/curriculumRoutes.js';
import classRoutes from './routes/classRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import extracurricularRoutes from './routes/extracurricularRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import monitoringRoutes from './routes/monitoringRoutes.js';
import financingRoutes from './routes/financingRoutes.js';
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
app.use('/api/curriculums', curriculumRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/extracurriculars', extracurricularRoutes);
app.use('/api/supports', supportRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/financing', financingRoutes);

// Catch-all to serve client app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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

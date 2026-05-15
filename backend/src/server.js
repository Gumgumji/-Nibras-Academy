// ============================================
// LMS API - Main Server
// ============================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// استيراد Prisma client و Routes
const prisma = require('./config/prisma');
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');

// إنشاء التطبيق
const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Routes =====

// Route تجريبي
app.get('/', (req, res) => {
  res.json({
    message: 'LMS API is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Route لاختبار الاتصال بقاعدة البيانات
app.get('/api/test-db', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const courseCount = await prisma.course.count();
    res.json({
      message: 'Database connection successful!',
      data: { users: userCount, courses: courseCount }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// ===== تشغيل السيرفر =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('========================================');
  console.log(`Server is running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log('========================================');
});
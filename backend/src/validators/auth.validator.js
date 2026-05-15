const { z } = require('zod');

// schema للتسجيل
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'TRAINEE']).optional().default('TRAINEE')
});

// schema للدخول
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

module.exports = { registerSchema, loginSchema };
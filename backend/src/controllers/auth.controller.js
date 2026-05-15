//   HTTP status codes 
// 201 Created -> الإنشاء نجح (register)
// 200 OK -> العملية نجحت (login)
// 400 Bad Request -> بيانات خاطئة (validation)
// 401 Unauthorized -> بيانات دخول غلط
// 409 Conflict -> تعارض (إيميل مكرر)
// 500 Internal Server Error -> خطأ غير متوقع في السيرفر

//--------------------------------------------------------------

const authService = require('../services/auth.service');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

// POST /api/auth/register
async function register(req, res) {
  try {
    // تحقق من البيانات
    const validatedData = registerSchema.parse(req.body);

    // استدعاء الـ service
    const result = await authService.register(validatedData);

    return res.status(201).json({
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    // أخطاء Zod
    if (error.name === 'ZodError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors
      });
    }

    // إيميل مكرر
    if (error.message === 'Email already registered') {
      return res.status(409).json({ message: error.message });
    }

    // أي خطأ ثاني
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData.email, validatedData.password);

    return res.status(200).json({
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors
      });
    }

    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

module.exports = { register, login };
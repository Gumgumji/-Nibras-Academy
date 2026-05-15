const userRepository = require('../repositories/user.repository');
const { hashPassword, comparePassword } = require('../utils/password');
const { signToken } = require('../utils/jwt');

// تسجيل مستخدم جديد
async function register(userData) {
  // تحقق ما فيه إيميل مكرر
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // تشفير كلمة المرور
  const hashedPassword = await hashPassword(userData.password);

  // إنشاء المستخدم
  const user = await userRepository.createUser({
    ...userData,
    password: hashedPassword
  });

  // إنشاء JWT
  const token = signToken({ userId: user.id, role: user.role });

  // إرجاع المستخدم بدون الباسوورد + التوكن
  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

// تسجيل الدخول
async function login(email, password) {
  // البحث عن المستخدم
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // مقارنة الباسوورد
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // إنشاء JWT
  const token = signToken({ userId: user.id, role: user.role });

  // إرجاع المستخدم بدون الباسوورد + التوكن
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

module.exports = { register, login };
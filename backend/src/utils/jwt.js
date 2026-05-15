
// ============================================
// JWT Utilities
// إنشاء والتحقق من JSON Web Tokens
// ============================================

const jwt = require('jsonwebtoken');

// قراءة الـ secret من متغيرات البيئة
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// تحقق من وجود الـ secret عند بدء التطبيق
// (لو ناسي تضيفه في .env التطبيق ما يشتغل أصلاً)
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env file');
}

/**
 * إنشاء JWT جديد
 * @param {object} payload - البيانات اللي تنحط في التوكن (userId, role)
 * @returns {string} - التوكن المُوقَّع
 */
function signToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
  return token;
}

/**
 * التحقق من صحة JWT
 * @param {string} token - التوكن اللي جاي من المستخدم
 * @returns {object} - الـ payload لو التوكن صحيح
 * @throws {Error} - يرجع ارور حال كان غلط او منتهي 
 */
function verifyToken(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}

module.exports = {
  signToken,
  verifyToken
};
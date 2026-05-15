// ============================================
// Password Utilities
// تشفير ومقارنة كلمات المرور
// ============================================

const bcrypt = require('bcrypt');

// عدد جولات التشفير (Cost Factor)
// الرقم الأعلى = أكثر أمان لكن أبطأ
const SALT_ROUNDS = 10;
// شفّر كلمة المرور باستخدام مستوى تعقيد 10

/**
 * تشفير كلمة المرور
 * @param {string} plainPassword - كلمة المرور بدون تشفير
 * @returns {Promise<string>} - كلمة المرور المشفّرة
 */
async function hashPassword(plainPassword) {
  const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hashed;
}

/**
 * مقارنة كلمة المرور بالـ hash
 * @param {string} plainPassword - كلمة المرور المُدخَلة من المستخدم
 * @param {string} hashedPassword - كلمة المرور المخزّنة في قاعدة البيانات
 * @returns {Promise<boolean>} - true لو متطابقة
 */
async function comparePassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}

module.exports = {
  hashPassword,
  comparePassword
};
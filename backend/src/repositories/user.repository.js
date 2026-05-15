const prisma = require('../config/prisma');

// إنشاء مستخدم جديد
async function createUser(userData) {
  return await prisma.user.create({ data: userData });
}

// البحث عن مستخدم بالإيميل
async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

// البحث عن مستخدم بالـ ID
async function findUserById(id) {
  return await prisma.user.findUnique({ where: { id } });
}

module.exports = { createUser, findUserByEmail, findUserById };
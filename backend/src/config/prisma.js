// ===========================================
// Prisma Client Instance
// ===========================================
// ننشئ instance واحد من PrismaClient ونستخدمه في كل المشروع
// (Singleton pattern)
// عشان لا نفتح اتصالات كثيرة لقاعدة البيانات

const { PrismaClient } = require('@prisma/client');

//اليو آر إل ينقري تلقائيا من ملف .انف عن طريق سكيما . بريزما
const prisma = new PrismaClient();

module.exports = prisma;
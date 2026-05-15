const prisma = require('../config/prisma');

// إنشاء كورس جديد في قاعدة البيانات
async function createCourse(data) {
  return await prisma.course.create({ data });
}

// جلب كل الكورسات مرتبة بالأحدث أولاً
async function findAllCourses() {
  return await prisma.course.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

// البحث عن كورس واحد بالـ ID
// يرجع null لو ما لقاه
async function findCourseById(id) {
  return await prisma.course.findUnique({ where: { id } });
}

// تحديث كورس بالـ ID
// Prisma يحدث الحقول الموجودة في data فقط
async function updateCourse(id, data) {
  return await prisma.course.update({ where: { id }, data });
}

// حذف كورس بالـ ID
async function deleteCourse(id) {
  return await prisma.course.delete({ where: { id } });
}

module.exports = {
  createCourse,
  findAllCourses,
  findCourseById,
  updateCourse,
  deleteCourse
};
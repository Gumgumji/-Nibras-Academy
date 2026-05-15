const courseRepository = require('../repositories/course.repository');

// إنشاء كورس جديد (Admin فقط)
// نضيف createdById من المستخدم اللي مسجّل الدخول
async function createCourse(data, userId) {
  return await courseRepository.createCourse({ ...data, createdById: userId });
}

// جلب كل الكورسات
async function getAllCourses() {
  return await courseRepository.findAllCourses();
}

// جلب كورس واحد + التأكد إنه موجود
// لو ما هو موجود، نرمي خطأ يتعامل معه الـ controller
async function getCourseById(id) {
  const course = await courseRepository.findCourseById(id);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
}

// تحديث كورس
// نتأكد إنه موجود أول، عشان ما يحاول Prisma يحدث شي مش موجود
async function updateCourse(id, data) {
  await getCourseById(id);
  return await courseRepository.updateCourse(id, data);
}

// حذف كورس
// نفس الفكرة: نتأكد إنه موجود أول
async function deleteCourse(id) {
  await getCourseById(id);
  return await courseRepository.deleteCourse(id);
}

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
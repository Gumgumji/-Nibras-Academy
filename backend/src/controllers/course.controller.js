const courseService = require('../services/course.service');
const { createCourseSchema, updateCourseSchema } = require('../validators/course.validator');

// POST /api/courses - إنشاء كورس (Admin فقط)
async function create(req, res) {
  try {
    // تحقق من البيانات بـ Zod
    const data = createCourseSchema.parse(req.body);
    // req.user جاي من الـ auth middleware
    const course = await courseService.createCourse(data, req.user.userId);
    return res.status(201).json({ message: 'Course created', data: course });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
}

// GET /api/courses - جلب كل الكورسات (Admin + Trainee)
async function getAll(req, res) {
  try {
    const courses = await courseService.getAllCourses();
    return res.status(200).json({ data: courses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// GET /api/courses/:id - جلب كورس واحد (Admin + Trainee)
async function getOne(req, res) {
  try {
    // parseInt لأن req.params دايماً string، والـ id في DB هو int
    const course = await courseService.getCourseById(parseInt(req.params.id));
    return res.status(200).json({ data: course });
  } catch (error) {
    if (error.message === 'Course not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

// PUT /api/courses/:id - تحديث كورس (Admin فقط)
async function update(req, res) {
  try {
    // updateCourseSchema يقبل أي حقل (كلها optional)
    const data = updateCourseSchema.parse(req.body);
    const course = await courseService.updateCourse(parseInt(req.params.id), data);
    return res.status(200).json({ message: 'Course updated', data: course });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    if (error.message === 'Course not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

// DELETE /api/courses/:id - حذف كورس (Admin فقط)
async function remove(req, res) {
  try {
    await courseService.deleteCourse(parseInt(req.params.id));
    return res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    if (error.message === 'Course not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { create, getAll, getOne, update, remove };
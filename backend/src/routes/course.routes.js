const express = require('express');
const courseController = require('../controllers/course.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

const router = express.Router();

// ===== Routes للجميع (Admin + Trainee) =====
// لازم تسجيل دخول، لكن أي role يقدر يشوف الكورسات

// جلب كل الكورسات
router.get('/', authenticate, courseController.getAll);

// جلب كورس واحد
router.get('/:id', authenticate, courseController.getOne);


// ===== Routes للأدمن فقط =====
// authenticate يتحقق من التوكن، requireRole يتحقق من الـ role

// إنشاء كورس
router.post('/', authenticate, requireRole('ADMIN'), courseController.create);

// تحديث كورس
router.put('/:id', authenticate, requireRole('ADMIN'), courseController.update);

// حذف كورس
router.delete('/:id', authenticate, requireRole('ADMIN'), courseController.remove);

module.exports = router;
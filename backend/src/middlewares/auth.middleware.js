const { verifyToken } = require('../utils/jwt');

// التحقق من JWT
function authenticate(req, res, next) {
  try {
    // التوكن يجي في الـ header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) { // Bearer يحدد نوع التوكن وهل حامله مخول ام لا
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // حفظ بيانات المستخدم في req عشان نستخدمها بعدين
    // ونعرف دوره ورقمه بمجرد 
    // req.user.id          = 5 ror ex
    req.user = decoded;
    // لو التوكن صحيح يكمل نكست
    next();
  } catch (error) { // لو غلط يرجعله الرسالة التالية
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// التحقق من الـ role
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

module.exports = { authenticate, requireRole };
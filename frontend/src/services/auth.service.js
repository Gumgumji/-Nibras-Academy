import api from './api';

// تسجيل دخول
async function login(email, password) {
  // POST /api/auth/login
  const response = await api.post('/auth/login', { email, password });

  // الـ Backend يرجع: { data: { user, token } }
  const { user, token } = response.data.data;

  // خزّن في localStorage عشان نستخدمها في الـ requests الجاية
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return { user, token };
}

// تسجيل خروج
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// جلب المستخدم الحالي من localStorage
function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// تحقق هل المستخدم مسجّل دخول
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export default { login, logout, getCurrentUser, isAuthenticated };
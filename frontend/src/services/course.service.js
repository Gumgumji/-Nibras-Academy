import api from './api';

// جلب كل الكورسات
async function getAll() {
  const response = await api.get('/courses');
  return response.data.data;  // الـ Backend يرجع { data: [...] }
}

// جلب كورس واحد بالـ id
async function getOne(id) {
  const response = await api.get(`/courses/${id}`);
  return response.data.data;
}

// إنشاء كورس جديد (Admin فقط)
async function create(courseData) {
  const response = await api.post('/courses', courseData);
  return response.data.data;
}

// تحديث كورس (Admin فقط)
async function update(id, courseData) {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data.data;
}

// حذف كورس (Admin فقط)
async function remove(id) {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
}

export default { getAll, getOne, create, update, remove };
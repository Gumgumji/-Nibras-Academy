import axios from 'axios';

        //انشاء انستنس من اكشس بإعدادات ثابتة 
        // baseURL = Backend
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // كل ريكوست يبدا من دا العنوان
});

// ===== Request Interceptor =====
        // اعترض كل ركوست قبل ما يطلع واضف عليه التوكن تلقائي
        // مايحتاج نكتب اوثرايزيشن هدر في كل مكان 
api.interceptors.request.use((config) => { 

  const token = localStorage.getItem('token');   // اقرا التوكن من اللوكل ستورج ويكون مخزم وقت تسجيل الدخول 

  if (token) {
                     // لو يوجد توكن اضقه بالهدر
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

        // ===== Response Interceptor =====
        // اعترض كل رسبونس جاي من الباك اند
        // لو التوكن منتهي 401 طلع المستخدم تلقائيا
api.interceptors.response.use(
         // رجع الرد كما هو سواء نجح او فشل
  (response) => response,

  // لو فيه خطأ
  (error) => {
    // 401 = توكن غلط أو منتهي
    if (error.response?.status === 401) {
      // امسح التوكن والمستخدم من المتصفح
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // ارجع لصفحة تسجيل الدخول
      window.location.href = '/login';
    }

    //مرر الخطأ للكومبوننت اللي طلبه 
    return Promise.reject(error);
  }
);

export default api;
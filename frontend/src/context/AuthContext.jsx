import { createContext, useContext, useState } from 'react';
import authService from '../services/auth.service';

// إنشاء الـ Context
// هذا "صندوق" مشترك يقدر أي component يفتحه
const AuthContext = createContext(null);

// Provider: المكوّن اللي يلف التطبيق ويوفّر البيانات
// أي component جواه يقدر يستخدم البيانات
export function AuthProvider({ children }) {
  // حالة المستخدم: نقرأها من localStorage عند بدء التطبيق
  // كذا لو المستخدم refresh الصفحة، ما يحتاج يسجّل دخول من جديد
  const [user, setUser] = useState(authService.getCurrentUser());

  // دالة تسجيل الدخول
  // 1) تستدعي الـ service (اللي يكلّم الـ Backend)
  // 2) تحدّث الـ state عشان كل التطبيق يعرف بالمستخدم الجديد
  async function login(email, password) {
    const { user } = await authService.login(email, password);
    setUser(user);
    return user;
  }

  // دالة تسجيل الخروج
  function logout() {
    authService.logout();
    setUser(null);
  }

  // البيانات والدوال اللي نشاركها مع باقي التطبيق
  const value = {
    user,                              // بيانات المستخدم (أو null)
    isAuthenticated: !!user,           // هل مسجّل دخول؟
    isAdmin: user?.role === 'ADMIN',   // هل أدمن؟
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook مخصص لتسهيل استخدام الـ Context
// بدل ما نكتب useContext(AuthContext) في كل مكان، نكتب useAuth()
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
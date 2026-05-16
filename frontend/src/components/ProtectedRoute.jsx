import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// مكوّن يحمي الصفحات
// يتأكد إن المستخدم مسجّل دخول قبل ما يدخل الصفحة
// لو فيه requireAdmin=true، يتأكد كمان إنه أدمن
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  // لو ما هو مسجّل دخول، حوّله لصفحة الـ login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // لو الصفحة محتاجة أدمن وهو مو أدمن، حوّله لصفحة الكورسات
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/courses" replace />;
  }

  // كل شي تمام، اعرض الصفحة
  return children;
}
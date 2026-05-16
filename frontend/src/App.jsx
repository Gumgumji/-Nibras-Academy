import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CoursesList from './pages/CoursesList';
import CourseDetail from './pages/CourseDetail';
import CourseForm from './pages/CourseForm';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* قائمة الكورسات */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesList />
            </ProtectedRoute>
          }
        />

        {/* إنشاء كورس جديد (Admin فقط) */}
        <Route
          path="/courses/new"
          element={
            <ProtectedRoute requireAdmin>
              <CourseForm />
            </ProtectedRoute>
          }
        />

        {/* تعديل كورس (Admin فقط) */}
        <Route
          path="/courses/:id/edit"
          element={
            <ProtectedRoute requireAdmin>
              <CourseForm />
            </ProtectedRoute>
          }
        />

        {/* تفاصيل كورس */}
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
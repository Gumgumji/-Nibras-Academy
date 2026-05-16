import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/course.service';
import Navbar from '../components/Navbar';

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      await courseService.remove(id);
      loadCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* ===== Hero Section ===== */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">All Courses</h1>
              <p className="text-white/90 text-lg">
                Discover and learn from our curated courses 
              </p>
            </div>

            {/* زر Add Course (Admin فقط) */}
            {isAdmin && (
              <button
                onClick={() => navigate('/courses/new')}
                className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none gap-2"
              >
                <span className="text-xl">+</span> Add New Course
              </button>
            )}
          </div>
        </div>

        {/* ===== Stats ===== */}
        <div className="stats shadow w-full mb-8 bg-base-100">
          <div className="stat">
            <div className="stat-title">Total Courses</div>
            <div className="stat-value text-primary">{courses.length}</div>
          </div>
        </div>

        {/* ===== رسالة الخطأ ===== */}
        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
          </div>
        )}

        {/* ===== المحتوى ===== */}
        {loading ? (
          // حالة التحميل
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-base-content/60">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          // ما فيه كورسات
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold">No courses yet</h2>
              <p className="text-base-content/60">
                {isAdmin ? 'Start by adding your first course' : 'Check back soon for new courses'}
              </p>
            </div>
          </div>
        ) : (
          // عرض الكورسات
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-300"
              >
                {/* Thumbnail بـ gradient */}
                <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 h-32 flex items-center justify-center rounded-t-2xl">
                  <span className="text-5xl">🎓</span>
                </div>

                <div className="card-body">
                  <h2 className="card-title text-lg line-clamp-1">{course.title}</h2>
                  <p className="text-base-content/70 text-sm line-clamp-3">
                    {course.description}
                  </p>

                  {/* الأزرار */}
                  <div className="card-actions justify-end mt-4 gap-2">
                    <Link
                      to={`/courses/${course.id}`}
                      className="btn btn-primary btn-sm flex-1"
                    >
                      View Course
                    </Link>

                    {isAdmin && (
                      <>
                        <button
                          onClick={() => navigate(`/courses/${course.id}/edit`)}
                          className="btn btn-sm btn-ghost"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(course.id, course.title)}
                          className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
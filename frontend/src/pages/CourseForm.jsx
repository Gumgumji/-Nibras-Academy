import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import courseService from '../services/course.service';
import Navbar from '../components/Navbar';

export default function CourseForm() {
  // useParams: لو فيه id في الـ URL، يعني Edit mode
  // لو ما فيه، يعني Create mode
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  // ===== State =====
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(isEditMode);
  const [error, setError] = useState('');

  // ===== لو Edit mode، جيب بيانات الكورس =====
  useEffect(() => {
    if (isEditMode) {
      loadCourse();
    }
  }, [id]);

  async function loadCourse() {
    try {
      const course = await courseService.getOne(id);
      setFormData({
        title: course.title,
        description: course.description,
        youtubeUrl: course.youtubeUrl,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load course');
    } finally {
      setLoadingCourse(false);
    }
  }

  // ===== تحديث الـ form لما المستخدم يكتب =====
  // function وحدة لكل الحقول بدل ما نسوي وحدة لكل حقل
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ===== الـ submit =====
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        // تحديث كورس موجود
        await courseService.update(id, formData);
      } else {
        // إنشاء كورس جديد
        await courseService.create(formData);
      }

      // بعد النجاح، ارجع لقائمة الكورسات
      navigate('/courses');
    } catch (err) {
      // لو فيه Validation errors من Zod
      if (err.response?.data?.errors) {
        const firstError = err.response.data.errors[0];
        setError(firstError.message || 'Validation failed');
      } else {
        setError(err.response?.data?.message || 'Operation failed');
      }
    } finally {
      setLoading(false);
    }
  }

  // ===== Loading state للـ Edit mode =====
  if (loadingCourse) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/60">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">

        {/* زر الرجوع */}
        <Link to="/courses" className="btn btn-ghost btn-sm mb-4 gap-2">
          ← Back to Courses
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            {isEditMode ? 'Edit Course' : 'Create New Course'}
          </h1>
          <p className="text-white/90">
            {isEditMode ? 'Update course information' : 'Add a new course to the platform'}
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">

            {/* رسالة الخطأ */}
            {error && (
              <div className="alert alert-error mb-4">
                <span>⚠️ {error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Title <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Introduction to Node.js"
                  className="input input-bordered focus:input-primary w-full"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  minLength={3}
                />
                <p className="text-xs text-base-content/50 mt-1">
                  At least 3 characters
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-error">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="What will students learn in this course..."
                  className="textarea textarea-bordered focus:textarea-primary w-full h-32"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minLength={10}
                />
                <p className="text-xs text-base-content/50 mt-1">
                  At least 10 characters
                </p>
              </div>

              {/* YouTube URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  YouTube Video URL <span className="text-error">*</span>
                </label>
                <input
                  type="url"
                  name="youtubeUrl"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="input input-bordered focus:input-primary w-full"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-base-content/50 mt-1">
                  Must be a valid YouTube URL
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/courses')}
                  className="btn btn-ghost flex-1"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : isEditMode ? (
                    'Update Course'
                  ) : (
                    'Create Course'
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
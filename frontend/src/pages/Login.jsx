import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  // حالات النموذج
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // دالة تسجيل الدخول
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* اللوقو - SVG inline بدل emoji */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-3">
            {/* أيقونة كتاب مفتوح من Heroicons (مجانية) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-base-content">
            Nibras Academy
          </h1>
          <p className="text-base-content/60 mt-1">Welcome back! Please sign in</p>
        </div>

        {/* الكارد */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">

            {error && (
              <div className="alert alert-error mb-2">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* حقل الإيميل */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@lms.com"
                  className="input input-bordered focus:input-primary w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* حقل كلمة المرور */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered focus:input-primary w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* زر تسجيل الدخول - بنفس لون اللوقو (indigo) */}
              <button
                type="submit"
                style={{ backgroundColor: '#3e41e1' }}
                className="w-full mt-6 py-3 px-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Sign In'
                )}
              </button>
              
            </form>

            {/* حسابات تجريبية */}
            <div className="divider text-xs text-base-content/40 mt-6">DEMO ACCOUNTS</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-primary/10 p-3 rounded-lg">
                <div className="font-bold text-primary mb-1">Admin</div>
                <div className="text-base-content/70">admin@lms.com</div>
                <div className="text-base-content/70">admin1234</div>
              </div>
              <div className="bg-secondary/10 p-3 rounded-lg">
                <div className="font-bold text-secondary mb-1">Trainee</div>
                <div className="text-base-content/70">trainee@lms.com</div>
                <div className="text-base-content/70">trainee1234</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
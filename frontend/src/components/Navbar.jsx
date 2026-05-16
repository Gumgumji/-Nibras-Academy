import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-300 sticky top-0 z-50 px-4">

      {/* اللوقو */}
      <div className="flex-1">
        <Link to="/courses" className="flex items-center gap-2 text-xl font-bold">
          
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
           Nibras Academy
          </span>
        </Link>
      </div>

      {/* الجزء الأيمن: معلومات المستخدم + Logout */}
      <div className="flex items-center gap-3">

        {/* معلومات المستخدم */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-semibold">{user?.name}</span>
          <span className={`badge badge-sm ${isAdmin ? 'badge-primary' : 'badge-secondary'}`}>
            {user?.role}
          </span>
        </div>

        {/* Avatar */}
        <div className="avatar placeholder">
          <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full w-10">
            <span className="text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* زر Logout */}
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-ghost text-error hover:bg-error/10"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
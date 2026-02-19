import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100 mb-8">
      <Link to="/" className="text-2xl font-bold">
        Vehicle Booking system
      </Link>
      <nav>
        <ul className="flex gap-6">
          {localStorage.getItem("token") && (
            <>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

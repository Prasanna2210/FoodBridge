import {Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b px-8 py-5 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold">
          Welcome, {user?.name} 👋
        </h2>

        <p className="text-gray-500">
          {user?.role === "donor"
            ? user?.donorType
            : user?.recipientType}
        </p>
      </div>

      <div className="flex items-center gap-4">

  <Link
    to="/profile"
    className="px-4 py-2 rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition"
  >
    My Profile
  </Link>

  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg text-white font-medium"
  >
    Logout
  </button>

</div>
    </header>
  );
};

export default Navbar;
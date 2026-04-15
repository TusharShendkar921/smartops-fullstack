import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">SmartOps</h1>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/teams" className="hover:text-blue-600">
          Teams
        </Link>

        <Link to="/projects" className="hover:text-blue-600">
          Projects
        </Link>

        <Link to="/tasks" className="hover:text-blue-600">
          Tasks
        </Link>

        {(role === "ADMIN" || role === "MANAGER") && (
          <Link to="/logs" className="hover:text-blue-600">
            Logs
          </Link>
        )}

        {role === "ADMIN" && (
          <Link to="/users" className="hover:text-blue-600">
            Users
          </Link>
        )}

        <span className="text-sm text-gray-600 font-medium">
          {user?.name} ({role})
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
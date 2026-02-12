import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        Store Rating App
      </h1>

      <div className="flex gap-6 items-center">
        {role === "USER" && (
          <button onClick={() => navigate("/user")}>
            Stores
          </button>
        )}
        {role === "ADMIN" && (
          <button onClick={() => navigate("/admin")}>
            Dashboard
          </button>
        )}
        {role === "OWNER" && (
          <button onClick={() => navigate("/owner")}>
            My Stores
          </button>
        )}

        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

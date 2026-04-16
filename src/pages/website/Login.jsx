import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(email.trim(), password);

      console.log("Login result:", result);

      if (!result?.success) {
        setError(result?.message || "Login failed");
        return;
      }

      const userRole =
        result?.role ||
        result?.user?.role ||
        result?.data?.role ||
        result?.data?.user?.role ||
        "";

      console.log("Detected role:", userRole);

      if (String(userRole).toLowerCase() === "admin") {
        navigate("/dashboard");
      } else {
        setError("Access denied! Only admin can login.");

        if (logout) {
          logout();
        }

        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-500">
            Only authorized admin can access dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login as Admin"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          This portal is restricted to admin only
        </p>
      </div>
    </div>
  );
};

export default Login;
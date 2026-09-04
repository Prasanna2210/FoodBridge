import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!token) {
      toast.error("Invalid password reset link.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(response.data.message);

      setResetSuccessful(true);
    } catch (error) {
      console.error("Reset password error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">
                🔐
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              Reset Password
            </h1>

            {!resetSuccessful && (
              <p className="text-gray-500 mt-2">
                Enter your new password below.
              </p>
            )}

          </div>

          {!resetSuccessful ? (

            <form onSubmit={handleSubmit}>

              {/* New Password */}
              <div className="mb-5">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  New Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                    focus:border-emerald-500
                    disabled:bg-gray-100"
                />

              </div>

              {/* Confirm Password */}
              <div className="mb-6">

                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                    focus:border-emerald-500
                    disabled:bg-gray-100"
                />

              </div>

              {/* Reset button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700
                  text-white py-3 rounded-lg font-semibold transition
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>

            </form>

          ) : (

            /* Success */
            <div className="text-center">

              <div className="w-14 h-14 bg-emerald-100 rounded-full
                flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-2xl">
                  ✓
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Password Reset Successfully
              </h2>

              <p className="text-gray-600 text-sm mb-6">
                Your password has been changed successfully.
                You can now log in with your new password.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full bg-emerald-600 hover:bg-emerald-700
                  text-white py-3 rounded-lg font-semibold transition"
              >
                Go to Login
              </button>

            </div>

          )}

          {!resetSuccessful && (
            <div className="text-center mt-6">

              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700
                  font-semibold text-sm"
              >
                ← Back to Login
              </Link>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;
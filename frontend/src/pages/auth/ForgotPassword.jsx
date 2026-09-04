import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      toast.success(response.data.message);

      setSubmitted(true);
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to send password reset email."
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
              <span className="text-3xl">🔐</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              Forgot Password?
            </h1>

            <p className="text-gray-500 mt-2">
              Enter your email address and we'll send you
              a password reset link.
            </p>

          </div>

          {!submitted ? (

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-6">

                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                    focus:border-emerald-500 disabled:bg-gray-100"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700
                  text-white py-3 rounded-lg font-semibold transition
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>

            </form>

          ) : (

            /* Success message */
            <div className="text-center">

              <div className="w-14 h-14 bg-emerald-100 rounded-full
                flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-2xl">✓</span>
              </div>

              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Check your email
              </h2>

              <p className="text-gray-600 text-sm mb-6">
                If an account with that email exists, we've
                sent a password reset link.
              </p>

            </div>

          )}

          {/* Back to Login */}
          <div className="text-center mt-6">

            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700
                font-semibold text-sm"
            >
              ← Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;
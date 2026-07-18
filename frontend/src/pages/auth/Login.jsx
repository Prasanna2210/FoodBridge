import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import PasswordInput from "../../components/common/PasswordInput";
import LoadingButton from "../../components/common/LoadingButton";

import useAuth from "../../hooks/useAuth";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const user = await login(
        formData.email,
        formData.password
      );

      toast.success("Login Successful 🎉");

      if (user.role === "donor") {
        navigate("/donor");
      } else {
        navigate("/recipient");
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue to FoodBridge"
    >

      <form onSubmit={handleSubmit}>

        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <LoadingButton loading={loading}>
          Login
        </LoadingButton>

      </form>

      <p className="text-center mt-6 text-gray-600">

        Don't have an account?

        <Link
          to="/register"
          className="text-emerald-600 font-semibold ml-2 hover:underline"
        >
          Register
        </Link>

      </p>

    </AuthLayout>
  );
};

export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import PasswordInput from "../../components/common/PasswordInput";
import SelectField from "../../components/common/SelectField";
import LoadingButton from "../../components/common/LoadingButton";

import { registerUser } from "../../services/authService";
import { validateRegister } from "../../utils/validation";
const donorTypes = [
  "Restaurant",
  "Wedding Organizer",
  "Marriage Hall",
  "Birthday Party",
  "Corporate Event",
  "Individual",
];

const recipientTypes = [
  "NGO",
  "Orphanage",
  "Old Age Home",
];

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    donorType: "",
    recipientType: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateRegister(formData);

  if (validationError) {
    toast.error(validationError);
    return;
  }
  
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        donorType:
          formData.role === "donor"
            ? formData.donorType
            : null,
        recipientType:
          formData.role === "recipient"
            ? formData.recipientType
            : null,
        address: formData.address,
        password: formData.password,
      };

      await registerUser(payload);

      toast.success("Registration Successful");

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join FoodBridge Today"
    >
      <form onSubmit={handleSubmit}>

        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <SelectField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={["donor", "recipient"]}
        />

        {formData.role === "donor" && (
          <SelectField
            label="Donor Type"
            name="donorType"
            value={formData.donorType}
            onChange={handleChange}
            options={donorTypes}
          />
        )}

        {formData.role === "recipient" && (
          <SelectField
            label="Recipient Type"
            name="recipientType"
            value={formData.recipientType}
            onChange={handleChange}
            options={recipientTypes}
          />
        )}

        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <LoadingButton loading={loading}>
          Register
        </LoadingButton>

      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?

        <Link
          to="/login"
          className="text-emerald-600 font-semibold ml-2 hover:underline"
        >
          Login
        </Link>
      </p>

    </AuthLayout>
  );
};

export default Register;
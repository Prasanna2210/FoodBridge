import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    donorType: "",
    recipientType: "",
  });

  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();
  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      setFormData(response.user);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load profile");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(formData);

setUser(response.user);

toast.success("Profile updated successfully");

    } catch (error) {

      console.error(error);

      toast.error("Failed to update profile");

    }
  };

  if (loading) {
    return (
      <h2 className="text-xl font-semibold">
        Loading profile...
      </h2>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>
          <label className="font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-medium">
            Email
          </label>

          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
          />
        </div>

        <div>
          <label className="font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-medium">
            Address
          </label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-medium">
            Role
          </label>

          <input
            type="text"
            value={formData.role}
            readOnly
            className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
          />
        </div>

        {formData.role === "donor" && (
          <div>
            <label className="font-medium">
              Donor Type
            </label>

            <input
              type="text"
              name="donorType"
              value={formData.donorType || ""}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>
        )}

        {formData.role === "recipient" && (
          <div>
            <label className="font-medium">
              Recipient Type
            </label>

            <input
              type="text"
              name="recipientType"
              value={formData.recipientType || ""}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
};

export default Profile;
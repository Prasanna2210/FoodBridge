import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addDonation } from "../../services/donationService";
const AddDonation = () => {
  const [formData, setFormData] = useState({
    title: "",
    foodType: "Veg",
    quantity: "",
    expiry: "",
    location: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await addDonation(formData);

    toast.success("Donation added successfully!");

    navigate("/donor/donations");

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to add donation"
    );
  }
};
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-2">
        🍱 Add New Donation
      </h1>

      <p className="text-gray-500 mb-8">
        Fill in the details of the food donation.
      </p>

      <form
  onSubmit={handleSubmit}
  className="space-y-6"
>

        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Lunch Meals"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Food Type */}
        <div>
          <label className="block mb-2 font-semibold">
            Food Type
          </label>

          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Both</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-2 font-semibold">
            Quantity
          </label>

          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="50 Meals"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Expiry */}
        <div>
          <label className="block mb-2 font-semibold">
            Expiry
          </label>

          <input
            type="datetime-local"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-semibold">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Visakhapatnam"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional details..."
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition"
          type="submit"
        >
          Add Donation
        </button>

      </form>
    </div>
  );
};

export default AddDonation;
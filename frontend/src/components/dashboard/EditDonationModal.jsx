import { useEffect, useState } from "react";

const EditDonationModal = ({
  isOpen,
  donation,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    foodType: "Veg",
    quantity: "",
    expiry: "",
    location: "",
    description: "",
    status: "Available",
  });

  useEffect(() => {
    if (donation) {
      setFormData({
        title: donation.title || "",
        foodType: donation.foodType || "Veg",
        quantity: donation.quantity || "",
        expiry: donation.expiry
          ? donation.expiry.slice(0, 16)
          : "",
        location: donation.location || "",
        description: donation.description || "",
        status: donation.status || "Available",
      });
    }
  }, [donation]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...donation,
      ...formData,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Donation
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Food Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Both</option>
          </select>

          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="datetime-local"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Available</option>
            <option>Requested</option>
            <option>Approved</option>
            <option>Completed</option>
            <option>Expired</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditDonationModal;
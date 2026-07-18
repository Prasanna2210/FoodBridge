import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DonationTable from "../../components/dashboard/DonationTable";
import EditDonationModal from "../../components/dashboard/EditDonationModal";

import {
  getMyDonations,
  deleteDonation,
  updateDonation,
} from "../../services/donationService";
const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [foodTypeFilter, setFoodTypeFilter] = useState("All");
  const fetchDonations = async () => {
    try {
      setLoading(true);

      const response = await getMyDonations();

      setDonations(response.donations);

    } catch (error) {
      console.error(error);

      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (donation) => {
    setSelectedDonation(donation);
    setIsEditOpen(true);
  };

  const handleDelete = async (donation) => {
    const confirmDelete = window.confirm(
      `Delete "${donation.title}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteDonation(donation._id);

      toast.success("Donation deleted successfully");

      fetchDonations();

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete donation");
    }
  };

  const handleSave = async (updatedDonation) => {
    try {
      await updateDonation(
        updatedDonation._id,
        updatedDonation
      );

      toast.success("Donation updated successfully");

      setIsEditOpen(false);

      fetchDonations();

    } catch (error) {

      console.error(error);

      toast.error("Failed to update donation");
    }
  };
  useEffect(() => {
    fetchDonations();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center text-lg font-semibold">
        Loading Donations...
      </h2>
    );
  }
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      donation.status === statusFilter;

    const matchesFoodType =
      foodTypeFilter === "All" ||
      donation.foodType === foodTypeFilter;

    return matchesSearch && matchesStatus && matchesFoodType;
  });
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          My Donations
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all your food donations.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search donations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Requested">Requested</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
          <option value="Expired">Expired</option>
        </select>

        <select
          value={foodTypeFilter}
          onChange={(e) => setFoodTypeFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Food Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Both">Both</option>
        </select>

      </div>
      {filteredDonations.length > 0 ? (
        <DonationTable
          donations={filteredDonations}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No donations found
          </h2>
          <p className="text-gray-500 mt-2">
            Try changing your search or filter options.
          </p>
        </div>
      )}

      <EditDonationModal
        isOpen={isEditOpen}
        donation={selectedDonation}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default MyDonations;
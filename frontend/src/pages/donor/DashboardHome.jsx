import { useEffect, useState } from "react";

import StatCard from "../../components/dashboard/StatCard";
import DonationTable from "../../components/dashboard/DonationTable";
import EditDonationModal from "../../components/dashboard/EditDonationModal";
import { getDonorDashboard } from "../../services/dashboardService";

import {
  getMyDonations,
  deleteDonation,
  updateDonation,
} from "../../services/donationService";

import toast from "react-hot-toast";


const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 5;

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const dashboardResponse = await getDonorDashboard();
      const donationResponse = await getMyDonations();

      setStats(dashboardResponse.stats);
      setDonations(donationResponse.donations);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (donation) => {
    const confirmDelete = window.confirm(
      `Delete "${donation.title}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteDonation(donation._id);

      toast.success("Donation deleted successfully");

      fetchDashboardData();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete donation");
    }
  };
  const handleEdit = (donation) => {
    setSelectedDonation(donation);
    setIsEditOpen(true);
  };
  const handleSave = async (updatedDonation) => {
    try {
      await updateDonation(
        updatedDonation._id,
        updatedDonation
      );

      toast.success("Donation updated successfully");

      setIsEditOpen(false);

      fetchDashboardData();

    } catch (error) {

      console.error(error);

      toast.error("Failed to update donation");
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);
  if (loading) {
    return (
      <div className="text-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const dashboardCards = [
    {
      title: "Total Donations",
      value: stats.totalDonations,
      icon: "🍱",
      color: "bg-green-100",
    },
    {
      title: "Available",
      value: stats.available,
      icon: "🥗",
      color: "bg-blue-100",
    },
    {
      title: "Requested",
      value: stats.requested,
      icon: "📨",
      color: "bg-yellow-100",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: "👍",
      color: "bg-indigo-100",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "✅",
      color: "bg-purple-100",
    },
  ];
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const indexOfLastDonation = currentPage * donationsPerPage;

  const indexOfFirstDonation =
    indexOfLastDonation - donationsPerPage;

  const currentDonations =
    filteredDonations.slice(
      indexOfFirstDonation,
      indexOfLastDonation
    );

  const totalPages = Math.ceil(
    filteredDonations.length / donationsPerPage
  );
  return (
    <div className="space-y-8">
      {/* Dashboard Heading */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's an overview of your donations.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {dashboardCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      {/* Recent Donations */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Recent Donations
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search by food title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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

        </div>

        <DonationTable
          donations={currentDonations}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">

            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded ${currentPage === index + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        )}
      </div>
      <EditDonationModal
        isOpen={isEditOpen}
        donation={selectedDonation}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default DashboardHome;
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatCard from "../../components/dashboard/StatCard";
import { getRecipientDashboard } from "../../services/dashboardService";

const RecipientDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await getRecipientDashboard();
      setStats(response.stats);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg">
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Requests",
      value: stats.totalRequests,
      icon: "📦",
      color: "bg-green-100",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: "⏳",
      color: "bg-yellow-100",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: "✅",
      color: "bg-blue-100",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: "❌",
      color: "bg-red-100",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "🎉",
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Recipient Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your food requests efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            {...card}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipientDashboardHome;
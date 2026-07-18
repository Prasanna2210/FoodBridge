import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DonationCard from "../../components/recipient/DonationCard";
import { getAvailableDonations } from "../../services/donationService";

const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const response = await getAvailableDonations();
      setDonations(response.donations);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleRequest = (donation) => {
    console.log("Request:", donation);
  };

  if (loading) {
    return (
      <div className="text-center text-lg">
        Loading donations...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Available Donations
        </h1>

        <p className="text-gray-500 mt-2">
          Browse available food donations near you.
        </p>
      </div>

      {donations.length === 0 ? (
        <p>No donations available.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard
              key={donation._id}
              donation={donation}
              onRequest={handleRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableDonations;
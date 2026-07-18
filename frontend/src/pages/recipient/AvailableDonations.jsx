import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DonationCard from "../../components/recipient/DonationCard";
import { getAvailableDonations } from "../../services/donationService";

import { requestDonation } from "../../services/requestService";

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

    const handleRequest = async (donation) => {
  try {
    await requestDonation(donation._id);

    toast.success("Donation requested successfully");

    fetchDonations();

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to request donation"
    );
  }
};

    if (loading) {
        return (
            <div className="text-center text-lg font-semibold">
                Loading donations...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold">
                    Available Donations
                </h1>

                <p className="text-gray-500 mt-2">
                    Browse available food donations near you.
                </p>
            </div>

            {donations.length === 0 ? (
                <div className="text-center text-gray-500">
                    No donations available.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

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
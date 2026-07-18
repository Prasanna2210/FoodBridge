import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMyRequests,
  completePickup,
} from "../../services/requestService";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response = await getMyRequests();

      setRequests(response.requests);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load requests");

    } finally {

      setLoading(false);

    }
  };
  const handleComplete = async (id) => {
  const confirmPickup = window.confirm(
    "Mark this pickup as completed?"
  );

  if (!confirmPickup) return;

  try {
    await completePickup(id);

    toast.success("Pickup completed successfully");

    fetchRequests();

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to complete pickup"
    );
  }
};
  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center text-lg font-semibold">
        Loading Requests...
      </h2>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          My Requests
        </h1>

        <p className="text-gray-500">
          Track all your donation requests.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

  <table className="min-w-full">

    <thead className="bg-gray-100">

      <tr>

        <th className="px-6 py-4 text-left">
          Donation
        </th>

        <th className="px-6 py-4 text-left">
          Location
        </th>

        <th className="px-6 py-4 text-left">
          Requested On
        </th>

        <th className="px-6 py-4 text-left">
          Status
        </th>

        <th className="px-6 py-4 text-center">
          Action
        </th>

      </tr>

    </thead>

    <tbody>

      {requests.map((request) => (

        <tr
          key={request._id}
          className="border-t hover:bg-gray-50"
        >

          <td className="px-6 py-4">
            {request.donation.title}
          </td>

          <td className="px-6 py-4">
            {request.donation.location}
          </td>

          <td className="px-6 py-4">
            {new Date(request.createdAt).toLocaleDateString()}
          </td>

          <td className="px-6 py-4">

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  request.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : request.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : request.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
            >
              {request.status}
            </span>

          </td>

          <td className="px-6 py-4 text-center">

            {request.status === "Approved" ? (

              <button
  onClick={() => handleComplete(request._id)}
  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
>
  Complete Pickup
</button>

            ) : request.status === "Completed" ? (

              <span className="text-gray-500">
                Completed
              </span>

            ) : (

              <span className="text-gray-500">
                —
              </span>

            )}

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

    </div>
  );
};

export default MyRequests;
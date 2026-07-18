import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getDonorRequests,
  approveRequest,
  rejectRequest,
} from "../../services/requestService";

const IncomingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response = await getDonorRequests();

      setRequests(response.requests);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };
  const handleApprove = async (id) => {
    try {
      await approveRequest(id);

      toast.success("Request approved successfully");

      fetchRequests();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to approve request"
      );
    }
  };
  const handleReject = async (id) => {
    try {
      await rejectRequest(id);

      toast.success("Request rejected successfully");

      fetchRequests();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to reject request"
      );
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <h2>Loading Requests...</h2>;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Incoming Requests
        </h1>

        <p className="text-gray-500">
          Review donation requests from recipients.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">Recipient</th>

              <th className="px-6 py-4 text-left">Donation</th>

              <th className="px-6 py-4 text-left">Message</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {requests.map((request) => (

              <tr
                key={request._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  {request.recipient.name}
                </td>

                <td className="px-6 py-4">
                  {request.donation.title}
                </td>

                <td className="px-6 py-4">
                  {request.message || "-"}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                ${request.status === "Pending"
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

                  {request.status === "Pending" ? (
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleApprove(request._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(request._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>

                    </div>
                  ) : (
                    <span className="text-gray-500">
                      No Actions
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

export default IncomingRequests;
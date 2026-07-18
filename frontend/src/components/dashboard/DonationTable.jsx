const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-700";

    case "Requested":
      return "bg-yellow-100 text-yellow-700";

    case "Approved":
      return "bg-blue-100 text-blue-700";

    case "Completed":
      return "bg-purple-100 text-purple-700";

    case "Expired":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const DonationTable = ({
  donations,
  onEdit,
  onDelete,
}) => {
  if (donations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-xl font-semibold">
          No Donations Yet
        </h2>

        <p className="text-gray-500 mt-2">
          Start by adding your first donation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Food Type</th>
            <th className="p-4 text-left">Quantity</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Expiry</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {donations.map((donation) => (

            <tr
              key={donation._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium">
                {donation.title}
              </td>

              <td className="p-4">
                {donation.foodType}
              </td>

              <td className="p-4">
                {donation.quantity}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    donation.status
                  )}`}
                >
                  {donation.status}
                </span>
              </td>

              <td className="p-4">
                {new Date(
                  donation.expiry
                ).toLocaleDateString()}
              </td>

              <td className="p-4 text-center space-x-2">

                <button
                  onClick={() => onEdit?.(donation)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete?.(donation)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
};

export default DonationTable;
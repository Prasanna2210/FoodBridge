const DonationCard = ({ donation, onRequest }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">
          {donation.title}
        </h2>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {donation.status}
        </span>
      </div>

      <div className="space-y-2 text-gray-600">

        <p>
          <strong>Food Type:</strong> {donation.foodType}
        </p>

        <p>
          <strong>Quantity:</strong> {donation.quantity}
        </p>

        <p>
          <strong>Location:</strong> {donation.location}
        </p>

        <p>
          <strong>Expiry:</strong>{" "}
          {new Date(donation.expiry).toLocaleString()}
        </p>

        <p>
          <strong>Donor:</strong>{" "}
          {donation.donor?.name}
        </p>

      </div>

      <button
        onClick={() => onRequest(donation)}
        className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
      >
        Request Donation
      </button>

    </div>
  );
};

export default DonationCard;
const Donation = require("../models/Donation");
const Request = require("../models/Request");

const getDonorDashboard = async (req, res) => {
  try {
    const donations = await Donation.find({
      donor: req.user._id,
    });

    const stats = {
      totalDonations: donations.length,
      available: donations.filter(d => d.status === "Available").length,
      requested: donations.filter(d => d.status === "Requested").length,
      approved: donations.filter(d => d.status === "Approved").length,
      completed: donations.filter(d => d.status === "Completed").length,
    };

    res.status(200).json({
      success: true,
      stats,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getRecipientDashboard = async (req, res) => {
  try {
    const requests = await Request.find({
      recipient: req.user._id,
    });

    const stats = {
      totalRequests: requests.length,
      pending: requests.filter(r => r.status === "Pending").length,
      approved: requests.filter(r => r.status === "Approved").length,
      rejected: requests.filter(r => r.status === "Rejected").length,
      completed: requests.filter(r => r.status === "Completed").length,
    };

    res.status(200).json({
      success: true,
      stats,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDonorDashboard,
  getRecipientDashboard,
};
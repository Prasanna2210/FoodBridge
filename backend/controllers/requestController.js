const Request = require("../models/Request");
const Donation = require("../models/Donation");

const requestDonation = async (req, res) => {
  try {
    const { donationId, message } = req.body;

    if (!donationId) {
      return res.status(400).json({
        success: false,
        message: "Donation ID is required.",
      });
    }

    // Check if donation exists
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found.",
      });
    }

    // Check donation availability
    if (donation.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Donation is not available.",
      });
    }

    // Prevent duplicate request
    const existingRequest = await Request.findOne({
      donation: donationId,
      recipient: req.user._id,
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You have already requested this donation.",
      });
    }

    // Create request
    const request = await Request.create({
      donation: donationId,
      recipient: req.user._id,
      message,
    });

    // Update donation status
    donation.status = "Requested";
    await donation.save();

    res.status(201).json({
      success: true,
      message: "Donation requested successfully.",
      request,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      recipient: req.user._id,
    })
      .populate("donation")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDonorRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate({
        path: "donation",
        match: {
          donor: req.user._id,
        },
      })
      .populate(
        "recipient",
        "name recipientType email phone location"
      );

    // Keep only requests whose donation belongs to this donor
    const filteredRequests = requests.filter(
      (request) => request.donation !== null
    );

    res.status(200).json({
      success: true,
      count: filteredRequests.length,
      requests: filteredRequests,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("donation");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    // Verify ownership
    if (request.donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    request.status = "Approved";
    await request.save();

    request.donation.status = "Approved";
    await request.donation.save();

    res.status(200).json({
      success: true,
      message: "Request approved successfully.",
      request,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("donation");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    // Verify donor ownership
    if (request.donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    request.status = "Rejected";
    await request.save();

    // Optional: make donation available again
    request.donation.status = "Available";
    await request.donation.save();

    res.status(200).json({
      success: true,
      message: "Request rejected successfully.",
      request,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const completePickup = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("donation");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    // Only the recipient who created the request can complete it
    if (request.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Only approved requests can be completed
    if (request.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "Only approved requests can be marked as completed.",
      });
    }

    request.status = "Completed";
    await request.save();

    request.donation.status = "Completed";
    await request.donation.save();

    res.status(200).json({
      success: true,
      message: "Pickup completed successfully.",
      request,
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
  requestDonation,
  getMyRequests,
  getDonorRequests,
  approveRequest,
  rejectRequest,
  completePickup,
};
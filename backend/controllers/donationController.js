const Donation = require("../models/Donation");

const addDonation = async (req, res) => {
  try {
    const {
      title,
      foodType,
      quantity,
      expiry,
      location,
      description,
    } = req.body;

    if (
      !title ||
      !foodType ||
      !quantity ||
      !expiry ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const donation = await Donation.create({
      title,
      foodType,
      quantity,
      expiry,
      location,
      description,
      donor: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Donation added successfully.",
      donation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donor: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findOne({
      _id: req.params.id,
      donor: req.user._id,
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found.",
      });
    }

    const allowedFields = [
      "title",
      "foodType",
      "quantity",
      "expiry",
      "location",
      "description",
      "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        donation[field] = req.body[field];
      }
    });

    await donation.save();

    res.status(200).json({
      success: true,
      message: "Donation updated successfully.",
      donation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findOne({
      _id: req.params.id,
      donor: req.user._id,
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found.",
      });
    }

    await donation.deleteOne();

    res.status(200).json({
      success: true,
      message: "Donation deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getAvailableDonations = async (req, res) => {
  try {
    const { foodType, location, search } = req.query;

    const filter = {
      status: "Available",
    };

    if (foodType) {
      filter.foodType = foodType;
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const donations = await Donation.find(filter)
      .populate("donor", "name donorType")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
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
  addDonation,
  getMyDonations,
  updateDonation,
  deleteDonation,
  getAvailableDonations,
};
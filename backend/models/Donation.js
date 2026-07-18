const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    foodType: {
      type: String,
      enum: ["Veg", "Non-Veg", "Both"],
      required: true,
    },

    quantity: {
      type: String,
      required: [true, "Quantity is required"],
      trim: true,
    },

    expiry: {
      type: Date,
      required: [true, "Expiry time is required"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Requested",
        "Approved",
        "Completed",
        "Expired",
      ],
      default: "Available",
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);
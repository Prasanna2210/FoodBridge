const Request = require("../models/Request");
const Donation = require("../models/Donation");
const User = require("../models/User");
const { sendEmail } = require("../services/emailService");

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

 // Find donor
const donor = await User.findById(donation.donor);

if (donor) {
  try {
    await sendEmail({
      to: donor.email,
      subject: "New Food Request - FoodBridge",
      htmlContent: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
          color: #333;
        ">

          <h2 style="color: #059669;">
            FoodBridge
          </h2>

          <h3>
            New Food Request
          </h3>

          <p>
            Hello ${donor.name},
          </p>

          <p>
            A recipient has requested your food donation.
          </p>

          <div style="
            background: #f0fdf4;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
          ">

            <p>
              <strong>Food:</strong>
              ${donation.title}
            </p>

            <p>
              <strong>Food Type:</strong>
              ${donation.foodType}
            </p>

            <p>
              <strong>Quantity:</strong>
              ${donation.quantity}
            </p>

            <p>
              <strong>Requested By:</strong>
              ${req.user.name}
            </p>

            ${
              message
                ? `<p>
                    <strong>Message:</strong>
                    ${message}
                   </p>`
                : ""
            }

          </div>

          <p>
            Please log in to FoodBridge to review this request.
          </p>

          <p style="margin-top: 30px; color: #666;">
            Thank you for helping reduce food waste.
          </p>

          <p style="color: #666;">
            <strong>FoodBridge Team</strong>
          </p>

        </div>
      `,
    });

    console.log(
      `Request notification email sent to ${donor.email}`
    );

  } catch (emailError) {
    console.error(
      "Failed to send request notification email:",
      emailError.message
    );
  }
}
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
    const request = await Request.findById(req.params.id)
      .populate("donation")
      .populate("recipient", "name email");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    // Verify donor ownership
    if (
      request.donation.donor.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Update request status
    request.status = "Approved";
    await request.save();

    // Update donation status
    request.donation.status = "Approved";
    await request.donation.save();

    // Send approval email to recipient
    const recipient = request.recipient;

    if (recipient) {
      try {
        await sendEmail({
          to: recipient.email,
          subject: "Donation Request Approved - FoodBridge",
          htmlContent: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 20px;
              color: #333;
            ">

              <h2 style="color: #059669;">
                FoodBridge
              </h2>

              <h3>
                🎉 Your Donation Request Was Approved!
              </h3>

              <p>
                Hello ${recipient.name},
              </p>

              <p>
                Good news! Your request for the following
                food donation has been approved by the donor.
              </p>

              <div style="
                background: #f0fdf4;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              ">

                <p>
                  <strong>Food:</strong>
                  ${request.donation.title}
                </p>

                <p>
                  <strong>Food Type:</strong>
                  ${request.donation.foodType}
                </p>

                <p>
                  <strong>Quantity:</strong>
                  ${request.donation.quantity}
                </p>

                <p>
                  <strong>Location:</strong>
                  ${request.donation.location}
                </p>

              </div>

              <p>
                Please log in to FoodBridge to view the
                donation details and arrange the pickup.
              </p>

              <p style="margin-top: 30px; color: #666;">
                Thank you for helping reduce food waste.
              </p>

              <p style="color: #666;">
                <strong>FoodBridge Team</strong>
              </p>

            </div>
          `,
        });

        console.log(
          `Approval email sent to ${recipient.email}`
        );

      } catch (emailError) {
        // Email failure should not undo the approval
        console.error(
          "Failed to send approval email:",
          emailError.message
        );
      }
    }

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
    const request = await Request.findById(req.params.id)
      .populate("donation")
      .populate("recipient", "name email");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    // Verify donor ownership
    if (
      request.donation.donor.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Update request status
    request.status = "Rejected";
    await request.save();

    // Make donation available again
    request.donation.status = "Available";
    await request.donation.save();

    // Send rejection email to recipient
    const recipient = request.recipient;

    if (recipient) {
      try {
        await sendEmail({
          to: recipient.email,
          subject: "Donation Request Update - FoodBridge",
          htmlContent: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 20px;
              color: #333;
            ">

              <h2 style="color: #059669;">
                FoodBridge
              </h2>

              <h3>
                Donation Request Update
              </h3>

              <p>
                Hello ${recipient.name},
              </p>

              <p>
                Unfortunately, your request for the following
                food donation was not approved by the donor.
              </p>

              <div style="
                background: #fef2f2;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              ">

                <p>
                  <strong>Food:</strong>
                  ${request.donation.title}
                </p>

                <p>
                  <strong>Food Type:</strong>
                  ${request.donation.foodType}
                </p>

                <p>
                  <strong>Quantity:</strong>
                  ${request.donation.quantity}
                </p>

                <p>
                  <strong>Location:</strong>
                  ${request.donation.location}
                </p>

              </div>

              <p>
                The donation has been made available again
                on FoodBridge, so you may explore other
                available donations.
              </p>

              <p style="margin-top: 30px; color: #666;">
                Thank you for using FoodBridge.
              </p>

              <p style="color: #666;">
                <strong>FoodBridge Team</strong>
              </p>

            </div>
          `,
        });

        console.log(
          `Rejection email sent to ${recipient.email}`
        );

      } catch (emailError) {
        // Email failure should not undo the rejection
        console.error(
          "Failed to send rejection email:",
          emailError.message
        );
      }
    }

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
    const request = await Request.findById(req.params.id)
      .populate("donation")
      .populate("recipient", "name email");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    // Only the recipient who created the request can complete it
    if (
      request.recipient._id.toString() !==
      req.user._id.toString()
    ) {
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

    // Update request status
    request.status = "Completed";
    await request.save();

    // Update donation status
    request.donation.status = "Completed";
    await request.donation.save();

    // Find donor
    const donor = await User.findById(request.donation.donor);

    // Send completion email to donor
    if (donor) {
      try {
        await sendEmail({
          to: donor.email,
          subject: "Food Pickup Completed - FoodBridge",
          htmlContent: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 20px;
              color: #333;
            ">

              <h2 style="color: #059669;">
                FoodBridge
              </h2>

              <h3>
                🎉 Food Pickup Completed
              </h3>

              <p>
                Hello ${donor.name},
              </p>

              <p>
                The recipient has successfully completed
                the pickup for your food donation.
              </p>

              <div style="
                background: #f0fdf4;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              ">

                <p>
                  <strong>Food:</strong>
                  ${request.donation.title}
                </p>

                <p>
                  <strong>Food Type:</strong>
                  ${request.donation.foodType}
                </p>

                <p>
                  <strong>Quantity:</strong>
                  ${request.donation.quantity}
                </p>

                <p>
                  <strong>Pickup Location:</strong>
                  ${request.donation.location}
                </p>

                <p>
                  <strong>Recipient:</strong>
                  ${request.recipient.name}
                </p>

              </div>

              <p>
                Your donation has now been marked as completed.
              </p>

              <p>
                Thank you for helping reduce food waste and
                supporting your community through FoodBridge.
              </p>

              <p style="margin-top: 30px; color: #666;">
                <strong>FoodBridge Team</strong>
              </p>

            </div>
          `,
        });

        console.log(
          `Pickup completion email sent to ${donor.email}`
        );

      } catch (emailError) {
        // Email failure should not undo the completed pickup
        console.error(
          "Failed to send pickup completion email:",
          emailError.message
        );
      }
    }

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
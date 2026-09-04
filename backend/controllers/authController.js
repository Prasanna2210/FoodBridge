const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendEmail } = require("../services/emailService");
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      donorType,
      recipientType,
      address,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone || !role || !address) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role,
      donorType,
      recipientType,
      address,
    });

    // Generate JWT
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        donorType: user.donorType,
        recipientType: user.recipientType,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        donorType: user.donorType,
        recipientType: user.recipientType,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      donorType,
      recipientType,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    if (user.role === "donor") {
      user.donorType = donorType || user.donorType;
    }

    if (user.role === "recipient") {
      user.recipientType =
        recipientType || user.recipientType;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

const testEmail = async (req, res) => {
  try {
    await sendEmail({
      to: req.user.email,
      subject: "FoodBridge Email Test",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #059669;">FoodBridge</h2>

          <p>Hello ${req.user.name},</p>

          <p>
            This is a test email from your FoodBridge application.
          </p>

          <p>
            Your Brevo email integration is working successfully! 🎉
          </p>

          <p>
            We can now use this system for donation and request
            notifications.
          </p>

          <hr />

          <p style="color: #666;">
            FoodBridge Team
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully",
    });
  } catch (error) {
    console.error("Test email error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send test email",
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  testEmail,
};
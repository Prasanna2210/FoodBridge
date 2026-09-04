const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendEmail } = require("../services/emailService");
const crypto = require("crypto");
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    // Don't reveal whether an email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store hashed token in database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // Token expires in 30 minutes
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;

    await user.save();

    // Frontend URL
    const frontendUrl =
      process.env.CLIENT_URL || "http://localhost:5173";

    const resetUrl =
      `${frontendUrl}/reset-password/${resetToken}`;

    // Send reset email
    try {
      await sendEmail({
        to: user.email,
        subject: "Reset Your FoodBridge Password",
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
              Password Reset Request
            </h3>

            <p>
              Hello ${user.name},
            </p>

            <p>
              We received a request to reset your FoodBridge
              account password.
            </p>

            <p>
              Click the button below to create a new password:
            </p>

            <div style="text-align: center; margin: 30px 0;">

              <a
                href="${resetUrl}"
                style="
                  background: #059669;
                  color: white;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                  display: inline-block;
                "
              >
                Reset Password
              </a>

            </div>

            <p>
              This link will expire in <strong>30 minutes</strong>.
            </p>

            <p>
              If you did not request a password reset, you can
              safely ignore this email.
            </p>

            <hr />

            <p style="color: #666;">
              FoodBridge Team
            </p>

          </div>
        `,
      });
    } catch (emailError) {
      console.error(
        "Failed to send password reset email:",
        emailError.message
      );

      // Remove token if email failed
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();

      return res.status(500).json({
        success: false,
        message: "Failed to send password reset email.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Reset token is required.",
      });
    }

    // Hash the token received from the URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or has expired.",
      });
    }

    // Set new password
    user.password = password;

    // Clear reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
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
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
};
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

const uploadProfileImage = async (req, res) => {
  try {
    // Check whether image was provided
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    // Get logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "foodbridge/profile-images",
        resource_type: "image",
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);

          return res.status(500).json({
            success: false,
            message: "Image upload failed",
          });
        }

        // Save Cloudinary URL in MongoDB
        // Keep the old Cloudinary public ID
const oldAvatarPublicId = user.avatarPublicId;

// Save the new image
user.avatar = result.secure_url;
user.avatarPublicId = result.public_id;

await user.save();

// Delete the old image from Cloudinary
if (oldAvatarPublicId) {
  try {
    await cloudinary.uploader.destroy(oldAvatarPublicId);
  } catch (deleteError) {
    console.error(
      "Failed to delete old profile image:",
      deleteError.message
    );
  }
}
        return res.status(200).json({
          success: true,
          message: "Profile image uploaded successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            donorType: user.donorType,
            recipientType: user.recipientType,
            avatar: user.avatar,
            avatarPublicId: user.avatarPublicId,
          },
        });
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (error) {
    console.error("Profile image error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload profile image",
    });
  }
};

module.exports = {
  uploadProfileImage,
};
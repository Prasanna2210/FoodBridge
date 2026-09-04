const express = require("express");

const {
  uploadProfileImage,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload profile image
router.post(
  "/avatar",
  protect,
  upload.single("avatar"),
  uploadProfileImage
);

module.exports = router;
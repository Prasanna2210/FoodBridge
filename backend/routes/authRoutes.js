const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  testEmail,
} = require("../controllers/authController");


const {
  uploadProfileImage,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.get("/test-email", protect, testEmail);

router.post(
  "/profile/avatar",
  protect,
  upload.single("avatar"),
  uploadProfileImage
);
module.exports = router;
const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
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

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post(
  "/profile/avatar",
  protect,
  upload.single("avatar"),
  uploadProfileImage
);
module.exports = router;
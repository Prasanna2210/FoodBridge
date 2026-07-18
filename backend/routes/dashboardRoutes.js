const express = require("express");

const router = express.Router();

const {
  getDonorDashboard,
  getRecipientDashboard,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
  "/donor",
  protect,
  authorizeRoles("donor"),
  getDonorDashboard
);

router.get(
  "/recipient",
  protect,
  authorizeRoles("recipient"),
  getRecipientDashboard
);

module.exports = router;
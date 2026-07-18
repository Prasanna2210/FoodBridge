const express = require("express");

const router = express.Router();

const {
  addDonation,
  getMyDonations,
  updateDonation,
  deleteDonation,
  getAvailableDonations,
} = require("../controllers/donationController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Add Donation
router.post(
  "/",
  protect,
  authorizeRoles("donor"),
  addDonation
);

// Get My Donations
router.get(
  "/my",
  protect,
  authorizeRoles("donor"),
  getMyDonations
);


router.get(
  "/",
  protect,
  authorizeRoles("recipient"),
  getAvailableDonations
);

router.put(
  "/:id",
  protect,
  authorizeRoles("donor"),
  updateDonation
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("donor"),
  deleteDonation
);
module.exports = router;
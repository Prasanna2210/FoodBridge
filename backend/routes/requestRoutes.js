const express = require("express");

const router = express.Router();

const { requestDonation,getMyRequests,getDonorRequests, approveRequest,rejectRequest,completePickup,} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("recipient"),
  requestDonation
);
router.get(
  "/my",
  protect,
  authorizeRoles("recipient"),
  getMyRequests
);
router.get(
  "/donor",
  protect,
  authorizeRoles("donor"),
  getDonorRequests
);
router.put(
  "/:id/approve",
  protect,
  authorizeRoles("donor"),
  approveRequest
);
router.put(
  "/:id/reject",
  protect,
  authorizeRoles("donor"),
  rejectRequest
);
router.put(
  "/:id/complete",
  protect,
  authorizeRoles("recipient"),
  completePickup
);
module.exports = router;
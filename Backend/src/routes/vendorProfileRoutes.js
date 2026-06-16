const express = require("express");
const router = express.Router();

const {
  createVendorProfile,
  getMyVendorProfile,
  updateVendorProfile,
  deleteVendorProfile
} = require("../controllers/vendorProfileController");

const {
  protect
} = require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

router.post("/",
  protect,
  authorizeRoles("vendor"),
  createVendorProfile
);

router.get("/me",
  protect,
  authorizeRoles("vendor"),
  getMyVendorProfile
);

router.put("/",
  protect,
  authorizeRoles("vendor"),
  updateVendorProfile
);

router.delete("/",
  protect,
  authorizeRoles("vendor"),
  deleteVendorProfile
);

module.exports = router;
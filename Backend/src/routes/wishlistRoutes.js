const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require(
  "../controllers/wishlistController"
);

const {
  protect
} = require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

router.post(
  "/add",
  protect,
  authorizeRoles("buyer"),
  addToWishlist
);

router.get(
  "/",
  protect,
  authorizeRoles("buyer"),
  getWishlist
);

router.delete(
  "/remove/:productId",
  protect,
  authorizeRoles("buyer"),
  removeFromWishlist
);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("vendor"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, authorizeRoles("vendor"), updateProduct);
router.delete("/:id", protect, authorizeRoles("vendor"), deleteProduct);

module.exports = router;
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const vendorProfileRoutes = require("./routes/vendorProfileRoutes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/vendor-profile", vendorProfileRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Craftuno Backend Running",
  });
});

module.exports = app;
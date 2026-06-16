const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      buyerId: req.user.id
    }).populate("items.productId");

    console.log("USER ID:", req.user.id);
    console.log("CART:", JSON.stringify(cart, null, 2));

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    let totalAmount = 0;

    const products = cart.items.map(item => {

      totalAmount +=
        item.productId.price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity
      };
    });

    const vendorId =
      cart.items[0].productId.vendorId;

    console.log("TOTAL:", totalAmount);
    console.log("VENDOR ID:", vendorId);
    console.log("PRODUCTS:", products);

    const order = await Order.create({
      buyerId: req.user.id,
      vendorId,
      products,
      totalAmount
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    
    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      buyerId: req.user.id
    })
      .populate("products.productId");

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getVendorOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      vendorId: req.user.id
    })
      .populate("buyerId")
      .populate("products.productId");

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const updateOrderStatus =
async (req, res) => {

  try {

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          orderStatus:
            req.body.orderStatus
        },
        {
          returnDocument: "after"
        }
      );

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getVendorOrders,
  updateOrderStatus
};
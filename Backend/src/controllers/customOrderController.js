const CustomOrder = require("../models/CustomOrder");

const createCustomOrder = async (req, res) => {
  try {
    const CommunityPost = require("../models/CommunityPost");
    
    if (customOrder.requestType === "community-request") {
      await CommunityPost.create({
      author: req.user.id,
      title: customOrder.title,
      description: customOrder.description,

      category: "custom-order",

      customOrder: customOrder._id,

      tags: [
        "CUSTOM_ORDER",
        "COMMUNITY_REQUEST",
        ],
      });
    }

    res.status(201).json({
      success: true,
      message: "Custom order created",
      customOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find({
      buyer: req.user.id,
    })
      .populate("vendor")
      .populate("product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVendorCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find({
      vendor: req.user.id,
    })
      .populate("buyer")
      .populate("product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const submitQuote = async (req, res) => {
  try {
    const { quotePrice } = req.body;

    const order = await CustomOrder.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Custom order not found",
      });
    }

    order.vendor = req.user.id;
    order.quotePrice = quotePrice;
    order.status = "quoted";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Quote submitted",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const acceptQuote = async (req, res) => {
  try {

    const order = await CustomOrder.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Custom order not found",
      });
    }

    order.status = "accepted";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Quote accepted",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateCustomOrderStatus = async (
  req,
  res
) => {
  try {

    const { status } = req.body;

    const order = await CustomOrder.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Custom order not found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createCustomOrder,
  getMyCustomOrders,
  getVendorCustomOrders,
  submitQuote,
  acceptQuote,
  updateCustomOrderStatus,
};
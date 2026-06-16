const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      buyerId: req.user.id
    });

    if (!cart) {

      cart = await Cart.create({
        buyerId: req.user.id,
        items: [
          {
            productId,
            quantity
          }
        ]
      });

    } else {

      cart.items.push({
        productId,
        quantity
      });

      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      buyerId: req.user.id
    }).populate("items.productId");

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const updateCartItem = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      buyerId: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      item =>
        item.productId.toString() ===
        req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart"
      });
    }

    item.quantity = req.body.quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      buyerId: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      item =>
        item.productId.toString() !==
        req.params.productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart
};
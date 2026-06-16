const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {

    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({
      buyerId: req.user.id
    });

    if (!wishlist) {

      wishlist = await Wishlist.create({
        buyerId: req.user.id,
        products: [productId]
      });

    } else {

      if (
        wishlist.products.includes(productId)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Product already in wishlist"
        });
      }

      wishlist.products.push(productId);

      await wishlist.save();
    }

    res.status(200).json({
      success: true,
      wishlist
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getWishlist = async (req, res) => {

  try {

    const wishlist =
      await Wishlist.findOne({
        buyerId: req.user.id
      }).populate("products");

    res.status(200).json({
      success: true,
      wishlist
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const removeFromWishlist =
  async (req, res) => {

    try {

      const wishlist =
        await Wishlist.findOne({
          buyerId: req.user.id
        });

      if (!wishlist) {
        return res.status(404).json({
          success: false,
          message: "Wishlist not found"
        });
      }

      wishlist.products =
        wishlist.products.filter(
          product =>
            product.toString() !==
            req.params.productId
        );

      await wishlist.save();

      res.status(200).json({
        success: true,
        wishlist
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist
};
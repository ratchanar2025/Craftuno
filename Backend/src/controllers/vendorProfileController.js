const VendorProfile = require("../models/VendorProfile");

const createVendorProfile = async (req, res) => {
  try {

    const existingProfile =
      await VendorProfile.findOne({
        vendorId: req.user.id
      });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Vendor profile already exists"
      });
    }

    const profile =
      await VendorProfile.create({
        vendorId: req.user.id,
        ...req.body
      });

    res.status(201).json({
      success: true,
      profile
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMyVendorProfile =
  async (req, res) => {

    try {

      const profile =
        await VendorProfile.findOne({
          vendorId: req.user.id
        });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found"
        });
      }

      res.status(200).json({
        success: true,
        profile
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

const updateVendorProfile =
  async (req, res) => {

    try {
      console.log("UPDATE BODY:", req.body);
      const profile =
        await VendorProfile.findOne({
          vendorId: req.user.id
        });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found"
        });
      }

      const updatedProfile =
        await VendorProfile.findByIdAndUpdate(
          profile._id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      res.status(200).json({
        success: true,
        profile: updatedProfile
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

const deleteVendorProfile =
  async (req, res) => {

    try {

      const profile =
        await VendorProfile.findOne({
          vendorId: req.user.id
        });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found"
        });
      }

      await profile.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Vendor profile deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

module.exports = {
  createVendorProfile,
  getMyVendorProfile,
  updateVendorProfile,
  deleteVendorProfile
};
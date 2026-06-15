const Product = require("../models/Product");

const createProduct = async (req,res)=>{

    try{

        const product = await Product.create({

            vendorId:req.user.id,

            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            images:req.body.images,
            stock:req.body.stock,
            category:req.body.category,
            customizable:req.body.customizable,
            bulkAvailable:req.body.bulkAvailable
        });

        res.status(201).json({
            success:true,
            product
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

const getProducts = async (req, res) => {
  res.json({ message: "Get products" });
};

const getProductById = async (req, res) => {
  res.json({ message: "Get product by id" });
};

const updateProduct = async (req, res) => {
  res.json({ message: "Update product" });
};

const deleteProduct = async (req, res) => {
  res.json({ message: "Delete product" });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
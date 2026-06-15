const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title:{
        type: String,
        required: true,
        trim: true
    },

    description:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true,
        min: 0
    },

    images:[
        {
            type:String
        }
    ],

    stock:{
        type:Number,
        default:0
    },

    category:{
        type:String,
        required:true
    },

    customizable:{
        type:Boolean,
        default:false
    },

    bulkAvailable:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// productSchema.post("save", (req,res,next)=>{
//   // const {id: productId} = req.body.Product
//   console.log("post")
//   next()
// })

const Product = new mongoose.model("Prod", productSchema);

module.exports = Product;

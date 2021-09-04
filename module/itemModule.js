const mongoose = require("mongoose");
const product = require("../controllers/productControllers");

const itemSchema = new mongoose.Schema(
  {
    itemName: String,
    price: Number,
    catagoryName: String,
    productId: {type: mongoose.Schema.ObjectId,
        // required: true
    },
  },
  {
    timestamps: true,
  }
);
// itemSchema.post("save", function (next) {
//   console.log(itemSchema.catagory.ObjectId);
//   console.log(product.ObjectId);
//   try {
//     if (itemSchema.catagory.ObjectId == product.ObjectId)
//       console.log(itemSchema.catagory.ObjectId);
//     console.log(product.ObjectId);
//     return res.status(200).json({
//       status: "id Matched",
//       itemSchema: { catagory: ObjectId },
//       product: { ObjectId },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: error,
//     });
//   }
//   next();
// });
const item = new mongoose.model("Item", itemSchema);
module.exports = item;

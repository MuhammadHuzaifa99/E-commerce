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

const product = new mongoose.model("Prod", productSchema);

module.exports = product;

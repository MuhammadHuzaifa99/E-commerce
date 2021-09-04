const Product = require("../module/productModule");

exports.geted = async (req, res) => {
  try {
  var getProduct = await Product.find();
  console.log(getProduct)
    res.status(200).json({
      status: "success",
      getProduct,
    });
  } catch (error) {
      res.status(404).json({
          status: error,
          error: error.message
      })
  }
};
exports.posted = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body);
    console.log(product)
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      error: error.message
  })
  }
};

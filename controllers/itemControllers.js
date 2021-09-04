const item = require("../module/itemModule");
const Product = require("../module/productModule");

exports.getItem = async (req, res) => {
  try {
    const getedItem = await item.find();
    console.log(getedItem);
    res.status(200).json({
      status: "geted Item",
      getedItem,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
    });
  }
};
exports.postItem = (req, res) => {
  try {
    var { catagoryName, itemName } = req.body;
    console.log(catagoryName + itemName);

    Product.find({ catagory: catagoryName }).then((result) => {
      JSON.stringify(result);
      req.body.productId = result[0]._id;
      if (result[0].catagory == catagoryName && result[0].name == itemName) {
        item.create(req.body).then((postedItem) => {
          console.log(req.body.productId);
          console.log(postedItem);
          res.status(200).json({
            status: "success",
            data: {
              postedItem,
            },
          });
        });
      } else {
        console.log("there is no product for this item");
      }
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
    });
  }
};
exports.getSpecificItem = (req, res) => {
  try {
    item.findById(req.params.getSpId).then((gotSpItem) => {
      console.log(gotSpItem);
      res.status(200).json({
        status: "got Specific Art",
        data: {
          gotSpItem,
        },
      });
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
    });
  }
};

const express = require("express");
const router = express.Router();
const { getItem, postItem, getSpecificItem } = require("../controllers/itemControllers");
const Product = require("../module/productModule");

router.route("/").get(getItem).post(postItem);
router.get('/:getSpId', getSpecificItem)
module.exports = router;

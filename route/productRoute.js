const express = require("express");
const { protect } = require("../controllers/authControllers");
const { geted, posted } = require("../controllers/productControllers");
const router = express.Router();

router.route("/").get(protect,geted).post(protect,posted);
module.exports = router;

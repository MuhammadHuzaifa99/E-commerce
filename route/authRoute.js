const express = require("express");
const router = express.Router();
const {signUp, login, forgotPassword} = require("../controllers/authControllers")

router.post("/signup",signUp)
router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

module.exports = router;

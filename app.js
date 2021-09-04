const express = require("express");
const productRouter = require("./route/productRoute");
const authRouter = require("./route/authRoute");
const itemRouter = require("./route/itemRoute")
const app = express();

//middleware
app.use(express.json())
//routes
app.use("/api/v1/product", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/item", itemRouter)
module.exports = app;

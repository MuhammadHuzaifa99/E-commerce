require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const db = process.env.mongo_string.replace(
  "<Password>",
  process.env.mongoDB_Password
);
mongoose.connect(db).then((con) => console.log("mongoose started"));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

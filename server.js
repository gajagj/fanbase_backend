// for using env variable in backend we need the dotenv package and import statement
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
mongoose.set("strictQuery", true);
const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'database connection error:'));
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("database connected successfully");
});

// add your middlewares here
app.use(express.json());

// add your routes here
const fanRouter = require("./routes/fan/fanRoute");
const adminRouter = require("./routes/admin/adminRoute");

app.use("/fanbase", fanRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});

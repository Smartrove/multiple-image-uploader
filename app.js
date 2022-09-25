const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const port = 2022;

//db
const db = require("./config/database").MongoURI;

//router
app.use(require("./routes/router"));

// mongoose

//middleware
app.use(express.json());

//database connection
require("./config/database")();
//template engine middleware
app.set("view engine", "ejs");

module.exports = mongoose;

//server innit
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });

const errorMiddleware = require("./middleware/error")


app.use(express.json())

//route imports
const products = require("./routes/productRoute")
const users = require("./routes/userRoute")

//use
app.use("/api",products)
app.use("/api",users)

//middleware-error
app.use(errorMiddleware)

module.exports = app
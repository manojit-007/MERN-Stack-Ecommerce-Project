const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error")


app.use(express.json())

//route imports
const products = require("./routes/productRoute")

//use
app.use("/api",products)
//middleware-error
app.use(errorMiddleware)

module.exports = app
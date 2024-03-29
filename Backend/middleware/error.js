const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";


    //wrong Mongodb id error
    if(err.name === "CastError"){
        const message =`Resource not found. ${err.path}`
        err = new ErrorHandler(message,404)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
        // message: err.stack stack send full details
    })
}
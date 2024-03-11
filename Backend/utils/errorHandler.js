class ErrorHandel extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor) //capture the fault with full details like url path
    }
}

module.exports = ErrorHandel;
const User = require("../models/userModels");
const ErrorHandel = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/sendCookieToken");

//Register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { userName, email, password } = req.body;

    const user = await User.create({
        userName, email, password,
        profilePic: {
            public_id: "sample id",
            url: "sample url for profile pic",
        }
    });

    sendToken(user,201,res)

    // const token = user.getJWTToken()
    // res.status(201).json({
    //     success: true,
    //     user,
    //     token
    // })
})

//Login user
exports.logInUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //checking 
    if (!email || !password) {
        return next(new ErrorHandel("Please enter correct email and password", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandel("Invalid email and password", 401))
    }

    const PasswordMatched = user.checkPassword(password)
    if(!PasswordMatched){
        return next(new ErrorHandel("Invalid email and password",401))
    }
    // const token = user.getJWTToken()
    // res.status(200).json({
    //     success: true,
    //     token
    // })
    sendToken(user,200,res)

})
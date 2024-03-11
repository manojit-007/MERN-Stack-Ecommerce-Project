const mongoose = require("mongoose");
const validator = require("validator")
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Please enter name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should be more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        validator: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [8, "password should be more than 8 characters"],
        select: false, //If we retrieve all user data, all information will be sent, excluding the user's password.
    },
    profilePic: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    role: {
        type: String,
        default: "User"
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
})

userSchema.pre("save", async function (next) {
    //pre is a event when the data save before save we have to do some task 
    if (this.isModified("password")) { //check if password is changed during profile update
        this.password = await bcrypt.hash(this.password, 10) //2 parameter 1st password and 2nd converted password strength
    }
    next()
})
//JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}
// //compare password for login
userSchema.methods.checkPassword = async function (enteredPasswordForLogin) {
    return await bcrypt.compare(enteredPasswordForLogin, this.password); //this.password is userSchema's saved password 
    // bcrypt.compare(password converted to hash, hashed password)  return true or false
}

// // Generating Password Reset Token
// userSchema.methods.getResetPasswordToken = async function () {
//     // Generating Token
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     //console.log(`resetToken : ${resetToken}`);

//     // Hashing and adding resetPasswordToken to userSchema
//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;
//     // //console.log(this.resetPasswordToken);
//     //console.log(`resetPasswordToken : ${this.resetPasswordToken}`);
//     //console.log(`resetPasswordTokenExpire : ${this.resetPasswordTokenExpire}`);

//     return resetToken;
// };


module.exports = mongoose.model("User", userSchema)
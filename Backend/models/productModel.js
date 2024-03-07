const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Enter name"],
        trim: true, //remove spaces
    },
    description: {
        type: String,
        required: [true, "Enter details"],
    },
    price: {
        type: Number,
        required: [true, "Enter price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    images: [
        {public_id: {
            type: String,
            required: true,
        }},
        {url: {
            type: String,
            required: true,
        }},
    ],
    category: {
        type: String, 
        required: [true, "Enter category"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: [true, "Enter stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            // user:{
            //     type:mongoose.Schema.ObjectId,
            //     ref:"User",
            //     required: true,
            // },
            user_name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                default: 0,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    // user:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"User",
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);

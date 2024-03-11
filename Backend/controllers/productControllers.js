const Product = require("../models/productModel")
const ErrorHandel = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//create product -- admin
// exports.createProduct = async (req, res, next) => {
//     const product = await Product.create(req.body)
//     res.status(200).json({
//         success: true,
//         product
//     })
// }
//create product -- admin -- catchAsyncError(use)
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        success: true,
        product
    })
});


//get all product -- admin
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 2;
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products
    })
})

//update product -- admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandel("Product not found", 500))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        product
    })
}
//Delete a product -- admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    const productCount = await Product.countDocuments()
    if (!product) {
        return next(new ErrorHandel("Product not found", 500))
    }
    product = await Product.findByIdAndDelete(req.params.id, req.body)
    // await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        product,productCount
    })
})
//Get details of a product -- admin
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandel("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})
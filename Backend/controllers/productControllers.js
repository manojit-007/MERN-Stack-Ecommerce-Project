const Product = require("../models/productModel")
const ErrorHandel = require("../utils/errorHandler")

//create product -- admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        success: true,
        product
    })

}

//get all product -- admin
exports.getAllProducts = async(req, res) => {
    const Products = await Product.find()
    res.status(200).json({
        success: true,
        Products
    })
}

//update product -- admin
exports.updateProduct = async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return  res.status(500).json({
            success: false,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        product
    })
}
//Delete a product -- admin
exports.deleteProduct = async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return  res.status(500).json({
            success: false,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndDelete(req.params.id, req.body)
    // await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        product
    })
}
//Get details of a product -- admin
exports.getProductDetails = async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandel("Product not found",404))
    }
    res.status(200).json({
        success: true,
        product
    })
}
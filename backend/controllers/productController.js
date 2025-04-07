const { propfind } = require("../app");
const  Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
exports.createProduct = catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user.id;
    const product = new Product(req.body);
        await product.save()
        res.status(201).json({
            success:true,
            product
        })
})
exports.getAllProducts =  catchAsyncError(async(req, res)=>{
    const resultperpage = 5
    const productCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage)
    const products = await apifeature.query;

    res.status(200).json({success:true,
        products,productCount})
})
exports.updateProduct = catchAsyncError(async(req, res, next)=>{
    try {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 400))
    }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        })
        res.status(200).json({product})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
    

})
exports.getProductbyID = catchAsyncError(async(req, res, next)=>{
    
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product not found", 400))
        }
        res.status(200).json({
            product
        })
        

    
})
exports.deleteProduct = catchAsyncError(async(req, res, next)=>{
    try {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 400))
    }
    
        await Product.findByIdAndDelete(req.params.id)
            
        res.status(200).json({message:"product deleted"})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
    

})
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
exports.getAllProducts =  catchAsyncError(async(req, res, next)=>{
    
    const resultperpage = 16
    const productCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    let products = await apifeature.query.clone();
    let featuredProductsCount = products.length
    apifeature.pagination(resultperpage)
    
    products = await apifeature.query.clone();

    res.status(200).json({success:true,
        products,productCount, resultperpage,featuredProductsCount})
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

exports.createProductReview = catchAsyncError(async(req, res, next)=>{
    const {rating, comment, productId} = req.body;
    const review = {
        user:req.user._id,
        rating: Number(rating),
        comment,
        name:req.user.name
    }
    const product = await Product.findById(productId);
    console.log(product)
    const isReviewed = product.reviews.find((rev)=>rev.user.toString() === req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating=rating;
                rev.comment=comment;
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numofreviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg += rev.rating
    })
    product.ratings =avg/(product.reviews.length)
    console.log(avg)
    await product.save({validateBeforeSave:false})
    
    res.status(200).json({message:"review added", success:true})


})

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete a review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Filter out the review to delete
    const reviews = product.reviews.filter(
        rev => rev._id.toString() !== req.query.id.toString()
    );
    let avg = 0;
    reviews.forEach((rev)=>{
        avg += rev.rating
    })

    // Recalculate ratings
    const numofreviews = reviews.length;
    
    const ratings =avg /reviews.length
    console.log(reviews)
    
    // Update product
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numofreviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });
});



const { propfind } = require("../app");
const  Product = require("../models/productModel")

exports.createProduct = async(req,res,next)=>{
    
    try{
        const product = new Product(req.body);
        await product.save()
        res.status(201).json({
            success:true,
            product
        })
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}
exports.getAllProducts =  async(req, res)=>{
    const products = await Product.find()

    res.status(200).json({success:true,
        products})
}
exports.updateProduct = async(req, res, next)=>{
    try {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(400).json({
            message:"product doesnt exist"
        })
    }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        })
        res.status(200).json({product})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
    

}

exports.deleteProduct = async(req, res, next)=>{
    try {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(400).json({
            message:"product doesnt exist"
        })
    }
    
        await Product.findByIdAndDelete(req.params.id)
            
        res.status(200).json({message:"product deleted"})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
    

}
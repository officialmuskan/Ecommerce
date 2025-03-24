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
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(400).json({
            message:"product doesnt exist"
        })
    }
    product = await Product.findbyIdAndUpdate(req.params.id, req.body)
    res.status(200).json({product})

}
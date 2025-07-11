const catchAsyncError = require("../middleware/catchAsyncError")
const stripe = require('stripe')(process.env.SECRET_KEY);

exports.processPayment = catchAsyncError(async(req, res, next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency: "inr",
        metadata:{
            company:"Ecommerce"
        }
    })
    res.status(200).json({
        success:true,
        client_secret: myPayment.client_secret
    })
})


exports.sendApikey = catchAsyncError(async(req, res, next)=>{
   
    res.status(200).json({
       
        stripekey: process.env.PUBLISH_KEY
    })
})
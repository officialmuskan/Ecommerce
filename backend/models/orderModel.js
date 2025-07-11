const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{type:String, required:true},
        city:{type:String, required:false},
        State:{type:String, required:false},
        country:{type:String, required:true},
        pinCode:{type:Number, required:true},
        phoneNo:{type:Number, required:true}

    },
    orderItems:[{
        name:{
            type:String,
            required:true
        },
        quantity:{type:Number, required:true},
        price:{type:Number, required:true},
        image:{type:String, required:true},
        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},


    },
],

    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        ref:'User',
        required:true
    },
    paymentInfo:{
        id:{type:String, required:true},
        status:{type:String, required:true},
    }, 
    itemsPrice:{type:Number, default:0, required:true},
    taxPrice:{type:Number, default:0, required:true},
    ShippingPrice:{type:Number, default:0, required:true},
    totalPrice:{type:Number, default:0, required:true},
    orderStatus:{
        type:String, 
        required:true,
        default:"Processing"
    },
    deliveredAt:Date,
    
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema)
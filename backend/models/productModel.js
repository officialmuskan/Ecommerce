const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter product name"],
    },
    description:{
        type:String,
        required: [true, "Please enter product description"],
    },
    price:{
        type:Number,
        required: [true, "Please enter product price"],
        // maxLength:[8]
    },
    rating:{
        type:Number,
        default:0
    },
    images:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    category:{
        type:String,
        required:[true, "Please enter Category"]
    },
    Stock:{
        type: Number,
        required: [true,"please enter stock"]

    },
    numofreviews:{
        type:Number,
        default:0
    },
    reviews:[{
        name:{          
                type:String,
                required:true
        },
        rating:{
            type:Number,
            default:0
        },
        comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }

}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema)
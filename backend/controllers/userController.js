const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require('crypto')

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    try{const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "ghah",
            url: "jsjjs"
        }
    });
    sendToken(user,200,res)
}
    catch(error){
        next(error)
        console.log(error.message)
    }
});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){return next();}
    //We need to match both email and password with the one in the database
    const user = await User.findOne({ email }).select("+password");
    
    if(!user){
        
        return next(new ErrorHandler("Invalid Email or Password", 401));
        
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        console.log(password)
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    //If the user is found and the password is matched, we generate a token for the user
    sendToken(user,200,res)
})

exports.logout = catchAsyncError(async(req, res, next)=>{
    console.log("worksq")
    res.cookie('token', null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })
    
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
})

exports.forgotPassword = catchAsyncError(async(req, res, next)=>{
    const user = await User.findOne({ email: req.body.email });
    if(!user){return next(new ErrorHandler("User not found", 404))}
    console.log("up")
    const resetTokenpass = user.abc();
    console.log("down")
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/reset/${resetTokenpass}`
    const message = `your password reset token is : ${resetUrl}`
    try {
        await sendEmail({
            email: user.email,
            subject:`email password recovery`,
            message
        })
        res.status(200).json({
            success:true,
            message:"email sent"
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 400))
    }
})

exports.resetPassword = catchAsyncError(async(req, res, next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or expire", 400))
    }
    if(req.body.password!=req.body.confirmpassword){
        return next(new ErrorHandler("Wrong password", 400))
    }
    user.password = req.body.password,
    user.resetPasswordExpire=undefined,
    user.resetPasswordToken=undefined,
    await user.save();
    sendToken(user, 200, res)

})
// exports.getUserDetails = catchAsyncError(async(req, res, next)=>{
    
// })

exports.getUserDetails = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
    
})

exports.updatePassword = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.user.id).select("+password")
    if(!user){
        console.log("user nto exits");
    }
    const isPasswordMatch = await  user.comparePassword(req.body.oldPassword)
    // console.log(isPasswordMatch)
    if(!isPasswordMatch){

        return next(new ErrorHandler("old password is incorrect", 400))
    }
    if(req.body.newPassword != req.body.confirmPassword){
        return next(new ErrorHandler("Password doesnt match", 400))
    }
    user.password = req.body.newPassword
    await user.save()
    sendToken(user, 200, res)

    
    
})

exports.updateProfile = catchAsyncError(async(req, res, next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }  
    //add
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {new:true, runValidators:true, useFindAndModify:false})
    res.status(200).json({
        success:true
    })

    
})
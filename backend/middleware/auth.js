const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
exports. isAuthenticatedUser = catchAsyncError(async(req, res, next)=>{
    const token = req.cookies.token
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodedData)
    req.user = await User.findById(decodedData.id)
    next();
})
//support multiple arguments rest operator
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to acces`, 300));
        }
        next();
    }
}

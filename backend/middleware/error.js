const ErrorHandler = require("../utils/errorhandler")
module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message||"Internal Server error"
    
    if(err.code == 11000){
        const message = 'Duplicate email enter'
        err = new ErrorHandler(message, 400)
    }    
    res.status(err.statusCode).json(
        {
            success: false,
            message : err.message
        }
    )
    
}
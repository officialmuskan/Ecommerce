//creating token and saving in cookie
const sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();
    const options = {
        expires:new Date(Date.now()+5*24*60*60*1000),
        httpOnly:true
    }
    res.status(statusCode).cookie('token', token, options).json({
        success:true,
        token,
        user
    })

}
module.exports = sendToken
const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcryptjs')
const dotenv = require("dotenv")
dotenv.config()
const jsonwebtoken = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  }, {timestamps:true});
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){next()}
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.getJWTToken = function(){
    return jsonwebtoken.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}
userSchema.methods.abc = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to `resetPasswordToken`
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set token expiration time (15 min)
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

  module.exports = mongoose.model("User", userSchema);
  
const mongoose = require('mongoose')

const connectDatabase = async ()=>{   
    await mongoose.connect("mongodb+srv://Muskan:muskan198@cluster0.rqhyigo.mongodb.net/ecommerce-project")
    console.log("Database connected")
}

module.exports = connectDatabase

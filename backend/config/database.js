const mongoose = require('mongoose')

const connectDatabase = async ()=>{   
    await mongoose.connect("mongodb+srv://Muskan:muskan198@cluster0.rqhyigo.mongodb.net/ecommerce-project")
}
const sampleSchema = mongoose.Schema({
    title:String
})
const sample = mongoose.model('sample', sampleSchema)
module.exports = connectDatabase

const express  = require("express");
const dotenv = require("dotenv")
const app = require("./app")
dotenv.config()

const port = process.env.PORT
app.get('/', (req, res)=>{
    res.send("Hello")
})

app.listen(port, ()=>{
    console.log(`server started at ${port}`)
});
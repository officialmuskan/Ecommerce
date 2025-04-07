const express  = require("express");
const dotenv = require("dotenv")
const app = require("./app")
const connect = require("./config/database")
dotenv.config()

process.on("uncaughtException", err=>{
    console.log(`${err.message}`)
    console.log("Shutting")
    process.exit(1)
    
})

const port = process.env.PORT
connect()
app.get('/', (req, res)=>{
    res.send("Hello")
})

const server = app.listen(port, ()=>{
    console.log(`server started at ${port}`)
});


process.on("unhandledRejection", err=>{
    console.log(`${err.message}`)
    console.log("Shutting")
    server.close(()=>{
        process.exit(1)
    })
})
console.log("youtube")
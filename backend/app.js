//skip at 34
const path = require("path")
const express = require("express")
const cp = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cp())
const errorMiddleware = require("./middleware/error");
const products = require("./routes/productRoute")
const users = require("./routes/userRouter")
const order = require("./routes/orderRoutes")
const payment = require("./routes/paymentRoute")
app.use('/api/v1', products);
app.use('/api/v1', users);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use(express.static(path.join(__dirname, "./ecommerce/dist")))
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./ecommerce/dist/index.html"))
})
app.use(errorMiddleware)
module.exports=app
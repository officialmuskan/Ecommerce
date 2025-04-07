//skip at 34
const express = require("express")
const cp = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cp())
const errorMiddleware = require("./middleware/error");
const products = require("./routes/productRoute")
const users = require("./routes/userRouter")
app.use('/api/v1', products);
app.use('/api/v1', users);
app.use(errorMiddleware)
module.exports=app
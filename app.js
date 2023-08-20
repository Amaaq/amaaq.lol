require('dotenv').config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require('path');

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose")

const PORT = 3000;

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(PORT, function () {
  console.log(`🚀 Listening on port ${PORT}`);
});
mongoose 
  .connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
  })
  .then(()=>{
    console.log("MongoDB connection is established successfully!")
  })



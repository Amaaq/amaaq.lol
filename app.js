require('dotenv').config();

const express = require("express");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const PORT = 3000;

const app = express();

const mongoose = require("mongoose")
mongoose 
  .connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
  })
  .then(()=>{
    console.log("MongoDB connection is established successfully!")
  })
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(PORT, function () {
  console.log(`🚀 Listening on port ${PORT}`);
});


